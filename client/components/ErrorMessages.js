import React,{ Component } from 'react';

class ErrorMessages extends Component {
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.msg != null && this.props.msg.length > 0){
      return (
        <div className="error-messages text-center">
          <div className="alert alert-danger">
            {this.props.msg.map((message,idx)=><p key={idx} className='error-msg'>{message}</p>)}
          </div>
        </div>
      )
    } else {
      return (
        <div className="error-messages">
        </div>
      )
    }
  }
}

module.exports = ErrorMessages;
