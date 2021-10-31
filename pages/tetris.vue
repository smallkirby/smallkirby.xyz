<template>
  <layout-wrapper>
    <layout-header title="tetris" />
    <div>
      <div class="main-window">
        <div id="tetris">
          <pre id="board">{{ board_str }}</pre>
          <div id="tetris-description">
            <p>k: rotate, hl: move, j: down</p>
          </div>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

let board: any;

export default Vue.extend({
  name: 'Tetris',
  data () {
    return {
      titleMsg: '$ bash tetris.sh',
      flagTitleMsg: false,
      board_str: (' '.repeat(10) + '\n').repeat(20),
    };
  },
  mounted () {
    if (process.client) {
      import('~/wasm/tetris/pkg/index').then((tetris) => {
        // init board
        board = tetris.Board.new();

        // set ticks
        const tick_repeater = () => {
          board.tick();
        };
        const render_repeater = () => {
          this.board_str = board.render();
        };
        setInterval(tick_repeater, 500);
        setInterval(render_repeater, 10);

        window.addEventListener('keypress', (e) => {
          board.process_key_input(e.keyCode);
        });
      });
    }
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },
  },
});
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

div#tetris {
  margin: 2em;
  padding: 2em;
  text-align: center;
}

pre#board {
  display: inline-block;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 2em;
  left: 5em;
  border: solid 0.1em;
  line-height: 70%;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
}

</style>
