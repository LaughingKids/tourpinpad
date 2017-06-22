import React, { Component } from 'react';
import UserHeader from './UserHeader';
import UserProfileForm from './UserProfileForm';
import { getCookie } from '../utils/cookie';
import axios from 'axios';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:null
    }
  }
  componentDidMount() {
    let token = getCookie('token');
    let url = '/api/users/t/' + token;
    axios.get(url).then(
      (userPayload) => {
        this.setState({user:userPayload.data});
      }
    ).catch(function(err){
      console.log(err);
    });
  }
  render(){
    if(this.state.user != null) {
      return(
        <div className="user-profile">
          <UserHeader user={this.state.user}/>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                Wish List
              </div>
              <div className="col-md-6">
                <UserProfileForm user={this.props.user}/>
              </div>
              <div className="col-md-3">
                Message List
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="user-profile"></div>
      )
    }
  }
}

module.exports = UserProfile;
