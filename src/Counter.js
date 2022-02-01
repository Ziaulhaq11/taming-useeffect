import React from 'react'

const ErrorComponent = () => <div>{this.props.ignore}</div>

export default class Counter extends React.Component {
  constructor(props) {
    console.log("Constructor"); //It runs only one time while mounting
    super(props);
    this.state = {
      counter: 0,
      seed: 0,
      initializing : true
    };
    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }

  static getDerivedStateFromProps(props, state) {
    //This method is called before any other. Used to copy props into state.
    console.log("get derived");
    if (props.seed && state.seed !== props.seed) {
      return {
        seed: props.seed,
        counter: props.seed,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log("Component Did Mount"); //runs only after component mounts , first constructor , then render and finally this one;
    setTimeout(() => {
      this.setState({initializing : false})
    }, 500)
    console.log("--------------------");
  }

  shouldComponentUpdate(nextProps, nextState) {
    //here we are saying even though this prop changes dont render
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      console.log("Should Component Update DO NOT RENDER");
      console.log("-------------------------");
      return false;
    }
    console.log("Should Component Update");

    return true; //true by default
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Get Snapshot before update')
    //Before Render
    //use to capture props which are not stored in state before we rerender that component and whatever we return that goes to ComponentDidUpdate Snapshot param.
    return null;
  }

  render() {
    console.log("Render"); //It runs on every render
    if (this.state.initializing) {
      return <div>Initializing...</div>
    }
    if (this.props.showErrorComponent && this.state.error) {
      return <div>We have encountered an error!</div>
    }
    return (
      <div>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <div className="counter">Counter : {this.state.counter}</div>
        {this.props.showErrorComponent ? <ErrorComponent /> : null}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("Component Did update"); //So it doesnt run after component mounted but it runs when component updates but after render
    console.log("--------------------");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount"); //When componenet will unmount. Using here with app2.js for conditional unmounting.
    console.log("--------------------");
  }

  componentDidCatch(error, errorInfo) { //It will catch the error and stops the application to crash
    console.log('COmponent did catch')
    this.setState({error,errorInfo})
  }
}