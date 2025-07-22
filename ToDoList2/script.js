const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById("add-task-btn");
const tasksContainer = document.getElementById("task-container");
const clearAllTasks = document.getElementById("clear-all");


const storedTasks = "LOCAL_STORAGE_KEY";

function getTasks(){
    const taskJSON = localStorage.getItem(storedTasks);
    return taskJSON  ? JSON.parse(taskJSON) : []
}

function renderTasks(){
    tasksContainer.innerHTML = ""
    taskTextList = getTasks()
    console.log("Rendering...");
    taskTextList.forEach(eachTask=>{

        //creates list item and adds the text
        const taskItem = document.createElement("li");
        taskItem.textContent = eachTask;
        taskItem.classList.add("task-item");


        //creates delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        taskItem.appendChild(deleteBtn);
        

        //creates done checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add('checkbox');
        taskItem.appendChild(checkbox); 

        //adding our list item to the main unorderd list
        tasksContainer.appendChild(taskItem);
        
        
    })
    console.log("Rendering Complete!");
}

addTaskBtn.addEventListener('click',() => {
    let taskList = getTasks();
    let taskText = taskInput.value.trim()
    if (taskText){
        //add to taskList
        taskList.push(taskText);
        // updating the local storage
        localStorage.setItem(storedTasks, JSON.stringify(taskList))
        console.log(`Task added to the local storage`)
        renderTasks()
        taskInput.value =""
    } else{
        alert("Can not add Empty Task");
    }

}
)

clearAllTasks.addEventListener("click",()=>{
    
    const confirmation = confirm('Are you sure you want to delete all Tasks. \nThis CANNOT be undone!!')
    if (confirmation){
        localStorage.clear();
        renderTasks();
    }else{
        renderTasks();
    }
})

document.addEventListener("DOMContentLoaded",renderTasks());

tasksContainer.addEventListener("click",(event)=>{

    //delete button functionality
    if (event.target.classList.contains("delete-btn")){
        const parentElementText = event.target.parentElement.textContent.slice(0,-6);
        
        const index = getTasks().indexOf(parentElementText);
        if (index>-1){
            const confirmation = confirm(`Task ${parentElementText.toUpperCase()} will be delete. This CANNOT be undone!`) 
            if (confirmation){
                
                event.target.parentElement.remove();

                let taskList = getTasks();
                taskList.splice(index,1);
                
                console.log("Task delete");
            }else{
                console.log("Delete Operation Aborted!");
                
            }
        }
    }
    //checkbox Functionality
    if (event.target.classList.contains("checkbox")){
        let isChecked = event.target.checked;
        console.log(isChecked,'Task completed');
        
        if (isChecked){
        event.target.parentElement.classList.add("task-completed")
        
        } else{
        event.target.parentElement.classList.remove("task-completed")

        }


    }
    



}
)

