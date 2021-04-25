import { Component } from "react";

export default class App extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState((prevState) => {
      return {
        count: ++prevState.count,
      };
    });
  };

  handleDecrement = () => {
    this.setState((prevState) => {
      return {
        count: --prevState.count,
      };
    });
  };

  componentDidUpdate() {
    localStorage.setItem("_increment", JSON.stringify(this.state));
  }

  componentDidMount() {
    const data = localStorage.getItem("_increment");
    if (data) {
      this.setState((prevState) => {
        return JSON.parse(data);
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleIncrement}>+</button>
        <h2>{this.state.count}</h2>
        <button onClick={this.handleDecrement}>-</button>
      </div>
    );
  }
}
