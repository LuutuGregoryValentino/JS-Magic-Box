
const addTaksBtn=document.getElementById("addTaskBtn");
const taskInput=document.getElementById("taskInput");
const taskList=document.querySelector("#taskList");

addTaksBtn.addEventListener("click",()=>{
    
    if(taskInput.value!=""){
        const taskText=taskInput.value.trim();
        const newTask=document.createElement("li");
        const dltBtn=document.createElement("button");
        const doneBtn=document.createElement("input")
        const taskSpan=document.createElement("span");

        doneBtn.type="checkbox"

        taskSpan.textContent=taskText;

        dltBtn.classList.add("delete-btn")
        dltBtn.textContent="Delete";
        dltBtn.addEventListener("click",()=>{
            dltBtn.parentElement.remove();
            console.log(`Task: ${taskText} deleted`);
        })
        newTask.appendChild(doneBtn)
        newTask.appendChild(taskSpan)
        newTask.appendChild(dltBtn);
        console.log(newTask)

        taskList.appendChild(newTask);
        
        console.log(`New Task: ${taskText} added successfully`)
    taskInput.value="";
    
    doneBtn.addEventListener("click",()=>{
    let isDone=doneBtn.checked;
    if (isDone){
        
        
        newTask.style.backgroundColor="#d5fde5"
    }
    else{
        newTask.style.backgroundColor="#d5dee6"
    }

    })
    doneBtn.addEventListener("")
    }
    else{
        alert("Can not add empty task!")
    }
    
})



document.querySelectorAll(".delete-btn").forEach(button=>{
    button.addEventListener("click",()=>{
        button.parentElement.remove();
    });
});