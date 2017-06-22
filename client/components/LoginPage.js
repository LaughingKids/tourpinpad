import React,{Component} from 'react';
import LoginForm from './LoginForm';
import { connect } from 'react-redux';
import { userLoginRequest } from '../actions/user';
import ErrorMessages from './ErrorMessages';

class LoginPage extends Component {
  render(){
    const { userLoginRequest } = this.props;
    var messages = [];
    if(this.props.user != null) {
      messages = this.props.user.errors;
    }
    return (
      <div className="container">
        <div className="row">
          <h1 className="text-center">
            登录
          </h1>
          <ErrorMessages msg={messages} />
          <div className="col-md-offset-3 col-md-6 col-xs-12">
            <LoginForm userLoginRequest={userLoginRequest} />
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired
}

export default connect(null,{ userLoginRequest })(LoginPage);
