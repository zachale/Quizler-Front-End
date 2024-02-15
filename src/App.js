
import './App.css';
import React, {useState} from 'react';


const apiurl = "http://localhost:3000/questions/random"




function App() {
  const [content, setContent] = useState("test")

  function callApi () {

    fetch(apiurl)
    .then(response => {
      if(!response.ok) {
        throw new Error("Network response was not ok")
      }
      content = String(response.text());
    }) 
    .then(data => {
      setContent(data);
    })
    .catch(error => {
      console.error("Error:", error);
      setContent(String(error));
    })
  
  }

  callApi();

  return (
    <div className="App">

        <h1>{content}</h1>

    </div>
  );
}

export default App;
