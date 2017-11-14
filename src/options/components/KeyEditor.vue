 <template>
  <v-container fluid>
    <v-list two-line
      v-for="(actionItem, actionItemIndex) in keyEditList"
      :key="actionItemIndex"
    >
      <v-subheader>{{actionItem.action}}</v-subheader>
      <v-list-tile
        avatar
        v-for="(hotkey, keyIndex) in actionItem.hotkeys"
        :key="hotkey.id"
      >
        <v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <key-input
            :value="hotkey.key"
            @input="(value, changed) => updateInput(actionItemIndex, keyIndex, value, changed)"
          ></key-input>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn
            flat icon color="red"
            @click.native="removeInput(actionItemIndex, keyIndex)"
          >
            <v-icon>remove_circle</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content
        >
          <v-btn
            color="green"
            flat
            outline
            @click.native="addInput(actionItemIndex)"
            :disabled="!isAddable(actionItemIndex)"
          >
            <v-icon>add</v-icon>
            add
          </v-btn>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="actionItemIndex + 1 < keyEditList.length"></v-divider>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import KeyInput from './KeyInput.vue'
import HotKey from './HotKey'

let id:number = 0

export default Vue.extend({
  name: 'KeyEditor',
  components: {
    KeyInput
  },
  data: function () {
    return {
      keyEditList: this.$store.getters.keyList.map(actionItem => {
        return {
          action: actionItem.action,
          hotkeys: actionItem.hotkeys.map(key => {
            const hk:HotKey = HotKey.fromKeyboardEvent(key)
            return {
              key: hk,
              orig: hk,
              id: id++
            }
          })
        }
      })
    }
  },
  computed: {
    ...mapState([
      'keyList'
    ])
  },
  methods: {
    isAddable (actionItemIndex:number):boolean {
      const keys = this.keyEditList[actionItemIndex].hotkeys
      return keys.length === 0 || keys[keys.length - 1].key.code !== ''
    },
    addInput (actionItemIndex:number):void {
      this.keyEditList[actionItemIndex].hotkeys.push({
        id: id++,
        key: new HotKey(),
        orig: new HotKey()
      })
    },
    removeInput (actionItemIndex:number, keyIndex:number):void {
      this.keyEditList[actionItemIndex].hotkeys.splice(keyIndex, 1)
    },
    updateInput (actionItemIndex:number, keyIndex:number, value:HotKey, changed:boolean):void {
      this.keyEditList[actionItemIndex].hotkeys.splice(
        keyIndex, 1, Object.assign(this.keyEditList[actionItemIndex].hotkeys[keyIndex], {
          key: value
        })
      )
    }
  },
  filters: {
    kb (val:KeyboardEvent):HotKey {
      return HotKey.fromKeyboardEvent(val)
    }
  }
})
</script>

<style>
</style>
