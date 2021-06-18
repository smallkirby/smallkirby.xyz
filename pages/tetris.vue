<template>
  <layout-wrapper>
    <layout-header title="tetris" />
    <div>
      <div class="main-window">
        <div id="tetris">
          <pre id="board">{{board_str}}</pre>
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue'

let board: any

export default Vue.extend({
  name: 'Tetris',
  data () {
    return {
      titleMsg: '$ bash tetris.sh',
      flagTitleMsg: false,
      board_str: (' '.repeat(10) + '\n').repeat(20),
    }
  },
  mounted () {
    if (process.client) {
      import('~/wasm/tetris/pkg/index').then((tetris) => {
        // init board
        board = tetris.Board.new()

        // set ticks
        const repeater = () => {
          this.board_str = board.render()
          board.tick()
        }
        setInterval(repeater, 500)

        window.addEventListener('keypress', (e) => {
          board.process_key_input(e.keyCode)
        })
      })
    }
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true
    },
  },
})
</script>

<style>
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}

div#tetris {
  margin: 30em;
  padding: 30em;
  text-align: center;
}

pre#board {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 5em;
  left: 5em;
  border: solid 0.1em;
  position: absolute;
  line-height: 70%;
}

</style>
