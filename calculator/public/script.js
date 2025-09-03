
//dom manipulation
const num1 = document.getElementById("1");
const num2 = document.getElementById("2");
const num3 = document.getElementById("3");
const num4 = document.getElementById("4");
const num5 = document.getElementById("5");
const num6 = document.getElementById("6");
const num7 = document.getElementById("7");
const num8 = document.getElementById("8");
const num9 = document.getElementById("9");
const num0 = document.getElementById("0");
const num000 = document.getElementById("000");
const period = document.getElementById("period");
const mult = document.getElementById("multiply");
const div = document.getElementById("divide");
const add = document.getElementById("addition");
const subt = document.getElementById("subract");
const dltBtn = document.getElementById("delete");
const clearAll = document.getElementById("clear-all");
const equals = document.getElementById("equals");
const displayBox = document.getElementById("display");
const btnBox = document.getElementById("buttons");

displayBox.textContent = '';
let persist;
let justFromAnswer = false;
let lastAnswer = null;

function displayAppend(char){
    let prev = displayBox.textContent;
    let index;
    console.log(prev);
    if (prev.length == 0){
        index = 0
    }else{
        index = prev.length-1
    }


    if (['-','+','.','1','2','3','4','5','6','7','8','9','0'].includes(String(char)) ){
        displayBox.textContent = prev+char;
        
    }       else{
        console.log('in the else block');

        if (persist ||  Number.isInteger(parseInt(prev[index])) ){
            if (prev[index] !== '-' && prev[index] !== '+'){
            displayBox.textContent = prev+char;}
            else{
                console.log("double minus or plus");
            }
        }else{
            console.log('syntaxerror');
            
        }
        /** INCASE YOU WANT TO USE +++ OR -- BUT YOULL HAVE TO CHANGE THE getResult FUCNTION ...
         * if (persist ||  Number.isInteger(parseInt(prev[index])) ){
            displayBox.textContent = prev+char;
            
        }else{
            console.log('syntaxerror');
            
        }**/
        
    }

}

function deleteBtn (){
    let prev = displayBox.textContent;
    let index;
    console.log(prev);
    if (prev.length == 0){
        index = 0
    }else{
        index = prev.length-1
    }
}

function getResult(){
    const eqnText = displayBox.textContent;

    console.log(eqnText);
    console.log(typeof(eqnText));

    const result = eval(eqnText);

    console.log(result);
    return result;
}
function displayResult(){
    justFromAnswer=true;
    const eqnText = displayBox.textContent;
    const result = getResult(); 
    lastAnswer = result;
    displayBox.textContent = eqnText + " = " + result;
}


function btnClick(){btnBox.addEventListener("click",(event)=>{
    if (justFromAnswer) {
        if (event.target.classList.contains("op-btn")) {
            let operatorChar;
            switch(event.target.id) {
                case 'multiply': operatorChar = '*'; break;
                case 'addition': operatorChar = '+'; break;
                case 'subtract': operatorChar = '-'; break;
                case 'divide':   operatorChar = '/'; break;
            }
            displayBox.textContent = lastAnswer + operatorChar;
            justFromAnswer = false; 
            return; 
        } else if (!event.target.classList.contains("equal-btn")) {
            displayBox.textContent = '';
            justFromAnswer = false;
        }
    }

    if (event.target.classList.contains("num-btn")){
        switch(event.target.id){
            case '1':
                displayAppend(1);
                console.log("one");
                break;
            case '2':
                displayAppend(2);
                console.log("two")
                break;
            case '3':
                displayAppend(3);
                console.log("three")
                break;
            case '4':
                displayAppend(4);
                console.log("four")
                break;
            case '5':
                displayAppend(5);
                console.log("five")
                break;
            case '6':
                displayAppend(6);
                console.log("six")
                break;
            case '7':
                displayAppend(7);
                console.log("seven")
                break;
            case '8':
                displayAppend(8);
                console.log("eight")
                break;
            case '9':
                displayAppend(9);
                console.log("nine")
                break;
            case '0':
                displayAppend(0);
                console.log("ten")
                break;
            case '000':
                console.log(justFromAnswer);
                
                displayAppend('000');
                console.log("zeros")
                break;
            case 'period':
                console.log('period');
                displayAppend('.');
                break;
                
            default:
                console.log('big problem hommie');
                

        }

    }
    else if(event.target.classList.contains("op-btn")){
        console.log(event.target.id)
        switch(event.target.id){
            case 'multiply':
            persist = false;
                displayAppend('*');
                console.log("*")
                break;
            case 'addition':
            console.log('happening');
            persist = true;
                displayAppend('+');
                console.log("+")
                break;
            case 'subtract':
            persist = true;
                displayAppend('-');
                console.log("-")
                break;
            case 'divide':
            persist = false;
                displayAppend('/');
                console.log("/")
                break;
            default:
                console.log("issue");
                
        }
    }
    else if (event.target.classList.contains("op1-btn")){
        switch(event.target.id){
            
            case 'clear-all':
                justFromAnswer = false;
                lastAnswer = null;
                displayBox.textContent=""
                console.log("cleared all")
                break;
            case 'delete':
                const text = displayBox.textContent
                displayBox.textContent = text.slice(0,-1);
                console.log("deleted")
                break;
        }
        console.log(event.target.id)
    }
    else if (event.target.classList.contains("equal-btn")){
    
        console.log(event.target.id)
        displayResult();
    }
    else{
        console.log(event.target.id)
    }
    return;
});
}


btnClick();