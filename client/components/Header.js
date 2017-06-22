import React,{Component} from 'react';
import { Link } from 'react-router';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user
    }
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(event){
    if(this.props.user){
      var user = this.props.user;
      this.props.userLogout();
    } else {
      return;
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.user != this.props.user) {
      return true;
    }
    if(nextProps.comments != this.props.comments) {
      return true;
    }
    return true;
  }
  render(){
    var user = null;
    var comments = null;
    if(this.props.comments != null) {
      comments = this.props.comments.comments;
    }
    if(this.props.user != null){
      if(this.props.user.errors == null) {
        user = this.props.user;
      }
    }
    return(
      <header>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">{user != null? user.name + "\'s 足迹": "足迹"}</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className={user != null ? "show" : "hidden"}>
                  <Link className="navbar-brand" to="/user/post">发布足迹</Link>
                </li>
                <li>
                  <Link className="navbar-brand" to={user != null? "/profile": "/login"}>
                    集赞数 <span className={user != null? "show": "hidden"}>({user != null ? user.unreadedMsg.likes.length : 0})</span>
                  </Link>
                </li>
                <li>
                  <Link className="navbar-brand" to={user != null? "/profile": "/login"}>
                    评论数 <span className={user != null? "show": "hidden"}>({comments != null ? comments.length : 0})</span>
                  </Link>
                </li>
                <li className="dropdown">
                  <Link href="#" className="dropdown-toggle navbar-brand" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    {user != null? user.name : "加入我们"}
                    <span className="caret"></span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li className={user == null ? "show" : "hidden"}>
                      <Link to="/">
                        注册
                      </Link>
                    </li>
                    <li className={user == null ? "show" : "hidden"}>
                      <Link to="/login">
                        登录
                      </Link>
                    </li>
                    <li className={user != null ? "hidden" : "hidden"}>
                      <Link to="/user">个人中心</Link>
                    </li>
                    <li className={user != null ? "show" : "hidden"}>
                      <Link onClick={this.handleLogout} to='/'>退出登录</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

exports = module.exports = Header;
