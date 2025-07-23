
//html elements reference
const jokeBtn = document.getElementById("getJokeBtn");
const jokeDisplay = document.getElementById("jokesDisplay");


jokeBtn.addEventListener("click",async() =>{
    try{ // used for error handling.. code inside tryis executed, but when an error is encountered, the catch block in executed instead

        const response = await fetch('https://icanhazdadjoke.com/',{
            headers:{
                "Accept":'application/json'//crucial for this specific api
            }
        });
         //was the response successful?
         if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

        const data = await response.json(); //a method of the json object  that parses th repsonse body s a json.. and return a promise

        jokeDisplay.textContent = data.joke; //the joke is inthe 'joke' property of the JSON data
        
    } catch (error) { //error variable contans info aboit what went wrong
        console.log('Failed to fetch joke: ', error);
        jokeDisplay.textContent = "Oops! Couldnt fetch a joke.Try again lettuce!"
        

    }
});

