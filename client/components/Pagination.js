import React, {Component} from 'react';
import Link from 'react-router';

class Pagination extends Component {
  render(){
    var pages = new Array();
    var idx;
    for(idx = 1; idx <= this.props.total; idx++) {
      pages.push(idx+1);
    }
    if(pages.length > 0) {
      return (
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            {pages.map((page,idx)=><button value={page} key={idx} onClick={this.props.loadPost}>page</button>)}
          </div>
        </div>
      )
    } else {
      return (
        <div className="row"></div>
      )
    }
  }
}

module.exports = Pagination;
