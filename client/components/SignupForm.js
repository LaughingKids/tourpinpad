import React,{Component} from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state={
      nikename:'',
      email:'',
      phone:'',
      password:'',
      passworConfirmation:''
    }
    this.handleTyping = this.handleTyping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTyping(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label">用户名</label>
          <input
            type="text"
            name="nikename"
            className="form-control"
            value={this.state.nikename}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">邮箱</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">电话</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={this.state.phone}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">密码</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">确认密码</label>
          <input
            type="password"
            name="passworConfirmation"
            className="form-control"
            value={this.state.passworConfirmation}
            onChange={this.handleTyping}
            />
        </div>
        <input
            type="hidden"
            name="loginToken"
            value=''
        />
        <input type="hidden"
             name="userAvatar"
             value=""
        />
        <div className="form-group text-center">
          <button className="btn btn-primary btn-lg">
            开启心愿之旅
          </button>
        </div>
      </form>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

module.exports = SignupForm;
