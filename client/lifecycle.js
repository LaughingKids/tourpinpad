import React from 'react';
import {render} from 'react-dom';

class LifeCycle extends React.Component {
  /* initially */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'default value'};
    console.log('constructor() is called !');
  }
  componentWillMount(){
    console.log('componentWillMount() is called !');
  }
  /* do render at this step */
  componentDidMount(){
    console.log('componentDidMount() is called !');
  }
  /* when change is happened */
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.value !== this.state.value) {
      console.log('shouldComponentUpdate() is called current state is '
                  + this.state.value
                  + ' next state is '
                  + nextState.value
                  + ' props is '
                  + this.props.value);
        return true;
    }
    return false;
  }
  componentWillUpdate(){
    console.log('componentWillUpdate() is called state is '
                + this.state.value
                + " which is previous state value. "
                + "The component does not changed yet.");
  }
  componentDidUpdate(){
    console.log('componentDidUpdate() is called state is '
                + this.state.value );
  }
  handleChange (event) {
    this.setState({value: event.target.value});
  }
  componentWillUnmount() {
    console.log('componentWillUnmount() is called !');
  }
  render() {
    console.log('rendering with state ' + this.state.value);
    return(
      <div>
        <h1> React LifeCycle Testing </h1>
        <input value={this.state.value} onChange={this.handleChange} />
        <p> React input shows up here <strong>{this.state.value}</strong></p>
        <pre>
        {`class LifeCycle extends React.Component {
          /* initially */
          constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = { value: 'default value'};
            console.log('constructor() is called !');
          }
          componentWillMount(){
            console.log('componentWillMount() is called !');
          }
          /* do render at this step */
          componentDidMount(){
            console.log('componentDidMount() is called !');
          }
          /* when change is happened */
          shouldComponentUpdate(nextProps,nextState){
            if(nextState.value !== this.state.value) {
              console.log('shouldComponentUpdate() is called current state is '
                          + this.state.value
                          + ' next state is '
                          + nextState.value
                          + ' props is '
                          + this.props.value);
                return true;
            }
            return false;
          }
          componentWillUpdate(){
            console.log('componentWillUpdate() is called state is '
                        + this.state.value
                        + " which is previous state value. "
                        + "The component does not changed yet.");
          }
          componentDidUpdate(){
            console.log('componentDidUpdate() is called state is '
                        + this.state.value );
          }
          handleChange (event) {
            this.setState({value: event.target.value});
          }
          componentWillUnmount() {
            console.log('componentWillUnmount() is called !');
          }
          render() {
            console.log('rendering with state ' + this.state.value);
            return(
              <div>
                <h1> React LifeCycle Testing </h1>
                <input value={this.state.value} onChange={this.handleChange} />
                <p> React input shows up here <strong>{this.state.value}</strong></p>
                <pre></pre>

              </div>
            )
          }
        }`}
        </pre>

      </div>
    )
  }
}

const domMountDom = document.getElementById('root');
render(<LifeCycle />,domMountDom);
