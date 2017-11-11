<template>
  <div>
    <key-editor>
    </key-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import KeyEditor from './components/KeyEditor.vue'

export default Vue.extend({
  name: 'app',
  components: {
    KeyEditor
  }
})
</script>

<style>
body {
  font-family: -apple-system-body, BlinkMacSystemFont, "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans Japanese", "游ゴシック  Medium", "Yu Gothic Medium", "メイリオ", meiryo, sans-serif;
}
</style>
