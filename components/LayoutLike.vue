<template>
  <layout-wraper>
    <div class="mx-2 md:mx-4 mb-2">
      <div>
        <p class="font-bold text-xl mt-2">
          {{ like.title }}
        </p>
      </div>
      <div v-for="(ent, index) in like.ents" :key="index" class="ml-1 md:ml-3 flex">
        <ul class="flex flex-col md:flex-row">
          <li>
            <p>
              - <a :href="ent.link">{{ ent.name }}</a>
            </p>
          </li>
          <li>
            <p v-if="ent.description" class="md:block hidden">
              : {{ ent.description }}
            </p>
            <p v-if="ent.description" class="md:hidden ml-8">
              {{ ent.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </layout-wraper>
</template>

<script lang="ts">
import Vue from 'vue';

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
  name: 'LayoutLike',
  props: {
    like: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {};
  },
  methods: {},
});
</script>

<style></style>
