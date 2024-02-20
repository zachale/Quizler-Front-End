
import './App.css';
import React, {useState} from 'react';


const getQuestion = "http://127.0.0.1:3000/questions/random"
const checkQuestion = "http://127.0.0.1:3000/questions/submit"

function SubmitAnswerFrom({question, onSubmit}){
  
  return (
    <>
      <form onSubmit={onSubmit} method="GET">
        <input type="hidden"  id='question' name='question' value={question}></input>
        <input type="text" id='answer' name='answer'></input>
        <input type="submit"></input>
      </form>
    </>
  )
}

async function getJsonResponse(url) {


  try {
    const response = await fetch(url);

    if(!response.ok) {
      throw new Error("Network response was not ok")
    }

    const value = await response.json()
    return value
    
    
  } catch (error) {
    console.error("Error:", error);
  } 

}


function App() {
  const [question, setQuestion] = useState('')
  const [validAnswer, setValidAnswer] = useState('')
  const [score, setScore] = useState(0)

  async function updateQuestion(e){
    await getJsonResponse(getQuestion).then( promise => {setQuestion(promise.message)})
  }

  async function updateAnswer(e){
    e.preventDefault()

    const query = encodeURIComponent(e.target.question.value)
    const url = checkQuestion + '?question=' + query + '&answer=' + e.target.answer.value 
    // This is so primitive
    // This is definitely not the optimal way to do this
    // I couldn't find the clean way

    //submit the question and process the result
    await getJsonResponse(url)
      .then( promise => {setValidAnswer(value => value = promise.message, handleAnswerCheck(promise.message))})
  }

  function handleAnswerCheck(e = null){
    setValidAnswer(e)
    if(validAnswer){
      setScore(score.valueOf() + 1)
      updateQuestion()
      console.log("it was true!")
    }
    console.log("answer should be " + e + " " + validAnswer)
  }

  if(question === ''){
    updateQuestion()
  }

  return (
    <div className="App">      
        <div>
          <h1>{question} = ?</h1>
          <SubmitAnswerFrom question={question} onSubmit={updateAnswer}/>
          <h1>{String(score)}</h1>
        </div> 
    </div>
  );
}

export default App;
