<template>
  <input
    @keydown="onKeyDown"
    :value="keyLabel"
    readonly
  >
</template>

<script lang="ts">
import Vue from 'vue'

const metaKeys = ['Alt', 'Control', 'Meta', 'Shift']

export default Vue.extend({
  name: 'KeyInput',
  props: {
    value: {
      type: Object,
      default: function () {
        return {key: 'a', shiftKey: true}
      }
    }
  },
  data () {
    return {
      pressedKey: new KeyboardEvent('keydown', this.value)
    }
  },
  methods: {
    onKeyDown (e:KeyboardEvent): void {
      if (e.repeat) return
      if (metaKeys.includes(e.key)) return
      this.pressedKey = e
      this.$emit('input', this.keyProps)
    }
  },
  computed: {
    keyLabel (): string {
      const {ctrlKey, metaKey, altKey, shiftKey, key, code} = this.pressedKey
      return [
        ctrlKey ? 'CTRL' : null,
        metaKey ? 'META' : null,
        altKey ? 'ALT' : null,
        shiftKey ? 'SHIFT' : null,
        key.match(/^[\x21-\x7F]$/) ? key.toUpperCase() : code.replace(/^(Key|Digit)/, '')
      ].filter(v => v)
      .join(' + ')
    },
    keyProps (): Object {
      const {ctrlKey, metaKey, altKey, shiftKey, key, code} = this.pressedKey
      return {
        ctrlKey,
        metaKey,
        altKey,
        shiftKey,
        key,
        code
      }
    }
  }
})
</script>

<style>
</style>
