<template>
  <layout-wrapper>
    <layout-header title="likes" />
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
        <div v-for="(l, index) in mylikes" :key="index">
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

interface Like {
  title: string;
  ents: Ent[];
}

const likes: Like[] = [
  {
    title: "Keyboards",
    ents: [
      {
        name: "Happy Hacking Keyboard",
        description: "Hybrid Type-S Black",
        link: "https://www.pfu.fujitsu.com/direct/hhkb/detail_pd-kb800bns.html"
      },
      {
        name: "Corne Cherry v3",
        link: "https://shop.yushakobo.jp/products/corne-cherry-v3"
      }
    ]
  },
  {
    title: "Game",
    ents: [
      {
        name: "Super Smash Brothers",
        link: "https://www.smashbros.com/en_US/index.html",
        description:
          "DX(GC,2001), X(Wii,2008), Special(Switch,2018). [Kirby,Kamui,Mewtwo,Lucario]"
      },
      {
        name: "Doshin the Giant",
        link: "https://www.nintendo.co.jp/ngc/gkdj/",
        description: "GC,2002"
      },
      {
        name: "GiFTPiA",
        link: "https://www.nintendo.co.jp/ngc/ggfj/index.html",
        description: "GC,2003"
      },
      {
        name: "Civilization 6",
        link: "https://civilization.com/ja-JP/",
        description: "switch,2018. [Australia]"
      },
      {
        name: "Mario Kart ~ Double Dash!!",
        description: "GC,2003"
      },
      {
        name: "Kirby Air Ride",
        description: "GC,2003"
      },
      {
        name: "Monster Hunter",
        description:
          "P2G(PSP,2008), P3(PSP,2010), 3(Wii,2009), World(PS4,2018), Rise(switch,2021)"
      },
      {
        name: "Persona 5",
        description: "PS4,2016",
        link: "https://www.atlus.co.jp/series/persona/"
      },
      {
        name: "The Legend of Zelda: Breath of the Wild",
        description: "switch,2017",
        link: "https://www.nintendo.co.jp/zelda/index.html"
      },
      {
        name: "Super Robot Wars L",
        description: "DS,2010"
      },
      {
        name: "Paper Mario RPG (The Thousand-Year Door)",
        link: "https://www.nintendo.co.jp/ngc/g8mj/index.html",
        description: "GC,2004"
      },
      {
        name: "Virtua Fighter",
        description: "SS,1993"
      },
      {
        name: "Pokémon Gold and Silver",
        description: "GB,1999"
      },
      {
        name: "Taiko no Tatsujin: Drum 'n' Fun!",
        description: "switch,2018",
        link: "https://switch.taiko-ch.net/"
      }
    ]
  },
  {
    title: "Editor",
    ents: [
      {
        name: "vim",
        link: "https://www.vim.org/"
      },
      {
        name: "vscode",
        link: "https://code.visualstudio.com/"
      },
      {
        name: "gedit",
        link: "https://wiki.gnome.org/Apps/Gedit"
      },
      {
        name: "Scrapbox",
        link: "https://scrapbox.io/"
      },
      {
        name: "HackMD",
        link: "https://hackmd.io"
      }
    ]
  },
  {
    title: "Terminal/Emulator/MUX",
    ents: [
      {
        name: "Bash",
        link: "https://www.gnu.org/software/bash/"
      },
      {
        name: "Gnome Terminal",
        link: "https://help.gnome.org/users/gnome-terminal/stable/"
      },
      {
        name: "tmux",
        link: "https://github.com/tmux/tmux/wiki"
      }
    ]
  },
  {
    title: "Color Themes",
    ents: [
      {
        name: "gruvbox",
        link: "https://www.gnu.org/software/bash/"
      }
    ]
  },
  {
    title: "OS",
    ents: [
      {
        name: "Ubuntu",
        link: "https://ubuntu.com/"
      }
    ]
  },
  {
    title: "Animals",
    ents: [
      {
        name: "Dog",
        description: "shiba, Japanese Spitz, Siberian Husky"
      },
      {
        name: "Fox"
      }
    ]
  },
  {
    title: "Books",
    ents: [
      {
        name: "ノルウェイの森 (Norweigian Wood)",
        description: "村上春樹,2004,講談社"
      },
      {
        name: "羊をめぐる冒険 (A Wild Sheep Chase)",
        description: "村上春樹,2004,講談社"
      },
      {
        name:
          "世界の終りとハードボイルド・ワンダーランド (Hard-Boiled Wonderland and the End of the World)",
        description: "村上春樹,2010,講談社"
      },
      {
        name: "The catcher in the rye",
        description: "J.D.Salinger,1997,講談社インターナショナル"
      },
      {
        name: "30日でできる! OS自作入門",
        description: "川合秀実,2006,マイナビ出版"
      },
      {
        name: "生の短さについて",
        description: "セネカ,2010,岩波書店"
      },
      {
        name: "結界師",
        description: "田辺イエロウ,小学館,2003-2011"
      },
      {
        name: "OnePiece",
        description: "尾田栄一郎,集英社,1997-"
      },
      {
        name: "ひとにぎりの未来",
        description: "星新一,新潮社,1980"
      }
    ]
  },
  {
    title: "Food",
    ents: [
      {
        name: "Big katsu",
        link:
          "https://ja.wikipedia.org/wiki/%E3%83%93%E3%83%83%E3%82%B0%E3%82%AB%E3%83%84"
      },
      {
        name: "Kabayaki san",
        link:
          "https://ja.wikipedia.org/wiki/%E8%92%B2%E7%84%BC%E3%81%95%E3%82%93%E5%A4%AA%E9%83%8E"
      },
      {
        name: "Oshaburi Kombu"
      },
      {
        name: "Gâteau au chocolat"
      },
      {
        name: "Mille crêpes"
      },
      {
        name: "sushi",
        description: "穴子"
      },
      {
        name: "南部せんべい",
        description: "巖手屋(岩手)",
        link: "https://www.iwateya.co.jp/"
      },
      {
        name: "萩の調",
        description: "菓匠三全(仙台)",
        link: "https://www.sanzen.co.jp/haginoshirabe/"
      },
      {
        name: "Sata andagi",
        description: "沖縄"
      }
    ]
  },
  {
    title: "Beverage",
    ents: [
      {
        name: "Monster Energy",
        description: "Asahi"
      },
      {
        name: "午後の紅茶ロイヤルミルクティ",
        description: "Kirin"
      },
      {
        name: "Kuro Label",
        description: "SapporoBeer"
      },
      {
        name: "南部武人",
        description: "株式会社南部美人",
        link: "https://www.nanbubijin.co.jp/"
      },
      {
        name: "獺祭",
        description: "旭酒造"
      },
      {
        name: "RedBull",
        description: "Kirin",
        link: "https://www.redbull.com/jp-ja/"
      },
    ]
  },
  {
    title: "Anime",
    ents: [
      {
        name: "甲鉄城のカバネリ (Kabaneri of the Iron Fortress)",
        link: "https://kabaneri.com/",
        description: "Animation, Film(海門決戦,2019)"
      }
    ]
  },
  {
    title: "Music",
    ents: [
      {
        name: "Nirugiri",
        link: "https://youtu.be/yvUvamhYPHw",
        description: "covered by KudouChitose,2019"
      },
      {
        name: "雲の遥か",
        link: "https://youtu.be/suri4Y9XgPY",
        description: "熊谷育美,2011"
      },
      {
        name: "nirugiri.smallkirby.xyz",
        link: "https://nirugiri.smallkirby.xyz"
      }
    ]
  },
  {
    title: "Youtube",
    ents: [
      {
        name: "マリマリマリー",
        link: "https://www.youtube.com/channel/UCOnA15zQ7OafLsnN8J-CMvg"
      },
      {
        name: "はじめまして松尾です",
        link:
          "https://www.youtube.com/c/%E3%81%AF%E3%81%98%E3%82%81%E3%81%BE%E3%81%97%E3%81%A6%E6%9D%BE%E5%B0%BE%E3%81%A7%E3%81%99hajimemashite"
      },
      {
        name: "美術2の人",
        link: "https://www.youtube.com/channel/UCt6xxd2go9WccbL5bkLVriA"
      },
      {
        name: "ももと天空",
        link: "https://www.youtube.com/c/MomoTen"
      }
    ]
  }
];

export default Vue.extend({
  name: "About",
  data() {
    return {
      titleMsg:
        "$ find /home/smallkirby/likes/ -type f | xargs grep like | grep -v lazy",
      mylikes: likes,
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
