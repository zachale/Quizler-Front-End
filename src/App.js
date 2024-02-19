
import './App.css';
import React, {useState} from 'react';


const apiurl = "http://127.0.0.1:3000/questions/random"
const checkQuestion = "http://127.0.0.1:3000/questions/submit"




function App() {
  const [content, setContent] = useState('')
  
  if(content === ''){
    getQuestion()
  }

  function getQuestion () {

    fetch(apiurl)
    .then(response => {
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      response.json().then( json => {setContent(json.message)})
    }) 
    .then(data => { 
      console.log(String(data))
    })
    .catch(error => {
      console.error("Error:", error);
      setContent(String(error));
    })
  
  }

  if( content == null){
    getQuestion()
  }

  return (
    <div className="App">
        
        <button onClick={getQuestion}>get question</button>
        
        <div>
          <h1>{content} = ?</h1>
          <form action={checkQuestion} target='_blank'>
            <input type="hidden" value={content}></input>
            <input type="text" id='question'></input>
            <input type="submit" id='answer'></input>
          </form>
        </div>
        

    </div>
  );
}

export default App;
