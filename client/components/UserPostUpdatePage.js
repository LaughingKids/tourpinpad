import React, {Component} from 'react';
import { Link } from 'react-router';
import store from '../store';
// import { mapOptions } from '../utils/map';
import SingleUpdateForm from './SingleUpdateForm';
import Footer from './Footer';
import { postUpdateRequest,postDeleteRequest } from '../actions/posts';
import { connect } from 'react-redux';
import axios from 'axios';

class UserPostUpdatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post:null
    }
  }
  componentDidMount(){
    const url = '/api/posts/'+this.props.params.postId;
    axios.get(url).then(
      (post) => {
        this.setState({post:post.data});
      }
    ).catch(function(err){
      console.log(err);
    });
  }
  render(){
    if(this.state.post != null) {
      var returnUrl = '/post/'+this.props.params.postId;
      return (
        <div className="user-post-update-page">
          <div className="publisher-header">
            <h1 className='text-center publisher-title'>{this.state.post.placeName}</h1>
            <Link className="publisher-cancel" to={returnUrl}>放弃修改</Link>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 col-md-8 col-sm-12">
                  <SingleUpdateForm
                    id={this.props.params.postId}
                    post={this.state.post}
                    postUpdateRequest={postUpdateRequest}
                    postDeleteRequest={postDeleteRequest}/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (<div className="user-post-update-page"></div>);
  }
}

UserPostUpdatePage.propTypes = {
  postUpdateRequest: React.PropTypes.func.isRequired,
  postDeleteRequest: React.PropTypes.func.isRequired
}
// module.exports = UserPostPage;
export default connect(null,{ postUpdateRequest,postDeleteRequest })(UserPostUpdatePage);
