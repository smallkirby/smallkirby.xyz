<template>
  <div>
    <layout-header title="Trash" />
    <div class="w-full h-full flex flex-row">
      <div id="tmux-pane" class="border-r-1 border-white ">
        <tmux />
      </div>
      <div id="body-wrapper">
        <router-view />
      </div>
      <layout-footer />
    </div>
  </div>
</template>

<style lang='scss'>
@import '~/static/css/default.scss';
</style>
