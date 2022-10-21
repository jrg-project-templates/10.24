/**
 * Created by zhangxinwang.
 */
import React from "react";
import Board from "../helpers/Board";
import GameOver from './GameOver'

const tileSubTipMap = {
  2: '小白',
  4: 'HTML',
  8: 'CSS',
  16: 'JS',
  32: 'TS',
  64: 'Vue',
  128: 'React',
  256: '项目',
  512: '简历',
  1024: '求职成功',
  2048: '出任CEO',
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
