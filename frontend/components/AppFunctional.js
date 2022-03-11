import React, {useState} from 'react';
import axios from 'axios';

const URL = `http://localhost:9000/api/result`;

export default function AppFunctional(props) {

  const [grid, setGrid] = useState({x:2, y:2});
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');



  const onSubmit = (evt) => {
    evt.preventDefault();
    const infoToSend = {
      x: grid.x,
      y: grid.y,
      steps: counter,
      email: email
    };
    axios.post(URL, infoToSend)
    .then(res => {
      setMessage(res.data.message)
      setEmail('')
    })
    .catch(err => {
      setMessage(err.response.data.message)
    })
  }

  const changeInput = evt => {
    const {value} = evt.target;
    setEmail(value);
  }

  const moveUp = () => {
    if(grid.y > 1) {
      setCounter(counter +1)
      setGrid({...grid, 'y': grid.y -1})
      setMessage('')
    } else {
      setMessage(`You can't go up`)
    }
  }

  const moveDown = () => {
    if(grid.y < 3) {
      setCounter(counter +1)
      setGrid({...grid, 'y': grid.y +1})
      setMessage('')
    } else {
      setMessage(`You can't go down`)
    }
  }

  const moveLeft = () => {
    if(grid.x > 1) {
      setCounter(counter +1)
      setGrid({...grid, 'x': grid.x -1})
      setMessage('')
    } else {
      setMessage(`You can't go left`)
    }   
  }

  const moveRight = () => {
    if(grid.x < 3) {
      setCounter(counter +1)
      setGrid({...grid, 'x': grid.x +1})
      setMessage('')
    } else {
      setMessage(`You can't go right`)
    }   
  }

  const resetGrid = () => {
    setCounter(0)
    setGrid({'x': 2, 'y': 2})
    setMessage('')
    setEmail('')
  }

  const x1 = grid.x === 1;
  const x2 = grid.x === 2;
  const x3 = grid.x === 3;
  const y1 = grid.y === 1;
  const y2 = grid.y === 2;
  const y3 = grid.y === 3;
  const sQA = "square active";
  const sQ = "square";

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({grid.x}, {grid.y})</h3>
        <h3 id="steps">You moved {counter}{' '}{counter === 1 ? 'time' : 'times'}</h3>
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
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={moveLeft} id="left">LEFT</button>
        <button onClick={moveUp} id="up">UP</button>
        <button onClick={moveRight}id="right">RIGHT</button>
        <button onClick={moveDown} id="down">DOWN</button>
        <button onClick={resetGrid} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input value={email} onChange={changeInput} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
