<template>
  <layout-wraper>
    <div class="mx-4 mb-2">
      <div>
        <p class="font-bold text-xl mt-2">{{ like.title }}</p>
      </div>
      <div class="ml-3 flex" v-for="(ent, index) in like.ents" :key="index">
        <ul class="flex">
          <li>
            <p>
              - <a :href="ent.link">{{ ent.name }}</a>
            </p>
          </li>
          <li>
            <p v-if="ent.description">: {{ ent.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </layout-wraper>
</template>

<script lang="ts">
import Vue from "vue";

interface Ent {
  name: string;
  link: string | null;
  description: string | null;
}

interface Like {
  title: string;
  ents: Ent[];
}

export default Vue.extend({
  name: "LayoutLike",
  props: {
    like: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
});
</script>

<style></style>
