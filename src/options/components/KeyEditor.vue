<template>
  <ul>
    <li v-for="(cmd, index) in keyList" :key="index">
      {{cmd.name}}
      <ul>
        <li v-for="(keyInput, index) in cmd.keyInputs" :key="index">
          <key-input
            :value="keyInput"
            @input="value => cmd.keyInputs[index] = value"
          >
          </key-input>
          <button>
            x
          </button>
        </li>
        <li>
          <button>
            Add
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import KeyInput from './KeyInput.vue'

export default Vue.extend({
  name: 'KeyEditor',
  components: {
    KeyInput
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'keyList'
    ])
  }

})
</script>

<style>
</style>
