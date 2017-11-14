<template>
  <v-text-field
    readonly
    single-line
    placeholder="Enter new key"
    @keydown.prevent="onKeyDown"
    :value="pressedKey | keyLabel"
    :prefix="isDirty ? '*' : ''"
    :append-icon="isDirty ? 'backspace' : ''"
    :append-icon-cb="restore"
    :rules="rules"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'
import HotKey from './HotKey'

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
      type: HotKey,
      required: false,
      default: function () {
        return new HotKey()
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
      this.pressedKey = HotKey.fromKeyboardEvent(e)
    },
    restore (): void {
      this.pressedKey = this.origValue
    }
  },
  computed: {
    pressedKey: {
      get: function ():HotKey {
        return this.value
      },
      set: function (value: HotKey) {
        if (!this.origValue) this.origValue = this.value
        this.$emit('input', value, !this.origValue.match(value))
      }
    },
    isDirty (): boolean {
      return this.origValue && !(this.origValue.match(this.value))
    }
  },
  filters: {
    keyLabel (hk: HotKey): string {
      const { ctrlKey, metaKey, altKey, shiftKey, key, code } = hk
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
