<template>
  <layout-wrapper>
    <layout-header title="pronountiation" />
    <div>
      <div class="main-window">
        <layout-print-char-by
          :reqmsg="titleMsg"
          :interval="50"
          :finwait="50"
          @finish-print-char-by="finTitleMsg"
        />
      </div>
      <div>
        <div v-for="(v, index) in myvocabs" :key="index">
          <layout-pronountiation :vocab="v" />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

interface Ent {
  name: string;
  pronountiation: string;
  description?: string | null;
  link?: string | null;
  strict: boolean;
}

interface Pronountiation {
  genre: string;
  ents: Ent[];
}

const vocabs: Pronountiation[] = [
  {
    genre: 'Softwares / Services',
    ents: [
      {
        name: 'axios',
        pronountiation: 'ache-cious',
        link: 'https://github.com/axios/axios',
        strict: false,
      },
      {
        name: 'ngrok',
        pronountiation: 'engine-R-OK',
        link: 'https://ngrok.com/',
        strict: false,
      },
      {
        name: 'QEMU',
        pronountiation: 'QM',
        link: 'https://www.qemu.org/',
        strict: false,
      },
      {
        name: 'Azure',
        pronountiation: 'ʌzule',
        link: 'https://azure.microsoft.com/en-us/',
        strict: true,
      },
    ],
  },
  {
    genre: 'Functions / Libraries',
    ents: [
      {
        name: 'stdio.h',
        pronountiation: 'standard-IO',
        strict: false,
      },
      {
        name: 'strcpy',
        pronountiation: 'star-copy',
        strict: false,
      },
      {
        name: 'strncpy',
        pronountiation: 'star-N-copy',
        strict: false,
      },
    ],
  },
  {
    genre: 'Others',
    ents: [
      {
        name: 'pwn',
        pronountiation: 'pæun',
        link: 'https://ptr-yudai.hatenablog.com/',
        strict: true,
      },
    ],
  },
];

export default Vue.extend({
  name: 'Pronountiation',
  data () {
    return {
      titleMsg:
        '$ diff /home/user/smallkirby/vocabulary /var/www/worlds/vocabulary | uniq',
      myvocabs: vocabs,
      flagTitleMsg: false,
    };
  },
  methods: {
    finTitleMsg (): void {
      this.flagTitleMsg = true;
    },
  },
});
</script>

<style>
div.main-window {
  padding-top: 1.2em;
  padding-left: 0.3em;
}
div.center-normal {
  text-align: center;
}

img#kirby-pict {
  margin: 0 auto;
}
</style>
