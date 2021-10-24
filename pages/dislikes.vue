<template>
  <layout-wrapper>
    <layout-header title="dislikes" />
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
        <div v-for="(l, index) in dislikes" :key="index">
          <layout-like :like="l" />
        </div>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from "vue"

interface Ent {
  name: string;
  link?: string;
  description?: string | null;
}

interface Dislike {
  title: string;
  ents: Ent[];
}

const dislikes: Dislike[] = [
  {
    title: "Dislikes : I will refuse",
    ents: [
      {
        name: "meeting",
        description: "long, boring, non-interactive, virtually no importance",
      },
      {
        name: "train",
        description: "crowded train in Tokyo. I prefer to walking.",
      },
      {
        name: "keyboard of MacBook",
      },
      {
        name: "Haskell",
      },
      {
        name: "TeX",
        description: "I don't know what you mean.",
      },
      {
        name: "thick book",
      },
      {
        name: "YouTube Short",
        description: "YouTube MUST NOT BE TIKTOK.",
      },
      {
        name: "hot and humid climate",
        description: "wanna live in the north.",
      },
      {
        name: "grilled apple / apple pie",
        description: "shouldn't grill any fruits",
      },
      {
        name: "any criticism toward individual",
      },
      {
        name: "the drunken",
      },
      {
        name: "insect",
      },
    ],
  },

  {
    title: "Not Good At : welcome but I can't",
    ents: [
      {
        name: "make a med/long-term plan",
        description: "I don't have any policy and goal for my life, and am not good at making plan and achiving them one by one",
      },
      {
        name: "electronics and electric circuit",
        description: "since elementary school, though I major in it now",
      },
      {
        name: "live a well-regulated life",
      },
      {
        name: "mathematics",
      },
    ],
  },

  {
    title: "Not Interested In : I won't talk about",
    ents: [
      {
        name: "religion",
        description: "I don't deny any, but I don't believe in any.",
      },
      {
        name: "politics",
      },
      {
        name: "wording, manners",
        description: "ofcource I feel bad to the bad, but I won't say any to them",
      },
      {
        name: "fashion",
      },
    ],
  },
];

export default Vue.extend({
  name: "Dislikes",
  data() {
    return {
      titleMsg:
        "$ getsebool -a | grep $SMALLKIRBY | pretty ",
      dislikes: dislikes,
      flagTitleMsg: false
    };
  },
  methods: {
    finTitleMsg(): void {
      this.flagTitleMsg = true;
    },
    finMyLikes(): void {}
  }
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
