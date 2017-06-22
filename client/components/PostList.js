import React, {Component} from 'react';
import PostGrid from './PostGrid';
import axios from 'axios';
import store from '../store';

class PostList extends Component {
  constructor(props){
    super(props);
    this.state = {
        perPage:this.props.postPage.postPage == null ? 1 : this.props.postPage.postPage.perPage, /* dont forget backend */
        currentPage:this.props.postPage.postPage == null ? 1 : this.props.postPage.postPage.page,
        posts:null,
        pages:this.props.postPage.postPage == null ? [] : this.props.postPage.postPage.pages,
        been:this.props.postPage.postPage == null ? 0 : this.props.postPage.postPage.been,
    }
    this.changePage = this.changePage.bind(this);
    this.handleFilterBtnClick = this.handleFilterBtnClick.bind(this);
  }
  handleFilterBtnClick(e) {
    this.setState({
      been: e.target.value
    });
    e.preventDefault();
    /* current = 1, perpage = 1, pages = [], been = e.target.value */
    this.props.doFilterAction(1,1,[],e.target.value);
    this.loadPost(1,e.target.value);
  }
  changePage(e) {
    e.preventDefault();
    // alert(e.target.id);
    this.props.changePage(e.target.value,this.state.perPage,this.state.pages,this.state.been);
    this.loadPost(e.target.value);
    var changed = 0.001;
    var interval = setInterval(function(changed){
      document.body.scrollTop -= changed; // For Chrome, Safari and Opera
      document.documentElement.scrollTop -= changed; // For IE and Firefox
    }, 100);
    setTimeout(function(){
      window.clearInterval(interval);
    },1000);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.posts != this.state.posts) {
      return true;
    } else {
      return false;
    }
  }
  // componentDidUpdate(){
  //   console.log(this.state.posts);
  // }
  componentDidMount(){
    // console.log('did mount');
    this.loadPost(this.state.currentPage);
  }
  componentDidUpdate(){
    console.log('did update');
    // $('.checked').removeClass('checked');
  }
  loadPost(page,type){
    type = (typeof type !== 'undefined') ?  type : this.state.been;
    const url = '/api/posts?page=' + page + '&been=' + type;
    axios.get(url).then(
      (postPayload) => {
        var locations = [];
        postPayload.data.map((post,idx) => {
          if(post.placeLocation != null) {
            var location = {
              lat: post.placeLocation.lat,
              lng: post.placeLocation.log,
              info: {
                title: post.placeName,
                content: post.placeComment,
                cover: post.photos[0]
              }
            }
            locations.push(location);
          }
        });
        this.props.setMapLocations(locations);
        if(page == 1) {
          let count = postPayload.data[0];
          postPayload.data.shift();
          var totalPage = count.total % count.perPage;
          if(count.total < count.perPage) {
            totalPage = 1;
          } else {
              totalPage = count.total % count.perPage == 0 ? count.total / count.perPage : parseInt(count.total / count.perPage) + 1;
          }
          var allPages = new Array();
          var idx;
          for(idx = 0; idx < totalPage; idx++) {
            allPages.push(idx+1);
          }
          this.setState({
            posts:postPayload.data,
            perPage: count.perPage,
            pages: allPages
          });
        } else {
          this.setState({
            posts:postPayload.data,
            pages: this.state.pages,
            currentPage:page
          });
        }
        // console.log(postPayload.data);
      }
    ).catch(function(err){
      console.log(err);
    });
  }
  render(){
    // console.log('render');
    // console.log(this.state.posts);
    if(this.state.posts != null) {
      return (
        <div className="PostList">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 PostGridFilter">
              <button type="button" className="btn btn-primary" onClick={this.handleFilterBtnClick} value="0">所有足迹</button>
              <button type="button" className="btn btn-success" onClick={this.handleFilterBtnClick} value="1">过往足迹</button>
              <button type="button" className="btn btn-warning" onClick={this.handleFilterBtnClick} value="-1">心愿清单</button>
            </div>
          </div>
          <div className="row">
            {this.state.posts.map((post, i) => <PostGrid user={this.props.user} key={i} i={i} post={post} />)}
            <div className="clearBoth"></div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 text-center">
              {this.state.pages.map((page,idx)=><button value={page} type="button" className="btn btn-primary btn-md pagination" key={idx} onClick={this.changePage}>{page}</button>)}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="PostList">
        </div>
      )
    }
  }
}
exports = module.exports = PostList;
