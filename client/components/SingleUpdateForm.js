import React, {Component} from 'react';
import { getCookie,setCookie } from '../utils/cookie';
import TinyMCE from 'react-tinymce';
import {defaultDateString} from '../utils/DateHelper';
import {GoogleMapApiKey} from './GoogleMap/GoogleMapOptions';
import { loadJS } from '../utils/ScriptLoader';

class SingleUpdateForm extends Component {
  constructor(props){
    super(props);
    let token = getCookie('token');
    this.state = {
      /* helper state */
      addedPic:'',
      pictureUpdateMsg:'',
      placeLat: this.props.post.placeLocation.lat,
      placeLog: this.props.post.placeLocation.log,
      mapApiKey:GoogleMapApiKey,
      post_id: this.props.id,
      /* in model */
      placeName:this.props.post.placeName,
      placeComment:this.props.post.placeComment,
      placeLocation: {
        lat:'',
        log:'',
      },
      arriveTime: defaultDateString(this.props.post.arriveTime),
      leaveTime: defaultDateString(this.props.post.leaveTime),
      photos:this.props.post.photos,
      friends:this.props.post.friends,
      experienced:this.props.post.experienced,
      coverIndex:this.props.post.coverIndex,
      token: token
    }
    this.removeImage = this.removeImage.bind(this);
    this.addPictures = this.addPictures.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.resizeGrid = this.resizeGrid.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.geolocate = this.geolocate.bind(this);
    this.initAutocomplete = this.initAutocomplete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setCover = this.setCover.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }
  handleEditorChange(e) {
    this.setState({placeComment:e.target.getContent()});
    console.log('Content was updated:',e.target.getContent());
  }
  handleDelete(e) {
    e.preventDefault();
    const deleteMsg = 'Comfirm delete this post?';
    if(window.confirm(deleteMsg)) {
      this.props.postDeleteRequest(this.state.post_id,this.state.token);
    } else {
      alert('Post not be deleted!');
    }
  }
  setCover(e) {
    e.preventDefault();
    let coverIndex = e.target.getAttribute('data-cover-index');
    this.setState({coverIndex:coverIndex});
  }
  handleRadioClick(e) {
    this.setState({[e.target.name]:e.target.value});
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
      console.log(location);
    });
  }
  componentDidUpdate(){
    this.resizeGrid();
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
  shouldComponentUpdate(nextProps,nextState) {
    if(nextState.coverIndex != this.state.coverIndex) {
      alert('Header Image has been changed');
    }
    return true;
  }
  componentDidMount(){
    window.initAutocomplete = this.initAutocomplete;
    loadJS('https://maps.googleapis.com/maps/api/js?key='+this.state.mapApiKey+'&libraries=places&callback=initAutocomplete');
    this.resizeGrid();
    $('[data-toggle="tooltip"]').tooltip();
    window.addEventListener("resize", this.resizeGrid);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeGrid);
  }
  resizeGrid(){
    let height = $(".previewGridImg ").width();
    $(".previewGridImg ").height(height);
  }
  handleTyping(e) {
      this.setState({[e.target.name]:e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    delete this.state.addedPic;
    delete this.state.pictureUpdateMsg;
    delete this.state.mapApiKey;
    console.log(this.state);
    const change = 'Comfirm update this post?';
    if(window.confirm(change)) {
      this.props.postUpdateRequest(this.state);
    } else {
      alert('Post not be changed!');
    }
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
    console.log(this.state.photos);
  }
  removeImage(e){
    var idx = e.target.id;
    var photos = this.state.photos;
    photos.splice(idx, 1);
    this.setState({photos:photos});
  }
  render(){
    return (
      <form id="trip-update-form">
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
              <input className="form-check-input"
                     type="radio"
                     onChange={this.handleRadioClick}
                     name="experienced"
                     value="true"
                     checked={this.state.experienced} />
              <span className="form-check-description">去过那里</span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input className="form-check-input"
                     type="radio"
                     onChange={this.handleRadioClick}
                     name="experienced"
                     value="false"
                     checked={!this.state.experienced}/>
             <span className="form-check-description">还想再去</span>
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
            content={this.state.placeComment}
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
              var coverLabel='';
              if(idx == this.state.coverIndex) {
                coverLabel = idx;
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
                className="form-control"
                placeholder="http://"
                value={this.state.addedPic}
                onChange={this.handleTyping}
            />
          <i className="fa fa-plus-circle" title="添加图片" data-toggle="tooltip" data-placement="right" onClick={this.addPictures} aria-hidden="true"></i>
          </div>
        </div>
        <div className="form-group text-center">
          <button className="btn btn-success btn-md" onClick={this.handleSubmit}>
            刷新足迹
          </button>
          <button className="btn btn-danger btn-md" onClick={this.handleDelete}>
            残忍忘记
          </button>
        </div>
      </form>
    )
  }
}

SingleUpdateForm.propTypes={
  postUpdateRequest: React.PropTypes.func.isRequired,
  postDeleteRequest: React.PropTypes.func.isRequired
}
module.exports = SingleUpdateForm;
