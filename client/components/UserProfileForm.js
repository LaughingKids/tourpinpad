import React,{Component} from 'react';
import {getCookie} from '../utils/cookie';

class UserProfileForm extends Component {
  constructor(props) {
    super(props);
    let token = getCookie('token');
    this.state={
      token:token,
      nikename:'',
      email:'',
      phone:'',
      password:'',
      passworConfirmation:'',
      errors:''
    }
    this.handleTyping = this.handleTyping.bind(this);
  }
  handleTyping(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            type="text"
            name="nikename"
            className="form-control"
            value={this.state.nikename}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            value={this.state.email}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={this.state.phone}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">Confirm Password</label>
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
            value={this.state.token}
        />
        <input type="hidden"
             name="userAvatar"
             value=""
        />
        <div className="form-group text-center">
          <button className="btn btn-primary btn-lg">
            Welcome to Our Trip
          </button>
        </div>
      </form>
    )
  }
}

module.exports = UserProfileForm
