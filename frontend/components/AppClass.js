import React from "react";
import axios from "axios";

const initialState = {
  grid: { x: 2, y: 2 },
  counter: 0,
  message: "",
  email: "",
};

const URL = `http://localhost:9000/api/result`;

export default class AppClass extends React.Component {
  state = initialState;

  onSubmit = (evt) => {
    evt.preventDefault();
    const infoToSend = {
      x: this.state.grid.x,
      y: this.state.grid.y,
      steps: this.state.counter,
      email: this.state.email,
    };
    axios
      .post(URL, infoToSend)
      .then((res) => {
        this.setState({ ...this.state, message: res.data.message });
        this.setState({ ...this.state, email: "" });
      })
      .catch((err) => {
        this.setState({ ...this.state, message: err.response.data.message });
      });
  };

  changeInput = (evt) => {
    const { value } = evt.target;
    this.setState({ ...this.state, email: value });
  };

  moveUp = () => {
    if (this.state.grid.y > 1) {
      this.setState({
        ...this.state,
        counter: this.state.counter + 1,
        grid: { ...this.state.grid, y: this.state.grid.y - 1 },
        message: "",
      });
    } else {
      this.setState({ ...this.state, message: `You can't go up` });
    }
  };

  moveDown = () => {
    if (this.state.grid.y < 3) {
      this.setState({
        ...this.state,
        counter: this.state.counter + 1,
        grid: { ...this.state.grid, y: this.state.grid.y + 1 },
        message: "",
      });
    } else {
      this.setState({ ...this.state, message: `You can't go down` });
    }
  };

  moveLeft = () => {
    if (this.state.grid.x > 1) {
      this.setState({
        ...this.state,
        counter: this.state.counter + 1,
        grid: { ...this.state.grid, x: this.state.grid.x - 1 },
        message: "",
      });
    } else {
      this.setState({ ...this.state, message: `You can't go left` });
    }
  };

  moveRight = () => {
    if (this.state.grid.x < 3) {
      this.setState({
        ...this.state,
        counter: this.state.counter + 1,
        grid: { ...this.state.grid, x: this.state.grid.x + 1 },
        message: "",
      });
    } else {
      this.setState({ ...this.state, message: `You can't go right` });
    }
  };

  resetGrid = () => {
    this.setState({
      ...this.state,
      counter: 0,
      grid: { x: 2, y: 2 },
      message: "",
      email: "",
    });
  };

  render() {
    const { className } = this.props;
    const x1 = this.state.grid.x === 1;
    const x2 = this.state.grid.x === 2;
    const x3 = this.state.grid.x === 3;
    const y1 = this.state.grid.y === 1;
    const y2 = this.state.grid.y === 2;
    const y3 = this.state.grid.y === 3;
    const sQA = "square active";
    const sQ = "square";

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">
            Coordinates ({this.state.grid.x}, {this.state.grid.y})
          </h3>
          <h3 id="steps">
            You moved {this.state.counter}{" "}
            {this.state.counter === 1 ? "time" : "times"}
          </h3>
        </div>
        <div id="grid">
          <div className={x1 && y1 ? sQA : sQ}>{x1 && y1 ? "B" : ""}</div>
          <div className={x2 && y1 ? sQA : sQ}>{x2 && y1 ? "B" : ""}</div>
          <div className={x3 && y1 ? sQA : sQ}>{x3 && y1 ? "B" : ""}</div>
          <div className={x1 && y2 ? sQA : sQ}>{x1 && y2 ? "B" : ""}</div>
          <div className={x2 && y2 ? sQA : sQ}>{x2 && y2 ? "B" : ""}</div>
          <div className={x3 && y2 ? sQA : sQ}>{x3 && y2 ? "B" : ""}</div>
          <div className={x1 && y3 ? sQA : sQ}>{x1 && y3 ? "B" : ""}</div>
          <div className={x2 && y3 ? sQA : sQ}>{x2 && y3 ? "B" : ""}</div>
          <div className={x3 && y3 ? sQA : sQ}>{x3 && y3 ? "B" : ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.moveLeft} id="left">
            LEFT
          </button>
          <button onClick={this.moveUp} id="up">
            UP
          </button>
          <button onClick={this.moveRight} id="right">
            RIGHT
          </button>
          <button onClick={this.moveDown} id="down">
            DOWN
          </button>
          <button onClick={this.resetGrid} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.email}
            onChange={this.changeInput}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}
