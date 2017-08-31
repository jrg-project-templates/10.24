/**
 * Created by zhangxinwang on 30/08/2017.
 */
import React, { Component } from 'react';
import Board from './Board'

class Tiles extends Component {
  render(){
    let board = this.props.board
    let tiles = Board.used_spaces(board).sort((a,b) => board[a].id - board[b].id)
    return (
      <div className="board">
        {tiles.map(key => {
          let tile = board[key]
          let val = Board.tile_value(tile);
          return (
            <span key={tile.id} className={key+" value"+val}>
              {val}
            </span>
          )
        })}
      </div>
    )
  }
}

export default Tiles