import React, {Component} from 'react';
import { Link } from 'react-router';
import store from '../store';
import noticeUser from '../utils/notification';
import { userLoginNotified } from '../actions/user';
import UserHeader from './UserHeader';
import Footer from './Footer';
import PostList from './PostList';
import Map from './Map';
import axios from 'axios';

class UserHome extends Component {
  constructor(props){
    super(props);
    const socket = io.connect('http://192.168.0.251:2106');
    this.state = {
        socketConnection: socket
    }
  }
  componentDidMount(){
    /* create a socket connection for login user */
    console.log(this.props);
    $('body').addClass('unscollable');
    if(!this.props.user.loginNofified) {
      var user = this.props.user.name;
      // console.log(this.props.user.user.name);
      var socket = this.state.socketConnection;
      socket.on('after user sign in', function (nextAction) {
        socket.emit('register user', user );
      });
      socket.on('notity user login',function(msg){
        noticeUser(msg);
      });
      store.dispatch(userLoginNotified(null));
    }
  }
  componentWillUnmount(){
    $('body').removeClass('unscollable');
  }
  render(){
    var user = this.props.user;
    var locationNames = [];
    return (
      <div className="UserCenter row">
       <div className="col-md-7">
         <PostList {...this.props} posts={this.state.posts} changePage={this.props.changePage}/>
         <Footer />
       </div>
       <Map locations={this.props.locations} names={locationNames}/>
       <div className="clearBoth"></div>
      </div>
    )
  }
}

// UserHome.propTypes = {
//   postGetRequest: React.PropTypes.func.isRequired
// }

module.exports = UserHome;

// export default connect(null,{postGetRequest})(UserHome);
