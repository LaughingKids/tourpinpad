import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { loadJS } from '../utils/ScriptLoader';
import {GoogleMapApiKey} from './GoogleMap/GoogleMapOptions';
import {GoogleMapOptions} from './GoogleMap/GoogleMapOptions';
import MapInfoBox from './MapInfoBox';

class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapApiKey: GoogleMapApiKey,
      mapOptions: GoogleMapOptions,
      mapCenter: {
        lat:39.1158237,
        lng:117.2784434
      },
      destinationIdx: 0,
      currentTripId: null
    }
    this.initMap = this.initMap.bind(this);
    this.animateCircle = this.animateCircle.bind(this);
    this.handlePickDestination = this.handlePickDestination.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.createInfoBoxContent = this.createInfoBoxContent.bind(this);
  }
  componentDidMount(){
    window.initMap = this.initMap;
    // loadJS('https://maps.googleapis.com/maps/api/js?key='+this.state.mapApiKey+'&callback=initMap');
    // this.initMap();
    window.addEventListener("resize", this.resizeMap);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeMap);
  }
  resizeMap(){
    let height = $(window).innerHeight() - 50;
    $("#map").height(height);
  }
  animateCircle(line) {
    var count = 0;
    var currentTrip = window.setInterval(function() {
        var symbolOne = {
          path: 'M -2,0 0,-2 2,0 0,2 z',
          strokeColor: '#F00',
          fillColor: '#F00',
          fillOpacity: 1
        };
        var symbolTwo = {
          path: 'M -2,-2 2,2 M 2,-2 -2,2',
          strokeColor: '#292',
          strokeWeight: 4
        };
        var icons = [
          {
            icon: symbolOne,
            offset: '100%'
          },
          {
            icon: symbolTwo,
            offset: '100%'
          }
        ];
        count = (count + 1) % 200;
        console.log(icons.length);
        var newIcons = [];
        console.log((count + 1) % 2);
        if((count + 1) % 2 == 0) {
          icons[0].offset = (count / 2) + '%';
          newIcons.push(icons[0]);
          line.set('icons', newIcons);
        } else {
          icons[1].offset = (count / 2) + '%';
          newIcons.push(icons[1]);
          line.set('icons', newIcons);
        }
        if((count / 2) == 99) {
          clearInterval(currentTrip);
          this.initMap();
        }
        // line.set('icons', icons);
    }, 200);
    this.setState({currentTripId: currentTrip});
  }
  createInfoBoxContent(){
    var destination = this.props.locations.locations[this.state.destinationIdx];
    var post = {
      placeName: "天津市东丽区人民检察院",
      arriveTime: new Date(),
      leaveTime: new Date(),
      coverIndex: 0,
      photos:["http://wx2.sinaimg.cn/mw690/7175dba7ly1fc44rtip7jj20qo0zkqbh.jpg"]
    };
    if(this.state.currentTripId != null){
      post = {
        placeName: destination.info.title,
        arriveTime: new Date(),
        leaveTime: new Date(),
        coverIndex: 0,
        photos:[destination.info.cover]
      }
    }
    var domContainerNode = document.createElement("div");
    ReactDOM.render(<MapInfoBox post={post}/>,domContainerNode);
    let infoContentHTML = domContainerNode.innerHTML;
    ReactDOM.unmountComponentAtNode(domContainerNode);
    // console.log(infoContentHTML);
    return infoContentHTML;
  }
  distanceHelper(pointA,pointB) {
    var x = pointA.lat - pointB.lat;
    var y = pointA.lng - pointB.lng;
    var distance = Math.pow(x, 2) + Math.pow(y, 2);
    return Math.sqrt(distance);
  }
  zoomAdjustor(distance){
    if(distance < 3) {
      return 13;
    } else if(distance < 6) {
      return 9;
    } else if(distance < 10) {
      return 8;
    }
    var theCase = parseInt(distance / 10);
    switch (theCase) {
      case 0: /* 0-9 */
        return 7;
        break;
      case 1:  /* 11-29 */
      case 2:
        return 6;
        break;
      case 3: /* 31-49 */
      case 4:
        return 5;
        break;
      case 5: /* 51-69 */
      case 6:
        return 4;
        break;
      default:
        return 3;
        break;
    }
  }
  drawPath(destId){
    // var map = this.state.map;
    var id = typeof(destId) === 'object' ? this.state.destinationIdx : destId;
    // console.log(destId);
    // alert(id);
    var tourPlanCoordinates = [this.state.mapCenter];
    let locations = this.props.locations.locations;
    tourPlanCoordinates.push(locations[id]);
    let mapContainer = document.getElementById('map');
    let options = GoogleMapOptions;
    options.center = this.state.mapCenter;
    var distance = parseInt(this.distanceHelper(tourPlanCoordinates[0],tourPlanCoordinates[1]));
    options.zoom = this.zoomAdjustor(distance);
    var map = new google.maps.Map(mapContainer,options);
    var flightPath = new google.maps.Polyline({
      path: tourPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map:map
    });
    map.setCenter(tourPlanCoordinates[0],6);
    this.animateCircle(flightPath);
  }
  initMap() {
    let mapContainer = document.getElementById('map');
    let height = $(window).innerHeight() - 50;
    if(this.props.locations != null) {
      let options = GoogleMapOptions;
      var locations = this.props.locations.locations;
      options.center = this.state.mapCenter;
      if(this.state.currentTripId != null) {
        options.center = this.props.locations.locations[this.state.destinationIdx];
      }
      options.zoom = 14;
      $("#map").height(height);
      var map = new google.maps.Map(mapContainer,options);
      var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: options.center
      });
      var infowindow = new google.maps.InfoWindow({
        content: this.createInfoBoxContent(),
        maxWidth: 250
      });
      infowindow.open(map, marker);
      marker.addListener('click', function() {
         infowindow.open(map, marker);
      });
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.locations !== this.props.locations) {
      return true;
    }
    return false;
  }
  componentDidUpdate(){
    this.initMap();
  }
  handlePickDestination(e){
    if(this.state.currentTripId != null) {
      clearInterval(this.state.currentTripId);
      this.drawPath(e.target.value);
    }
    this.setState({destinationIdx:e.target.value});
  }
  render(){
    var locations = this.props.locations.locations;
    if(typeof(locations) !== 'undefined') {
      return(
        <div className="col-md-5 clearPadding">
          <div className="map-controller-bar text-center">
            <label>选择目的地:</label>
            <select className="form-control" id="destination-picker" onChange={this.handlePickDestination}>
              {locations.map((location,idx)=><option key={idx} value={idx}>{location.info.title}</option>)}
            </select>
            <button type='button' className="btn btn-success" onClick={this.drawPath}>开始旅途</button>
            <button type='button' className="btn btn-danger" onClick={this.initMap}>结束旅途</button>
          </div>
          <div id="map"></div>
        </div>
      )
    } else {
      return(
        <div className="col-md-5 clearPadding"></div>
      )
    }

  }
}

module.exports = Map;
