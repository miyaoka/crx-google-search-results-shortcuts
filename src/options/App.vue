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
    <v-footer app fixed dark>
      <v-container fluid>
        <v-layout row justify-center>
          <v-flex class="text-xs-center">
            <v-btn
              color="blue-grey"
              dark
            >
              Load Defaults
            </v-btn>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn
              color="blue-grey"
              dark
            >
              Reset
            </v-btn>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn
              color="blue-grey"
              dark
            >
              Submit
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
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
