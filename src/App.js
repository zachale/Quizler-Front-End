
import './App.css';
import React, {useState} from 'react';


const apiurl = "http://127.0.0.1:3000/questions/random"
const checkQuestion = "http://127.0.0.1:3000/questions/submit"

function SubmitAnswerFrom({question}){
  
  return (
    <>
      <form action={checkQuestion} target='_blank' method="GET">
        <input type="hidden"  id='question' name='question' value={question}></input>
        <input type="text" id='answer' name='answer'></input>
        <input type="submit"></input>
      </form>
    </>
  )
}


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

  return (
    <div className="App">
        
        <button onClick={getQuestion}>get question</button>
        
        <div>
          <h1>{content} = ?</h1>
          <SubmitAnswerFrom question={content}/>
        </div>
        

    </div>
  );
}

export default App;
