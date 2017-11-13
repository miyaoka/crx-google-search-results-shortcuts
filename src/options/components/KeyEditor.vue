<template>
  <v-container fluid>
    <v-layout
      row
      v-for="(cmd, cmdIndex) in keyEditList"
      :key="cmdIndex"
    >
      <v-flex xs4>
        <v-subheader>{{cmd.name}}</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-layout column>
          <v-flex
            d-flex
            v-for="(keyInput, keyIndex) in cmd.keyInputs"
            :key="keyIndex"
          >
            <key-input
              :value="keyInput | kb"
              @input="value => cmd.keyInputs[keyIndex] = value"
            ></key-input>
            <v-btn
              flat icon color="error"
              @click.native="removeInput(cmdIndex, keyIndex)"
            >
              <v-icon>remove_circle</v-icon>
            </v-btn>
          </v-flex>
          <v-flex
          >
            <v-btn
              flat icon color="green"
              @click.native="addInput(cmdIndex)"
              :disabled="!isAddable(cmdIndex)"
            >
              <v-icon>add_circle_outline</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn
      color="blue-grey"
      dark
    >
      Reset to Defaults
    </v-btn>
    <v-btn
      color="blue-grey"
      dark
    >
      Clear
    </v-btn>
    <v-btn
      color="blue-grey"
      dark
    >
      Submit
    </v-btn>

  </v-container>
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
  data: function () {
    return {
      keyEditList: JSON.parse(JSON.stringify(this.$store.getters.keyList))
    }
  },
  computed: {
    ...mapState([
      'keyList'
    ])
  },
  methods: {
    isAddable (commandIndex:number):boolean {
      const keys = this.keyEditList[commandIndex].keyInputs
      console.log(keys[keys.length - 1])
      return keys[keys.length - 1].code
    },
    addInput (commandIndex:number):void {
      this.keyEditList[commandIndex].keyInputs.push({})
    },
    removeInput (commandIndex:number, keyIndex:number):void {
      this.keyEditList[commandIndex].keyInputs.splice(keyIndex, 1)
    }
  },
  filters: {
    kb (val):KeyboardEvent {
      return new KeyboardEvent('keydown', val)
    }
  }
})
</script>

<style>
</style>
