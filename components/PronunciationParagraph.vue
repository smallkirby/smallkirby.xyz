<template>
  <layout-wrapper>
    <div class="mx-2 md:mx-4 mb-2">
      <div>
        <p class="font-bold text-xl mt-2">
          {{ vocab.genre }}
        </p>
      </div>
      <div v-for="(ent, index) in vocab.ents" :key="index" class="ml-1 md:ml-3 flex">
        <ul class="flex flex-col md:flex-row">
          <li>
            <p>
              - <a :href="ent.link">{{ ent.name }}</a>
              : [
              <span v-if="ent.strict" class="italic mx-0 px-0">
                {{ ent.pronountiation }}
              </span>
              <span v-if="!ent.strict" class="mx-0 px-0">
                {{ ent.pronountiation }}
              </span>
              ]
            </p>
          </li>
          <li>
            <p v-if="ent.description" class="md:block hidden ml-2 text-skwhite-dark">
              : {{ ent.description }}
            </p>
            <p v-if="ent.description" class="md:hidden ml-8">
              {{ ent.description }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </layout-wrapper>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LayoutPronountiation',
  props: {
    vocab: {
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
