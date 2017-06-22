import React, { Component } from 'react';
import { convertDateString } from '../utils/DateHelper';
import { Link } from 'react-router';

class PostGrid extends Component {
    constructor(props){
      super(props);
      this.state = {
        lastPicIdx: this.props.post.photos.length - 1,
        currentPic: 0
      }
      this.previousPic = this.previousPic.bind(this);
      this.behindPic = this.behindPic.bind(this);
      this.resizeGrid = this.resizeGrid.bind(this);
    }
    previousPic(){
      let targetPic = this.state.currentPic + 1;
      if(targetPic > this.state.lastPicIdx) {
        targetPic = 0;
      }
      this.setState({
        currentPic: targetPic,
        lastPicIdx: this.props.post.photos.length - 1
      });
    }
    behindPic(){
      let targetPic = this.state.currentPic - 1;
      if(targetPic < 0) {
        targetPic = 0;
      }
      this.setState({
        currentPic: targetPic,
        lastPicIdx: this.props.post.photos.length - 1
      });
    }
    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.post != this.props.post){
        return true;
      }
      if(this.props.post.photos.length != this.state.lastPicIdx + 1) {
        return true;
      }
      if( nextState.currentPic >= 0 &&
          nextState.currentPic < this.state.lastPicIdx) {
        return true;
      } else {
        return false;
      }
    }
    resizeGrid(){
      let height = $(".gridImg").width();
      $(".gridImg").height(height);
    }
    componentDidMount(){
      this.state = {
        lastPicIdx: this.props.post.photos.length - 1,
        currentPic: 0
      }
      this.resizeGrid();
      window.addEventListener("resize", this.resizeGrid);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.resizeGrid);
    }
    render(){
      var backGroundImg = "url(" + this.props.post.photos[this.state.currentPic] + ")";
      var theStyle = {
        backgroundImage: backGroundImg
      }
      var arriveTime = convertDateString(this.props.post.arriveTime);
      var leaveTime = convertDateString(this.props.post.leaveTime);
      let postLink = '/post/'+ this.props.post._id;
      return (
        <div className="PostGrid col-lg-4 col-md-4 col-xs-12 col-sm-12">
            <div className="gridImg" style={theStyle}>
              <div className="btn-holder">
                <button className="like">
                  <i className="fa fa-heart" data-liked={this.state.userLiked} aria-hidden="true"></i>
                </button>
                <button className="behind" onClick={this.behindPic}>
                  <i className="fa fa-arrow-circle-o-left" aria-hidden="true"></i>
                </button>
                <Link to={postLink} className="post-link"></Link>
                <button className="previous" onClick={this.previousPic}>
                  <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="gridDesp">
              <Link to={postLink} className="post-link">
                <p className="place-name">{this.props.post.placeName}</p>
              </Link>
              <p className="place-comment">
                <span>抵达: {arriveTime}</span>
                <i className="fa fa-plane tour-duration" aria-hidden="true"></i>
                <span>返程: {leaveTime}</span>
              </p>
              <p className="place-friends">
                <i className="fa fa-camera" aria-hidden="true"></i> {this.props.post.photos.length}
              </p>
            </div>
        </div>
      )
    }
}
module.exports = PostGrid;
