import React,{Component} from 'react';

class CommentGrid extends Component {
  render(){
    return(
      <div className="comment-grid">
        <p className="comment-meta">
          <span className="comment-user">
            {this.props.comment.userName}
          </span>
          <span className="comment-date">
            {this.props.comment.commentDate}
          </span>
        </p>
        <p className="comment-body">
          {this.props.comment.commentBody}
        </p>
      </div>
    )
  }
}

module.exports = CommentGrid;
