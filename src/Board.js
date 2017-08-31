/**
 * Created by zhangxinwang on 30/08/2017.
 */

let tile_counter = 0

class Board {
  constructor(){
    this.left = this.fold_order(["a","b","c","d"], ["1","2","3","4"], false)
    this.right = this.fold_order(["a","b","c","d"], ["4","3","2","1"], false)
    this.up = this.fold_order(["1","2","3","4"], ["a","b","c","d"], true)
    this.down = this.fold_order( ["1","2","3","4"], ["d","c","b","a"], true)
  }
  available_spaces(board){
    return Object.keys(board).filter(key => board[key] == null)
  }
  used_spaces(board){
    return Object.keys(board).filter(key => board[key] !== null)
  }
  set_tile(board,position,tile){
    let new_board = {}
    Object.keys(board).forEach((key, i) =>{
      new_board[key] = (key === position) ? tile : board[key];
    });
    return new_board;
  }
  new_tile(initial){
    return {
      id: tile_counter++,
      values: [initial]
    };
  }
  tile_value(tile){
    return tile ? tile.values[tile.values.length-1] : null;
  }
  fold_order(xs, ys, reverse_keys){
    return xs.map(x => {
      return ys.map(y => {
        let key = [x,y];
        if(reverse_keys){
          return key.reverse().join("");
        }
        return key.join("");
      });
    });
  }
  fold_line(board, line){
    let tiles = line.map(key => board[key]).filter(tile => tile !== null);
    let new_tiles = [];
    if(tiles){
      for(let i=0; i < tiles.length; i++){
        let tile = tiles[i];
        if(tile){
          let val = this.tile_value(tile);
          let next_tile = tiles[i+1];
          if(next_tile && val === this.tile_value(next_tile)){
            i++;
            new_tiles.push({
              id: next_tile.id, //keep id
              values: tile.values.concat([val * 2])
            });
          }
          else{
            new_tiles.push(tile);
          }
        }
      }
    }
    let new_line = {};
    line.forEach(function(key, i){
      new_line[key] = new_tiles[i] || null;
    });
    return new_line;
  }
  fold_board(board, lines){
    let new_board = board;
    lines.forEach(line => {
      let new_line = this.fold_line(board, line);
      Object.keys(new_line).forEach(key =>{
        new_board = this.set_tile(new_board, key, new_line[key]);
      });
    });
    return new_board;
  }
  can_move(board){
    let new_board = [this.up,this.down,this.left,this.right].reduce((b, direction) => this.fold_board(b, direction), board);
    return this.available_spaces(new_board).length > 0
  }
  same_board(board1, board2){
    return Object.keys(board1).reduce((ret, key)=>{
      return ret && board1[key] === board2[key];
    }, true);
  }
  score_board(board){
    return this.used_spaces(board).map(key =>{
      return (board[key].values.reduce((a, b) => a + b) - board[key].values[0])
    }).reduce((a,b) => a+b, 0);
  }
}

export default new Board()