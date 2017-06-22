import React,{Component} from 'react';
import Header from './Header';

class Main extends Component {
  render() {
    return(
      <div>
        <Header comments={this.props.comments} user={this.props.user} userLogout={this.props.userLogout} />
        <div className="fixed-header-content">
          {React.cloneElement(this.props.children, this.props)}
        </div>
      </div>
    );
  }
}

exports = module.exports = Main;
