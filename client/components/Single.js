import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router';
import { convertDateString, distanceDate } from '../utils/DateHelper';
import {GoogleMapOptions} from './GoogleMap/GoogleMapOptions';
import CommentForm from './CommentForm';
import ImageSlider from './ImageSlider';
import MapInfoBox from './MapInfoBox';
import Footer from './Footer';

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post:null,
      editLink: '/post/edit/'+this.props.params.postId,
      comments:null
    }
    this.fixSideBar = this.fixSideBar.bind(this);
    this.initMap = this.initMap.bind(this);
  }
  componentDidUpdate(){
    $('[data-toggle="tooltip"]').tooltip();

  }
  fixSideBar(){
    var unFixed = document.getElementById('sidebar').getAttribute('data-fixed-sidebar') == 'false';
    var doc = document.documentElement;
    var scrollY = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    if(scrollY > 600) {
      if(unFixed) {
        var previousPosition = document.getElementById('sidebar').getBoundingClientRect();
        document.getElementById('sidebar').style.left = previousPosition.left + "px";
        document.getElementById('sidebar').style.width = previousPosition.width + "px";
        document.getElementById('sidebar').style.marginTop = "0px";
        document.getElementById('sidebar').setAttribute('data-fixed-sidebar',true);
        // console.log(document.getElementById('sidebar').getBoundingClientRect());
      }
    } else {
      document.getElementById('sidebar').style.left = "";
      document.getElementById('sidebar').style.width = "";
      document.getElementById('sidebar').style.marginTop= "-51px";
      document.getElementById('sidebar').setAttribute('data-fixed-sidebar',false);
    }
  }
  componentDidMount(){
    window.addEventListener('resize',this.fixSideBar);
    window.addEventListener('scroll',this.fixSideBar);
    const url = '/api/posts/'+this.props.params.postId;
    axios.get(url).then(
      (post) => {
        console.log(post.data);
        this.setState({post:post.data});
      }
    ).catch(function(err){
      console.log(err);
    });
    // url = '/api/comments/'+this.props.params.postId;
    // axios.get(url).then(
    //   (comments) => {
    //     console.log(comments.data);
    //     this.setState({post:comments.data});
    //   }
    // ).catch(function(err){
    //   console.log(err);
    // });
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.fixSideBar);
    window.removeEventListener('resize',this.fixSideBar);
  }
  componentDidUpdate() {
    this.initMap();
  }
  initMap(){
    if(this.state.post != null) {
      var location = {
        lat: this.state.post.placeLocation.lat,
        lng: this.state.post.placeLocation.log
      }
      let mapContainer = document.getElementById('single-map');
      let options = GoogleMapOptions;
      options.center = location;
      options.zoom = 12;
      $("#single-map").height("400px");
      var map = new google.maps.Map(mapContainer,options);
      var domContainerNode = document.createElement("div");
      ReactDOM.render(<MapInfoBox post={this.state.post}/>,domContainerNode);
      // console.log(domContainerNode.innerHTML);
      var infowindow = new google.maps.InfoWindow({
        content: domContainerNode.innerHTML,
        pixelOffset: new google.maps.Size(0,50),
        maxWidth: 250
      });
      ReactDOM.unmountComponentAtNode(domContainerNode);
      var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: {lat: location.lat , lng: location.lng}
      });
      infowindow.open(map, marker);
      marker.addListener('click', function() {
         infowindow.open(map, marker);
      });
    }
  }
  render(){
    var theStyle = {
      backgroundImage: ''
    }
    if(this.state.post != null) {
      var backGroundImg = "url(" + this.state.post.photos[this.state.post.coverIndex] + ")";
      theStyle = {
        backgroundImage: backGroundImg
      }
      var days = distanceDate(this.state.post.arriveTime,this.state.post.leaveTime);
      return (
        <div className="single">
          <div className="post-header" style={theStyle}>
            <Link to='/' className="back-list"></Link>
            <button id="open-modal-btn" type="button" className="btn btn-warning btn-md" data-toggle="modal" data-target="#imageSlider">浏览相册</button>
          </div>
          <div className="post-body">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                </div>
              </div>
              <div className="row">
                <div className="col-md-offset-1 col-md-8 col-sm-12 seperator-divs">
                  <div className="place-name">
                    <span className='content'>{this.state.post.placeName}</span>
                    <Link to={this.state.editLink}>编辑足迹</Link>
                  </div>
                  <div className="place-comment">
                    <h3 className="section-title">旅行日记</h3>
                    <div dangerouslySetInnerHTML={{__html: this.state.post.placeComment}} />
                  </div>
                  <div className="place-location">
                    <h3 className="section-title">旅行目的地</h3>
                    <div id="single-map"></div>
                    <div id="pano"></div>
                  </div>
                  <div className="user-comments">
                    <h3 className="section-title">网评</h3>
                    <CommentForm {...this.props} id={this.state.post._id} />
                  </div>
                </div>
                <div id="sidebar" className="col-md-3 col-sm-0" data-fixed-sidebar="false">
                  <div className="sidebar-header">
                    <p className="trip-duration">在这里玩耍了{days}天</p>
                  </div>
                  <div className="sidebar-content">
                    <p className="trip-sibar-info">
                      <span className="info-label">抵达日期:</span>
                      <span className="info-msg">{convertDateString(this.state.post.arriveTime)}</span>
                    </p>
                    <p className="trip-sibar-info">
                      <span className="info-label">返程日期:</span>
                      <span className="info-msg">{convertDateString(this.state.post.leaveTime)}</span>
                    </p>
                    <p className="trip-sibar-info">
                      <span className="info-label">交通工具:</span>
                      <span className="info-msg"><i className="fa fa-plane tour-duration" aria-hidden="true"></i></span>
                    </p>
                    <p className="trip-sibar-info">
                      <span className="info-label">相片数量:</span>
                      <span className="info-msg">{this.state.post.photos.length}  <i className="fa fa-picture-o" aria-hidden="true"></i></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <ImageSlider photos={this.state.post.photos} />
            <Footer />
          </div>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
}

exports = module.exports = Single;
