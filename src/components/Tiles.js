/**
 * Created by zhangxinwang.
 */
import React, { Component } from "react";
import Board from "../helpers/Board";

class Tiles extends Component {
  render() {
    let board = this.props.board;
    let tiles = Board.used_spaces(board).sort(
      (a, b) => board[a].id - board[b].id
    );
    return (
      <div className="board">
        {tiles.map((key) => {
          let tile = board[key];
          let val = Board.tile_value(tile);
          return (
            <span key={tile.id} className={key + " value" + val}>
              {val}
            </span>
          );
        })}
        {this.props.gameOver ? (
          <div className="game-over">Game Over</div>
        ) : null}
      </div>
    );
  }
}

export default Tiles;
