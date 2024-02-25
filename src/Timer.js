import './App.css';
import React from 'react';

class Timer extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      width: 100,
      fill: 150,
      intervalID: -1,
    }
    
  };

  componentDidMount = () =>{

    const interval = setInterval(this.countDown, 10)
    this.setState({intervalID: interval})

  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalID)
  }

  countDown = () => {


    var x = (1/(101-this.state.width)) * 5
    var fill = ((100 - this.state.width)/ 100) * 225 + 30

    var newWidth = this.state.width - x

    this.setState({fill: fill})

    if (newWidth <= 0){
      clearInterval(this.state.intervalID)
    } else{
      this.setState({width: newWidth})
    }

    console.log(fill)
  
  };

  render() {
    
    return(
      <svg width="100%" height="70" xmlns="http://www.w3.org/2000/svg">
        <rect className='timer' width={String(this.state.width) + '%'} height="100%" x="0" y="0" rx="0" ry="0" fill={"rgb("+this.state.fill+",0,10)"} />
      </svg>
    )
  };


}

export default Timer

  
