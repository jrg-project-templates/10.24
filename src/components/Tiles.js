/**
 * Created by zhangxinwang.
 */
import React from "react";
import Board from "../helpers/Board";
import GameOver from './GameOver'

const tileSubTipMap = {
  2: '切图',
  4: '测试',
  8: '前端',
  16: 'Python',
  32: 'Java',
  64: 'Go',
  128: 'C++',
  256: '算法',
  512: '全栈',
  1024: '人生巅峰',
  2048: 'CTO',
  4096: '董事长',
  8092: '福布斯',
  16384: 'Superman'
}

const Tiles = (props) => {
  let board = props.board;
  let tiles = Board.used_spaces(board).sort(
    (a, b) => board[a].id - board[b].id
  );

  return (
    <div className="board">
      {tiles.map((key) => {
        let tile = board[key];
        let val = Board.tile_value(tile);
        return (
          <span key={tile.id} className={`tile ${key + " value" + val}`} data-tile-name={tileSubTipMap[val]}>
            {val}
          </span>
        );
      })}
      <GameOver {...props}/>
    </div>
  );
}

export default Tiles;
