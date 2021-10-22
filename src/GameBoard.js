import React, { Component } from "react";
import "./GameBoard.css";
import Tiles from "./components/Tiles";
import Board from "./helpers/Board";
import WinTips from "./components/WinTips";
import welcomeSVG from "./assets/welcome.svg";
import headerSVG from "./assets/1024.svg";
import { setupShare } from "./helpers/setupShare";
import Activity from "./components/Activity";
import plateSVG from "./assets/plate.svg";
import plateBackground from "./assets/plate-background.png";

class GameBoard extends Component {
  constructor() {
    super();
    this.initial_board = {
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      d1: null,
      d2: null,
      d3: null,
      d4: null,
    };
    this.state = {
      board: this.addTiles(this.addTiles(this.initial_board)),
      disableWinTips: false,
      disableActions: false,
      showActivity: false
    };
  }

  componentDidMount() {
    setupShare();
    this.registerEventListener();
  }

  componentDidUpdate(_, prevState) {
    if (
      !prevState.disableActions &&
      !this.state.disableWinTips &&
      this.isReachedGoal
    ) {
      this.setState((prev) => ({ ...prev, disableActions: true }));
    }
  }

  get isReachedGoal() {
    return Board.is_reached_the_goal(this.state.board, 1024);
  }

  addTiles(board) {
    let location = Board.available_spaces(board)
      .sort(() => 0.5 - Math.random())
      .pop();
    if (location) {
      let two_or_four = Math.floor(Math.random() * 2, 0) ? 2 : 4;
      return Board.set_tile(board, location, Board.new_tile(two_or_four));
    }
    return board;
  }
  newGame() {
    this.setState((prev) => ({
      ...prev,
      disableWinTips: false,
      board: this.addTiles(this.addTiles(this.initial_board)),
    }));
  }
  setBoard(new_board) {
    if (!Board.same_board(this.state.board, new_board)) {
      this.setState((prev) => ({ ...prev, board: new_board }));
      return true;
    }
    return false;
  }

  keyDown(e) {
    if (this.state.disableActions || this.state.showActivity) return;
    let directions = {
      37: Board.left,
      38: Board.up,
      39: Board.right,
      40: Board.down,
    };
    if (
      directions[e.keyCode] &&
      this.setBoard(
        Board.fold_board(this.state.board, directions[e.keyCode])
      ) &&
      Math.floor(Math.random() * 30, 0) > 0
    ) {
      setTimeout(() => {
        this.setBoard(this.addTiles(this.state.board));
      }, 100);
    }
  }

  registerEventListener() {
    window.addEventListener(
      "touchstart",
      (e) => {
        let startX = e.touches[0].clientX;
        let startY = e.touches[0].clientY;
        let lock = true;
        window.addEventListener(
          "touchmove",
          (e) => {
            e.preventDefault();
            if (
              (Math.abs(e.touches[0].clientX - startX) > 20 ||
                Math.abs(e.touches[0].clientY - startY) > 20) &&
              lock
            ) {
              lock = false;
              let moveX = e.touches[0].clientX - startX;
              let moveY = e.touches[0].clientY - startY;
              let k = moveY / moveX;
              if (moveX > 0 && -1 <= k && k < 1) {
                this.keyDown({ keyCode: 39 });
              } else if (moveX < 0 && -1 < k && k <= 1) {
                this.keyDown({ keyCode: 37 });
              } else if (moveY > 0 && (k > 1 || k < -1)) {
                this.keyDown({ keyCode: 40 });
              } else if (moveY < 0 && (k > 1 || k < -1)) {
                this.keyDown({ keyCode: 38 });
              }
            }
          },
          false
        );
      },
      false
    );
    window.addEventListener("keydown", this.keyDown.bind(this), false);
  }

  onContinueClick() {
    this.setState((prev) => ({
      ...prev,
      disableWinTips: true,
      disableActions: false,
    }));
  }

  toggleActivity() {
    this.setState(prev => ({
      ...prev,
      showActivity: !prev.showActivity
    }))
  }

  render() {
    return (
      <div className="wrapper">
        <div className="game-board-wrapper">
          <img src={welcomeSVG} className="welcome-image" alt="欢迎你" />
          <div className="header">
            <img src={headerSVG} className="header-image" alt="一起来玩吧" />
            <div className="actions">

              <div
                onClick={this.toggleActivity.bind(this)}
                className="activity-cursor clickable"
              >
                
                <div className="plate-wrapper">
                  <img src={plateSVG} className="plate"/>
                  <img src={plateBackground} className="background"/>
                </div>
                <span className="text-stroke mini award">奖品与规则</span>
              </div>
              
              <span className="score clickable">
                <span className="prefix">Score:</span>
                <span className="content">
                  {Board.score_board(this.state.board)}
                </span>
              </span>
              <span
                onClick={this.newGame.bind(this)}
                className="new-game clickable"
              >
                New Game
              </span>
            </div>
          </div>
          <Tiles
            board={this.state.board}
            gameOver={!Board.can_move(this.state.board)}
          />
        </div>
        <WinTips
          reachedGoal={this.isReachedGoal}
          disableWinTips={this.state.disableWinTips}
          onContinueClick={this.onContinueClick.bind(this)}
        />
        <Activity visible={this.state.showActivity} onCloseActivity={this.toggleActivity.bind(this)} />
      </div>
    );
  }
}

export default GameBoard;
