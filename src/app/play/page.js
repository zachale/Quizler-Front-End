
"use client";
import React, {useEffect, useState} from 'react';
import Timer from './Timer';


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


function SubmitAnswerGrid({options, onSubmit}){

  const [answer, setAnswer] = useState('') 

  buttons = options.map( (text) => {
    <button onClick={handleSubmit} value={text} className='submitButton'>{text}</button>
  })
  
  return (
    <>
        <div className='grid grid-cols-2 gap-4'>
          {buttons}
        </div>
    </>
  )

  function handleSubmit(e){
    e.preventDefault()
    onSubmit(e)
    console.log(e)
  }
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
          <SubmitAnswerGrid/>
          <div><h1 className='highScore'>High Score: {highScore} 😎</h1></div>
        </div> 
    </div>
  );
}

export default App;
