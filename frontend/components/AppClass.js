import React from 'react';
import axios from 'axios';

const initialState = {
  grid: {'x':2, 'y':2},
  counter: 0,
  message: '',
  email: '',
}

const URL = `http://localhost:9000/api/result`;

export default class AppClass extends React.Component {

  state = initialState;

  onSubmit = () => {
    // this needs to be able to send x, y, counter, and email to the api
    // axios.post(URL, )
  }  

  moveUp = () => {
    if(this.state.grid.y > 1){
      this.setState({...this.state, 
        counter: this.state.counter + 1, 
        grid:{...this.state.grid, y: this.state.grid.y -1},
        message: ''
      })
    } else {
      this.setState({...this.state, message: `You can't go up`})
    }
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.grid.x}, {this.state.grid.y})</h3>
          <h3 id="steps">You moved {this.state.counter} times</h3>
        </div>
        <div id="grid">
          <div className={`${this.state.grid.x === 1 && this.state.grid.y === 1 ? 'square active' : 'square'}`}>{this.state.grid.x === 1 && this.state.grid.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 2 && this.state.grid.y === 1 ? 'square active' : 'square'}`}>{this.state.grid.x === 2 && this.state.grid.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 3 && this.state.grid.y === 1 ? 'square active' : 'square'}`}>{this.state.grid.x === 3 && this.state.grid.y === 1 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 1 && this.state.grid.y === 2 ? 'square active' : 'square'}`}>{this.state.grid.x === 1 && this.state.grid.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 2 && this.state.grid.y === 2 ? 'square active' : 'square'}`}>{this.state.grid.x === 2 && this.state.grid.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 3 && this.state.grid.y === 2 ? 'square active' : 'square'}`}>{this.state.grid.x === 3 && this.state.grid.y === 2 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 1 && this.state.grid.y === 3 ? 'square active' : 'square'}`}>{this.state.grid.x === 1 && this.state.grid.y === 3 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 2 && this.state.grid.y === 3 ? 'square active' : 'square'}`}>{this.state.grid.x === 2 && this.state.grid.y === 3 ? "B" : ""}</div>
          <div className={`${this.state.grid.x === 3 && this.state.grid.y === 3 ? 'square active' : 'square'}`}>{this.state.grid.x === 3 && this.state.grid.y === 3 ? "B" : ""}</div>
          {/* <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div> */}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button onClick={this.moveUp} id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}



          