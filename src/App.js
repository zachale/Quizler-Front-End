
import './App.css';
import React, {useState, useEffect} from 'react';


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
  } 

}
function CountDown(){
  const [width,setWidth] = useState(100)
  const [fill,setFill] = useState("rgb(150,0,10")
  const [intervalID, setIntervalId] = useState(0)

  useEffect( () => setIntervalId(setInterval(updateCountDown, 1000)), [])

  function updateCountDown(){
    console.log(width)
    setWidth(width.valueOf() - 1)
  }

  if (width < 0){
    clearInterval(intervalID)
  }
  
  return (
   <svg width="100%" height="70" xmlns="http://www.w3.org/2000/svg">
    <rect className='timer' width={String(width) + '%'} height="100%" x="0" y="0" rx="0" ry="0" fill={fill} />
  </svg>)
}

function SubmitAnswerFrom({question, onSubmit}){

  const [answer, setAnswer] = useState('') 
  
  return (
    <>
      <form onSubmit={handleSubmit} method="GET">
        <input type="hidden"  id='question' name='question' value={question}></input>
        <input type="text" id='answer' name='answer' value={answer} onChange={(e) => setAnswer(e.target.value)}></input>
        <input type="submit"></input>
      </form>
    </>
  )

  function handleSubmit(e){
    e.preventDefault()
    onSubmit(e)
    setAnswer('')
  }
}



function App() {
  const [question, setQuestion] = useState('')
  const [validAnswer, setValidAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [notif, setNotif] = useState('')

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
    setValidAnswer(e)
    if(Boolean(e)){
      setScore(score.valueOf() + 1)
      updateQuestion()
      setNotif("Correct!")
    } else {
      setNotif("Incorrect, try again!")
    }
    console.log("answer should be " + e + " " + validAnswer)
  }

  if(question === ''){
    updateQuestion()
  }

  return (
    <div className="App">      
        <div>
          <CountDown/>
          <h1>{question} = ?</h1>
          <SubmitAnswerFrom question={question} onSubmit={updateAnswer}/>
          <h1>{String(score)}</h1>
          <p>{notif}</p>
        </div> 
    </div>
  );
}

export default App;
