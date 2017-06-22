import React,{Component} from 'react';
import SignupForm from './SignupForm';
import { connect } from 'react-redux';
import { userSignupRequest } from '../actions/user';
import { browserHistory, Link } from 'react-router';
import { getCookie } from '../utils/cookie';
import UserHome from './UserHome';
import ErrorMessages from './ErrorMessages';

class SignupPage extends Component {
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log(nextProps);
    // if(nextProps.user != null && nextProps.user.errors != this.user.errors) {
    //   console.log(nextProps);
    //   alert('123');
    //   return true;
    // }
    return true;
  }
  render(){
    let token = getCookie('token');
    // console.log(token);
    var loginStatus = false;
    var messages = [];
    if(token.length != 0  && this.props.user != null) {
      if(this.props.user.errors == null)
        loginStatus = true;
    }
    if(typeof(this.props.user) !== 'undefined' && this.props.user != null) {
      var errors = this.props.user.errors;
      // console.log(errors);
      if(typeof(errors) !== 'undefined') {
        let errorObj = this.props.user.errors.errors;
        for (var key in errorObj) {
          messages.push(errorObj[key]['message']);
        }
        if(messages.length == 0) {
          messages = errors;
        }
      } else {
        messages = null;
      }
      loginStatus = messages == null;
    }
    if(!loginStatus) {
      const { userSingupRequest } = this.props;
      return (
        <div className="container">
          <div className="row">
            <h1 className="text-center">
              注册
            </h1>
            <ErrorMessages msg={messages} />
            <div className="col-md-offset-3 col-md-6 col-xs-12">
              <SignupForm {...this.props} userSignupRequest={userSignupRequest} />
              <p className='text-center'>注册了?<Link to="/login">点击登录</Link></p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <UserHome {...this.props}/>
      );
    }
  }
}

SignupPage.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
}

export default connect(null , { userSignupRequest })(SignupPage);
