import React, { Component } from 'react';
import './GameBoard.css';
import Tiles from './Tiles'
import Board from './Board'

class GameBoard extends Component {
  constructor() {
    super();
    this.initial_board = {
      a1:null,a2:null,a3:null,a4:null,
      b1:null,b2:null,b3:null,b4:null,
      c1:null,c2:null,c3:null,c4:null,
      d1:null,d2:null,d3:null,d4:null
    }
    this.state = this.addTiles(this.addTiles(this.initial_board))
  }
  addTiles(board){
    let location = Board.available_spaces(board).sort(()=> .5 - Math.random()).pop()
    if(location){
      let two_or_four = Math.floor(Math.random()*2,0)?2:4
      return Board.set_tile(board,location,Board.new_tile(two_or_four))
    }
    return board
  }
  newGame(){
    this.setState(this.addTiles(this.addTiles(this.initial_board)))
  }
  setBoard(new_board){
    if(!Board.same_board(this.state,new_board)){
      this.setState(new_board)
      return true
    }
    return false
  }
  keyDown(e){
    let directions = {
      37: Board.left,
      38: Board.up,
      39: Board.right,
      40: Board.down
    }
    if(directions[e.keyCode]
      && this.setBoard(Board.fold_board(this.state,directions[e.keyCode]))
      && Math.floor(Math.random()*30,0)>0){
      setTimeout(()=>{
        this.setBoard(this.addTiles(this.state))
      },100)
    }
  }
  addTouchEvent(){
    window.addEventListener("touchstart",(e)=>{
      e.preventDefault()
      let startX = e.touches[0].clientX
      let startY = e.touches[0].clientY
      let lock = true
      window.addEventListener("touchmove",(e)=>{
        if((Math.abs(e.touches[0].clientX-startX)>20
          ||Math.abs(e.touches[0].clientY-startY)>20)
          &&lock){
          lock = false
          let moveX = e.touches[0].clientX-startX
          let moveY = e.touches[0].clientY-startY
          let k = moveY/moveX
          console.log('斜率：'+k)
          console.log('x: '+moveX)
          console.log('y: '+moveY)
          if(moveX>0&&-1<=k&&k<1){
            console.log("right")
            this.keyDown({keyCode:39})
          }else if(moveX<0&&-1<k&&k<=1){
            console.log("left")
            this.keyDown({keyCode:37})
          }else if(moveY>0&&(k>1||k<-1)){
            console.log("down")
            this.keyDown({keyCode:40})
          }else if(moveY<0&&(k>1||k<-1)){
            console.log("up")
            this.keyDown({keyCode:38})
          }
        }
      },false)
    },false)
  }
  componentDidMount() {
    window.addEventListener("keydown",this.keyDown.bind(this),false)
    this.addTouchEvent()
  }
  render() {
    let status = !Board.can_move(this.state) ? " - Game Over!": ""
    return (
      <div className="App">
        <span className="score">
          Score:{ Board.score_board(this.state) } {status}
        </span>
        <Tiles board={this.state}/>
        <button onClick={this.newGame.bind(this)}>new Game</button>
      </div>
    );
  }
}

export default GameBoard;