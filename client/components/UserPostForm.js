import React, {Component} from 'react';
import TinyMCE from 'react-tinymce';
import { getCookie,setCookie } from '../utils/cookie';
import {GoogleMapApiKey} from './GoogleMap/GoogleMapOptions';
import { loadJS } from '../utils/ScriptLoader';


class UserPostForm extends Component {
  constructor(props) {
    super(props);
    let token = getCookie('token');
    this.state= {
      /* helper state */
      addedPic:'',
      pictureUpdateMsg:'',
      placeLat: '',
      placeLog: '',
      mapApiKey:GoogleMapApiKey,
      /* in model */
      placeName:'',
      placeComment:'',
      placeLocation: {
        lat:'',
        log:'',
      },
      arriveTime:'',
      leaveTime:'',
      photos:[],
      friends: [],
      experienced:true,
      coverIndex:0,
      trafficType:'',
      token: token,
    }
    this.handleTyping = this.handleTyping.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addPictures = this.addPictures.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.resizeGrid = this.resizeGrid.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.setCover = this.setCover.bind(this);
  }
  handleEditorChange(e) {
    this.setState({placeComment:e.target.getContent()});
    console.log('Content was updated:',e.target.getContent());
  }
  setCover(e) {
    e.preventDefault();
    let coverIndex = e.target.getAttribute('data-cover-index');
    this.setState({coverIndex:coverIndex});
  }
  handleRadioClick(e) {
    this.setState({[e.target.name]:e.target.value});
  }
  shouldComponentUpdate(nextProps,nextState) {
    if(nextState.coverIndex != this.state.coverIndex) {
      alert('Header Image has been changed');
    }
    return true;
  }
  addPictures(e){
    e.preventDefault();
    if(this.state.addedPic.length == 0) {
      this.setState({pictureUpdateMsg:'Unreachable URL'});
      return;
    }
    if(this.state.photos.length < 9) {
      this.state.photos.push(this.state.addedPic);
      this.setState({pictureUpdateMsg:'Image Added'});
      this.setState({addedPic:''});
    } else {
      this.setState({pictureUpdateMsg:'Max allow to upload 9 pictures'});
      this.setState({addedPic:''});
    }
    this.resizeGrid();
    // console.log(this.state.photos);
  }
  handleTyping(e) {
      this.setState({[e.target.name]:e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    delete this.state.addedPic;
    delete this.state.pictureUpdateMsg;
    // console.log(this.state);
    this.props.postPublishmentRequest(this.state);
    // this.setState({
    //   addedPic:'',
    //   pictureUpdateMsg:'',
    //   placeLat: '',
    //   placeLog: '',
    //   placeName:'',
    //   placeComment:'',
    //   placeLocation: {
    //     lat:'',
    //     log:'',
    //   },
    //   arriveTime:'',
    //   leaveTime:'',
    //   photos:[],
    //   friends: [],
    //   experienced:true
    // });
  }
  initAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('locationName')),
        {types: ['geocode']});
    autocomplete.addListener('place_changed', ()=>{
      var place = autocomplete.getPlace();
      var location = place.geometry.location;
      this.setState({
        placeLat: location.lat(),
        placeLog: location.lng()
      });
      // console.log(location);
    });
  }
  geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
  componentDidMount(){
    window.initAutocomplete = this.initAutocomplete;
    loadJS('https://maps.googleapis.com/maps/api/js?key='+this.state.mapApiKey+'&libraries=places&callback=initAutocomplete');
    this.resizeGrid();
    window.addEventListener("resize", this.resizeGrid);
  }
  componentDidUpdate(){
    this.resizeGrid();
    $('[data-toggle="tooltip"]').tooltip();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeGrid);
  }
  resizeGrid(){
    let height = $(".previewGridImg").width();
    $(".previewGridImg ").height(height);
  }
  removeImage(e){
    var idx = e.target.id;
    var photos = this.state.photos;
    photos.splice(idx, 1);
    this.setState({photos:photos});
    this.resizeGrid();
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit} id="trip-publish-form">
        <div className="form-group">
          <label className="control-label">目的地名称</label>
          <input
            type="text"
            name="placeName"
            className="form-control"
            value={this.state.placeName}
            onChange={this.handleTyping}
            />
        </div>
        <fieldset className="form-group">
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" onChange={this.handleRadioClick} name="experienced" value="true"/>
              <span className="form-check-description">曾经去过</span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input" type="radio" onChange={this.handleRadioClick} name="experienced" value="false"/>
              <span className="form-check-description">计划要去</span>
            </label>
          </div>
        </fieldset>
        <div className="form-group">
          <label className="control-label">抵达日期(预计出发时间)</label>
          <input
            type="date"
            name="arriveTime"
            className="form-control"
            value={this.state.arriveTime}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">返程日期(预计回程时间)</label>
          <input
            type="date"
            name="leaveTime"
            className="form-control"
            value={this.state.leaveTime}
            onChange={this.handleTyping}
            />
        </div>
        <div className="form-group">
          <label className="control-label">定位目的地</label>
          <input
            type="text"
            name="locationName"
            id="locationName"
            className="form-control"
            onFocus={this.geolocate}
            />
          <input
            type="hidden"
            name="placeLat"
            className="form-control"
            value={this.state.placeLat}
            />
          <input
            type="hidden"
            name="placeLog"
            className="form-control"
            value={this.state.placeLog}
            />
        </div>
        <div className="form-group">
          <label className="control-label">旅行日记</label>
          <TinyMCE
            content="<p>在此处留下心情日记</p>"
            config={{
              plugins: 'link image code',
              height : '400px',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onChange={this.handleEditorChange}
          />
        </div>
        <div className="form-group">
          <label className="control-label">旅行相册(最多可上传9张图片)</label>
          <div className='image-preview-group row'>
            {this.state.photos.map((photoUrl,idx)=>{
              var backGroundImg = "url(" + photoUrl + ")";
              var theStyle = {
                backgroundImage: backGroundImg
              }
              return (
                <div className="col-md-3" key={idx}>
                  <div title="设置为顶部大图" data-toggle="tooltip" data-placement="top" className="previewGridImg " data-cover-index={idx} onClick={this.setCover} style={theStyle}>
                  </div>
                  <div className="remove-button">
                    <i className="fa fa-minus-circle" title="移除图片" data-toggle="tooltip" data-placement="bottom" onClick={this.removeImage} aria-hidden="true" id={idx}></i>
                  </div>
                  <div className="clearBoth"></div>
                </div>
              )}
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">图片路径</label>
          <div className='image-add-group'>
            <input
                type="text"
                name="addedPic"
                placeholder="http://"
                className="form-control"
                value={this.state.addedPic}
                onChange={this.handleTyping}
            />
            <i className="fa fa-plus-circle" onClick={this.addPictures} aria-hidden="true"></i>
          </div>
        </div>
        <div className="form-group">
          <input
              type="hidden"
              name="token"
              value={this.state.userToken}
          />
        </div>
        <div className="form-group text-center">
          <button className="btn btn-primary btn-md">
            发布足迹
          </button>
        </div>
      </form>
    )
  }
}
UserPostForm.propTypes={
  postPublishmentRequest: React.PropTypes.func.isRequired
}
module.exports = UserPostForm;
