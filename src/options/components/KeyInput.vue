<template>
  <v-text-field
    readonly
    single-line
    @keydown="onKeyDown"
    :value="keyLabel"
    :append-icon="isChanged ? 'backspace' : ''"
    :append-icon-cb="restore"
    :rules="rules"
  ></v-text-field>
</template>

<script lang="ts">
import Vue from 'vue'

const metaKeys = ['Alt', 'Control', 'Meta', 'Shift']

const toLabel = (keyEvent: KeyboardEvent): string => {
  const { ctrlKey, metaKey, altKey, shiftKey, key, code } = keyEvent
  return [
    ctrlKey ? 'CTRL' : null,
    metaKey ? 'META' : null,
    altKey ? 'ALT' : null,
    shiftKey ? 'SHIFT' : null,
    key.match(/^[\x21-\x7F]$/)
      ? key.toUpperCase()
      : code.replace(/^(Key|Digit)/, '')
  ]
    .filter(v => v)
    .join(' + ')
}

export default Vue.extend({
  name: 'KeyInput',
  data: function () {
    return {
      pressedKey: this.value,
      rules: [v => this.valid || 'Already used in another command']
    }
  },
  props: {
    value: {
      type: KeyboardEvent,
      required: false,
      default: function () {
        return new KeyboardEvent('keydown', {})
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
      this.pressedKey = e
      this.$emit('input', this.keyProps)
    },
    restore (): void {
      this.pressedKey = this.value
    }
  },
  computed: {
    keyLabel (): string {
      return toLabel(this.pressedKey)
    },
    keyProps (): Object {
      const { ctrlKey, metaKey, altKey, shiftKey, key, code } = this.pressedKey
      return {
        ctrlKey,
        metaKey,
        altKey,
        shiftKey,
        key,
        code
      }
    },
    isChanged (): boolean {
      return toLabel(this.value) !== this.keyLabel
    }
  }
})
</script>

<style>

</style>
