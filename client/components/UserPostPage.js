import React, {Component} from 'react';
import { Link } from 'react-router';
import store from '../store';
// import { mapOptions } from '../utils/map';
import UserPostForm from './UserPostForm';
import Footer from './Footer';
import { connect } from 'react-redux';
import { postPublishmentRequest } from '../actions/posts';

class UserPostPage extends Component {
  render(){
    return (
      <div className="UserPostPage">
        <div className="publisher-header">
          <h1 className='text-center publisher-title'>足迹发布栏</h1>
          <Link className="publisher-cancel" to="/">放弃发布</Link>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-offset-2 col-sm-offset-2 col-md-8 col-sm-8 col-xs-12">
              <UserPostForm postPublishmentRequest={postPublishmentRequest}/>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

UserPostPage.propTypes = {
  postPublishmentRequest: React.PropTypes.func.isRequired
}
// module.exports = UserPostPage;
export default connect(null,{postPublishmentRequest})(UserPostPage);
