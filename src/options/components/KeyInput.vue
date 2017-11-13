<template>
  <v-text-field
    readonly
    single-line
    @keydown="onKeyDown"
    :value="pressedKey | keyLabel"
    :prefix="isChanged ? '*' : ''"
    :append-icon="isChanged ? 'backspace' : ''"
    :append-icon-cb="restore"
    :rules="rules"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import KeyCode from './KeyCode'

const metaKeys = ['Alt', 'Control', 'Meta', 'Shift']

export default Vue.extend({
  name: 'KeyInput',
  data: function () {
    return {
      origValue: null,
      rules: [v => this.valid || 'Already used in another command']
    }
  },
  props: {
    value: {
      type: KeyCode,
      required: false,
      default: function () {
        return new KeyCode()
      }
    },
    valid: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    onKeyDown (e: KeyboardEvent): void {
      if (e.repeat) return
      if (metaKeys.includes(e.key)) return
      this.pressedKey = KeyCode.fromKeyboardEvent(e)
    },
    restore (): void {
      this.pressedKey = this.origValue
    }
  },
  computed: {
    pressedKey: {
      get: function ():KeyCode {
        return this.value
      },
      set: function (value: KeyCode) {
        if (!this.origValue) this.origValue = this.value
        this.$emit('input', value, !this.origValue.match(value))
      }
    },
    isChanged (): boolean {
      return this.origValue && !(this.origValue.match(this.value))
    }
  },
  filters: {
    keyLabel (keyCode: KeyCode): string {
      const { ctrlKey, metaKey, altKey, shiftKey, key, code } = keyCode
      return [
        ctrlKey && 'CTRL',
        metaKey && 'META',
        altKey && 'ALT',
        shiftKey && 'SHIFT',
        key && key.match(/^[\x21-\x7F]$/)
          ? key.toUpperCase()
          : code && code.replace(/^(Key|Digit)/, '')
      ]
      .filter(v => v)
      .join(' + ')
    }
  }
})
</script>

<style>

</style>
