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
            v-for="(hotkey, keyIndex) in cmd.hotkeys"
            :key="hotkey.id"
          >
            <key-input
              :value="hotkey.key"
              @input="(value, changed) => updateInput(cmdIndex, keyIndex, value, changed)"
            ></key-input>
            <v-btn
              flat icon color="red"
              @click.native="removeInput(cmdIndex, keyIndex)"
            >
              <v-icon>remove_circle</v-icon>
            </v-btn>
          </v-flex>
          <v-flex
            class="text-xs-center"
          >
            <v-btn
              color="green"
              dark
              icon
              small
              @click.native="addInput(cmdIndex)"
              :disabled="!isAddable(cmdIndex)"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

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
      keyEditList: this.$store.getters.keyList.map(cmd => {
        return {
          name: cmd.name,
          hotkeys: cmd.hotkeys.map(key => {
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
    isAddable (cmdIndex:number):boolean {
      const keys = this.keyEditList[cmdIndex].hotkeys
      return keys.length === 0 || keys[keys.length - 1].key.code !== ''
    },
    addInput (cmdIndex:number):void {
      this.keyEditList[cmdIndex].hotkeys.push({
        id: id++,
        key: new HotKey(),
        orig: new HotKey()
      })
    },
    removeInput (cmdIndex:number, keyIndex:number):void {
      this.keyEditList[cmdIndex].hotkeys.splice(keyIndex, 1)
    },
    updateInput (cmdIndex:number, keyIndex:number, value:HotKey, changed:boolean):void {
      this.keyEditList[cmdIndex].hotkeys.splice(
        keyIndex, 1, Object.assign(this.keyEditList[cmdIndex].hotkeys[keyIndex], {
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
