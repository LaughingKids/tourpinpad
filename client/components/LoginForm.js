import React,{Component} from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : '',
      type : 'email',
      password : ''
    }
    this.handleTypingAndClick = this.handleTypingAndClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTypingAndClick(e) {
    // console.log(e.target.value);
    this.setState({[e.target.name]:e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.userLoginRequest(this.state);
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label">登录方式</label>
          <select name="type"
                  className="form-control"
                  onChange={this.handleTypingAndClick}>
            <option value="email"> 邮箱 </option>
            <option value="nikename"> 用户名 </option>
          </select>
        </div>
        <div className="form-group">
          <label className="control-label"> 邮箱 / 用户名 </label>
          <input
            type="text"
            name="id"
            className="form-control"
            value={this.state.identifier}
            onChange={this.handleTypingAndClick}
            />
        </div>
        <div className="form-group">
          <label className="control-label">密码</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={this.state.password}
            onChange={this.handleTypingAndClick}
            />
        </div>
        <div className="form-group text-center">
          <button className="btn btn-primary btn-lg">
            开始旅途
          </button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  userLoginRequest: React.PropTypes.func.isRequired
}

module.exports = LoginForm;
