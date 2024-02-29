
import '../App.css';
import React, {useEffect, useState} from 'react';
import Timer from '../Timer';
import Popup from 'reactjs-popup'


const getQuestion = "http://127.0.0.1:3000/questions/random"
const checkQuestion = "http://127.0.0.1:3000/questions/submit"

async function getJsonResponse(url) {
  //Calls the API at the given URL and returns the response
  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error("Network response was not ok")
    }
    const value = await response.json()
    return value   
  } catch (error) {
    console.error("Error:", error);
    return {message: "error"}
  } 

}


function SubmitAnswerFrom({question, onSubmit}){

  const [answer, setAnswer] = useState('') 
  
  return (
    <>
      <form onSubmit={handleSubmit} method="GET">
        <input type="hidden"  id='question' name='question' value={question}></input>
        <input className="submitAnswer" type="text" id='answer' name='answer' value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
        <button type="submit" className='submitButton'>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check checkMark" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 12l5 5l10 -10" />
          </svg>
        </button>
      </form>
    </>
  )

  function handleSubmit(e){
    e.preventDefault()
    onSubmit(e)
    setAnswer('')
  }
}

function TestPopUp ({onExit, score}) {
  return (
    <Popup modal trigger={<button> Trigger</button>} position="right center">
    <div className='popUpContainer'>
      <h1>game over... 😔</h1>
      <h1>{score}</h1>
      <div>
        <button onClick={()=>{
          onExit()
        }}>retry🔁</button>
      </div>
    </div>
  </Popup>
  )
}



function App() {
  const [question, setQuestion] = useState('')
  const [score, setScore] = useState(0)
  const [notif, setNotif] = useState('')
  const [key, setKey] = useState(0)
  const [highScore, setHighScore] = useState(0)

  async function updateQuestion(e){
    await getJsonResponse(getQuestion)
      .then( promise => {
        setQuestion(promise.message)
      })
  }

  async function updateAnswer(e){
    e.preventDefault()

    const query = encodeURIComponent(e.target.question.value)
    const url = checkQuestion + '?question=' + query + '&answer=' + e.target.answer.value 
    // This is so primitive
    // This is definitely not the optimal way to do this
    // There are definitely security risks here

    //submit the question and process the result
    await getJsonResponse(url)
      .then( promise => handleAnswerCheck(promise.message))
  }

  function handleAnswerCheck(e = null){

    if(e == null){
      setNotif("Error!")
    } else if(Boolean(e)){
      setScore(score.valueOf() + 1)
      updateQuestion()
      setKey(key+1)
      setNotif("Correct! 😃👍✅")
    } else {
      setNotif("Incorrect 😔👎")
    }
  }

  if(question === ''){
    updateQuestion()
  }

  function timeOut(){

    if(score > highScore){
      setHighScore(score)
      document.cookie = "hs=" + String(score)
    }
    
    setKey(key+1)

    setScore(0)

  }


  useEffect(() => {
    if(document.cookie.includes("hs")){
      var cookie = document.cookie
      const parameters = cookie.split('=')
      setHighScore(parameters[1])
    }
  },[])

  return (
    <div className="App">  
        <div>
          <Timer onTimeOut={timeOut} score={score}/>
          <h1>{question} = ?</h1>
          <h1>{String(score)}</h1>
          <p>{notif}</p>
          <SubmitAnswerFrom question={question} onSubmit={updateAnswer}/>
          <TestPopUp score={score} onExit={timeOut}/>
          <h1>High Score: {highScore} 😎</h1>
        </div> 
    </div>
  );
}

export default App;
