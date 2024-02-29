import { Link } from "react-router-dom"
import "../App.css"



function Home () {
  return (<div>
    <h1>Welcome to Quizler</h1>
    <Link to={"/play"}><button >play</button></Link>
  </div>)
}

export default Home