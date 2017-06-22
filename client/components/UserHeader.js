import React, {Component} from 'react';
import { updateUserHeaderRequest,updateUserAvatarRequest } from '../actions/user';
import { connect } from 'react-redux';
class UserHeader extends Component {
  constructor(props){
    super(props);
    this.handleUserImgForm = this.handleUserImgForm.bind(this);
  }
  handleUserImgForm(event){
    event.preventDefault();
    document.getElementById('userImg').style.display = "block";
  }
  render(){
    var user = this.props.user;
    return (
      <div id='userCenterHeader'>
      </div>
    )
  }
}

UserHeader.propTypes = {
  updateUserHeaderRequest: React.PropTypes.func.isRequired,
  updateUserHeaderRequest: React.PropTypes.func.isRequired
}
// module.exports = UserPostPage;
export default connect(null,{ updateUserHeaderRequest,updateUserHeaderRequest })(UserHeader);
// module.exports = UserHeader;
