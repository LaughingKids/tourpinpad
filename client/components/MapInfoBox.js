import React, {Component} from 'react';
import { convertDateString } from '../utils/DateHelper';

class MapInfoBox extends Component {
  render(){
    var backGroundImg = "url(" + this.props.post.photos[this.props.post.coverIndex] + ")";
    var theStyle = {
      backgroundImage: backGroundImg
    }
    return(
      <div className="map-info-box">
        <p className="map-info-name">
          {this.props.post.placeName}
        </p>
        <div className="map-info-picture" style={theStyle}>
        </div>
        <p className="map-info-comment">
          <span>抵达: {convertDateString(this.props.post.arriveTime)}</span>
          <i className="fa fa-plane tour-duration" aria-hidden="true"></i>
          <span>返程: {convertDateString(this.props.post.leaveTime)}</span>
        </p>
        <p className="map-info-picture-number">
          <i className="fa fa-camera" aria-hidden="true"></i> {this.props.post.photos.length}
        </p>
      </div>
    )
  }
}

module.exports = MapInfoBox;
