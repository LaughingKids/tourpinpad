import React,{ Component } from 'react';

class ImageSlider extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentIdx: 0
    }
    this.changeImage = this.changeImage.bind(this);
    this.thisImg = this.thisImg.bind(this);
    this.resizePicture = this.resizePicture.bind(this);
  }
  changeImage(e){
    var changeIndex = parseInt(this.state.currentIdx, 10) + parseInt(e.target.getAttribute('data-direction'), 10);
    console.log(changeIndex);
    if(changeIndex < 0) {
      this.setState({currentIdx: this.props.photos.length - 1});
    } else if(changeIndex > this.props.photos.length - 1) {
      this.setState({currentIdx: 0});
    } else {
      this.setState({currentIdx: changeIndex});
    }
  }
  thisImg(e) {
    e.preventDefault();
    var index = e.target.getAttribute('data-position');
    this.setState({currentIdx:index});
  }
  resizePicture(){
    var img = document.getElementById('show-image');
    var hwRate = img.height / img.width;
    var currentWidth = window.innerWidth * 0.8;
    var newHeight = currentWidth * hwRate;
    if(newHeight > window.innerHeight * 0.8) {
      newHeight = window.innerHeight * 0.8;
    }
    document.getElementById('show-image').height = newHeight;
  }
  componentDidMount(){
    this.resizePicture();
    window.addEventListener("resize", this.resizePicture);
  }
  componentDidUpdate(){
    this.resizePicture();
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.resizePicture);
  }
  render(){
    return(
      <div className="modal fade" id="imageSlider" tabindex="-1" role="dialog" aria-labelledby="imageSlider" aria-hidden="true">
        <div className="img-slider-controller" data-direction="-1" id="behind" onClick={this.changeImage}>
        </div>
        <div className="img-slider-controller" data-direction="1" id="before" onClick={this.changeImage}>
        </div>
        <button type="button" className="close modal-close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img id="show-image" data-direction="1" src={this.props.photos[this.state.currentIdx]} onClick={this.changeImage}/>
            </div>
          </div>
        </div>
        <div className="modal-footer row">
          {this.props.photos.map((photoUrl,idx)=>{
            var backGroundImg = "url(" + photoUrl + ")";
            var theStyle = {
              backgroundImage: backGroundImg
            }
            return (
              <div className="col-md-1 slider-control" onClick={this.thisImg} data-position={idx} style={theStyle} />
            )
          })}
        </div>
      </div>
    )
  }
}

module.exports = ImageSlider;
