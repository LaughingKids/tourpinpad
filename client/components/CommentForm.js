import React,{Component} from 'react';
import {getCookie} from '../utils/cookie';
import { connect } from 'react-redux';
import {commentPostRequest} from '../actions/comments';
import CommentGrid from './CommentGrid';
import axios from 'axios';

class CommentForm extends Component {
    constructor(props) {
      super(props);
      var token = getCookie('token');
      this.state = {
        userId: token,
        postId: this.props.id,
        commentBody: '',
        comments: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit(e){
      e.preventDefault();
      commentPostRequest(this.state);
    }
    componentDidMount(){
      /*load comment*/
      const url = '/api/comments/' + this.props.id;
      axios.get(url).then(
        (comments) => {
          this.setState({comments:comments.data});
        }
      ).catch(function(err){
        console.log(err);
      })
    }
    render(){
      var commentList = null;
      if(this.state.comments !== null) {
        commentList =  this.state.comments.map((comment,idx)=>{
          return (<CommentGrid comment={comment} />);
        });
      }
      return(
        <div className="comment-form-container">
          <div className="comment-form">
            <form id='comment-form' onSubmit={this.handleSubmit}>
              <div className="form-group">
                <textarea
                  name="commentBody"
                  value={this.state.commentBody}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group text-center">
                <button className="btn btn-primary btn-lg">
                  评论
                </button>
              </div>
            </form>
          </div>
          <div className="comment-list">
            {commentList}
          </div>
        </div>
      )
    }
}

CommentForm.propTypes = {
  commentPostRequest: React.PropTypes.func.isRequired
}

export default connect(null,{commentPostRequest})(CommentForm);
