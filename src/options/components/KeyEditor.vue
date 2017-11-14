 <template>
  <v-container fluid>
    <v-list two-line
      v-for="(actionItem, actionItemIndex) in keyEditList"
      :key="actionItemIndex"
    >
      <v-subheader>{{actionItem.action}}</v-subheader>
      <transition-group tag="div" name="list">
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
              flat
              icon
              color="red"
              @click.native="removeInput(actionItemIndex, keyIndex)"
            >
              <v-icon>remove_circle</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </transition-group>
      <v-list-tile>
        <v-list-tile-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content
        >
          <v-btn
            color="teal"
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
    <v-footer app fixed dark color="teal">
      <v-container fluid>
        <v-layout row justify-center>
          <v-flex class="text-xs-center">
            <v-btn
              color="blue-grey"
              dark
            >
              <v-icon>cached</v-icon>
              Load Defaults
            </v-btn>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn
              color="blue-grey"
              dark
              disabled
            >
              <v-icon>settings_backup_restore</v-icon>
              Reset
            </v-btn>
          </v-flex>
          <v-flex class="text-xs-center">
            <v-btn
              color="blue-grey"
              dark
              disabled
            >
              <v-icon>check_circle</v-icon>
              Submit
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>

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
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateY(-50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleX(0.2) scaleY(0.2);
  transform-origin: center center;
}
</style>
