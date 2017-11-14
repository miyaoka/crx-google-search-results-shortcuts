<template>
  <v-app>
    <main>
      <v-content>
        <v-container fluid>
          <h4>Configure hotkeys</h4>
          <key-editor>
          </key-editor>
        </v-container>
      </v-content>
    </main>
  </v-app>
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
</style>
