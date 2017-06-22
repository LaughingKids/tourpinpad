import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import Main from './Main';

function mapStateToProps(state) {
  if(state.user != null) {
    if(state.user.error != 0) {
      return {
        user: state.user.error,
        postPage: state.posts,
        locations: state.locations,
        comments: state.comments
      }
    } else {
      return {
        user: state.user.user,
        postPage: state.posts,
        locations: state.locations,
        comments: state.comments
      }
    }
  } else {
    return {
      user: state.user,
      postPage: state.posts,
      locations: state.locations,
      comments: state.comments
    }
  }
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispachToProps)(Main);

export default App;
