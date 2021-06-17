#![cfg(target_arch = "wasm32")]

/** test  **/
/** wasm-pack test --firefox --headless **/
extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

extern crate tetris;
use tetris::{log, Board};

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_just_tick() {
  let mut board = Board::new();
  board.tick();
  board.tick();
  board.tick();
  board.tick();
  board.tick();
}
