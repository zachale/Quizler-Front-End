import './App.css';
import React, { useEffect } from 'react';

class Timer extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      width: 110,
      intervalID: -1,
    }
    
  };

  addTime = () => {
    this.setState({width: this.state.width+50})

    if(this.state.width > 110){
      this.setState({width: 110})
    }
  }

  setTime = () => {
    const interval = setInterval(this.countDown, 1000)
    this.setState({intervalID: interval})
  }

  resetTime = () => {
    this.setState({width: 110})
    clearInterval(this.state.intervalID)
    this.setTime()
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.score < this.props.score){
      this.addTime()
    } else if (prevProps.score > this.props.score && this.props.score == 0){
      this.resetTime()
    }
  }

  componentDidMount = () =>{

    this.setTime()
    
  };

  componentWillUnmount = () => {
    clearInterval(this.state.intervalID)
  }

  countDown = () => {


    // var x = (1/(101-this.state.width)) * 70

    var newWidth = this.state.width - (10 * Math.pow(2, this.props.score *0.05))

    if (newWidth <= 0){
      clearInterval(this.state.intervalID)
      if(this.props.onTimeOut != null){
        this.props.onTimeOut()
      }
      this.resetTime()
    } else{
      this.setState({width: newWidth})
    }

  };

  render() {
    
    return(
      <svg width="100%" height="70" xmlns="http://www.w3.org/2000/svg">
        <rect className='timer' width="100%" height="100%" x="0" y="0" rx="0" ry="0" fill="rgb(110, 38, 14)" />
        <rect className='timer' width={String(this.state.width-10) + '%'} height="100%" x="0" y="0" rx="0" ry="0" fill="rgb(204, 85, 0)" />
      </svg>
    )

  };


}

export default Timer

  
