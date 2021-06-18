extern crate wasm_bindgen;

use rand::Rng;
use std::fmt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
  Filled = 0,
  Empty = 1,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Angle {
  North,
  East,
  South,
  West,
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Shape {
  I,
  O,
  S,
  Z,
  J,
  L,
  T,
}

impl Shape {
  fn size() -> u32 {
    7
  }
  fn random() -> Self {
    let mut rng = rand::thread_rng();
    match rng.gen_range(0..=Shape::size()) {
      0 => Shape::I,
      1 => Shape::O,
      2 => Shape::S,
      3 => Shape::Z,
      4 => Shape::J,
      5 => Shape::L,
      6 => Shape::T,
      _ => Shape::I,
    }
  }
}

#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Peace {
  shape: Shape,
  position: (u32, i32),
  angle: Angle,
}

impl Peace {
  fn new(width: u32) -> Self {
    use Shape::*;
    let center = width / 2;
    let shape = Shape::random();
    let position = match shape {
      I => (center - 2, -1),
      O => (center - 1, -2),
      S => (center - 1, -2),
      Z => (center - 1, -2),
      J => (center - 1, -2),
      L => (center - 1, -2),
      T => (center - 1, -2),
    };

    Self {
      shape,
      position,
      angle: Angle::North,
    }
  }

  fn to_position(&self) -> Vec<(u32, i32)> {
    match self.shape {
      Shape::I => vec![(0, 0), (1, 0), (2, 0), (3, 0)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
      Shape::O => vec![(0, 0), (0, 1), (1, 0), (1, 1)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
      Shape::S => vec![(1, 0), (2, 0), (0, 1), (1, 1)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
      Shape::Z => vec![(0, 0), (1, 0), (1, 1), (2, 1)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
      Shape::J => vec![(0, 0), (0, 1), (1, 1), (2, 1)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
      Shape::L => vec![(2, 0), (0, 1), (1, 1), (2, 1)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
      Shape::T => vec![(1, 0), (0, 1), (1, 1), (2, 1)]
        .iter()
        .map(|p| (p.0 + self.position.0, p.1 + self.position.1))
        .collect::<Vec<_>>(),
    }
  }

  fn move_delta(&mut self, x: i32, y: i32) {
    self.position.0 = (self.position.0 as i32 + x) as u32;
    self.position.1 = self.position.1 + y
  }
}

#[wasm_bindgen]
pub struct Board {
  width: u32,
  height: u32,
  cells: Vec<Cell>,
  gameover: bool,
  current: Peace,
  nexts: Vec<Peace>,
}

impl fmt::Display for Board {
  fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
    for row in self.cells.as_slice().chunks(self.width as usize) {
      for &cell in row {
        let symbol = match cell {
          Cell::Empty => ' ',
          Cell::Filled => '■',
        };
        write!(f, "{}", symbol)?;
      }
      write!(f, "\n")?;
    }
    Ok(())
  }
}

#[wasm_bindgen]
impl Board {
  pub fn new() -> Self {
    let width = 10;
    let height = 20;
    let cells = vec![Cell::Empty; width * height];
    let peace = Peace::new(width as u32);
    let nexts = (0..=2)
      .map(|_| Peace::new(width as u32))
      .collect::<Vec<_>>();

    Self {
      width: width as u32,
      height: height as u32,
      cells,
      gameover: false,
      current: peace,
      nexts,
    }
  }

  pub fn render(&self) -> String {
    self.to_string()
  }

  fn check_movable(&self, (x, y): (i32, i32)) -> bool {
    let current_position = self.current.to_position();
    let next_position = current_position
      .iter()
      .map(|(px, py)| (*px as i32 + x, *py + y))
      .collect::<Vec<_>>();
    if next_position.iter().any(|p| {
      let p = *p;
      if p.0 < 0 || self.width as i32 <= p.0 || self.height as i32 <= p.1 {
        true
      } else if p.1 < 0
        || current_position
          .iter()
          .any(|(_x, _y)| *_x as i32 == p.0 && *_y == p.1)
      {
        false
      } else {
        let index = self.get_index(p.0 as u32, p.1 as u32);
        if self.cells[index] == Cell::Filled {
          true
        } else {
          false
        }
      }
    }) {
      false
    } else {
      true
    }
  }

  fn delete_current(&mut self) {}

  fn move_current(&mut self, (x, y): (i32, i32)) {
    if !self.check_movable((x, y)) {
      return;
    }
    // erase current
    let current_positions = self.current.to_position();
    for (x, y) in current_positions {
      if 0 <= x && x < self.width && 0 <= y && y < self.height as i32 {
        let ix = self.get_index(x, y as u32);
        self.cells[ix] = Cell::Empty;
      }
    }
    // redraw current
    self.current.move_delta(x, y);
    let current_positions = self.current.to_position();
    for (x, y) in current_positions {
      if 0 <= x && x < self.width && 0 <= y && y < self.height as i32 {
        let ix = self.get_index(x, y as u32);
        self.cells[ix] = Cell::Filled;
      }
    }
  }

  pub fn tick(&mut self) {
    if !self.gameover {
      if self.check_movable((0, 1)) {
        self.move_current((0, 1));
      } else {
        log("turn end");
        self.process_turn_end();
      }
    }
  }
}

impl Board {
  fn process_turn_end(&mut self) {
    // delete lines
    // XXX

    // get next peace
    self.current = self.nexts[0];
    self.nexts.remove(0);
    self.nexts.push(Peace::new(self.width));
  }

  fn get_index(&self, col: u32, row: u32) -> usize {
    (row * self.width + col) as usize
  }

  fn delete_row(&mut self, row: u32) {}

  fn get_deleting_rows(&self) -> Vec<usize> {
    let mut res = vec![];
    for row in 0..self.height {
      res.push(row as usize);
    }
    res
  }
  fn is_deleting(&self, row: u32) -> bool {
    for col in 0..self.width {
      match self.cells[(row * self.width + col) as usize] {
        Cell::Filled => continue,
        Cell::Empty => return false,
      }
    }
    true
  }
}

#[wasm_bindgen]
extern "C" {
  pub fn alert(s: &str);
}

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  pub fn log(s: &str);
}
