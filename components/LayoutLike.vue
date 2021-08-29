<template>
  <layout-wraper>
    <div class="mx-2 md:mx-4 mb-2">
      <div>
        <p class="font-bold text-xl mt-2">{{ like.title }}</p>
      </div>
      <div class="ml-1 md:ml-3 flex" v-for="(ent, index) in like.ents" :key="index">
        <ul class="flex flex-col md:flex-row">
          <li>
            <p>
              - <a :href="ent.link">{{ ent.name }}</a>
            </p>
          </li>
          <li>
            <p class="md:block hidden" v-if="ent.description">: {{ ent.description }}</p>
            <p class="md:hidden ml-8" v-if="ent.description"> {{ ent.description }}</p>
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
