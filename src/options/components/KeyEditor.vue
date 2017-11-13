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
            :key="keyInput.id"
          >
            <key-input
              :value="keyInput.key"
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
            color="secondary"
          >
            <v-btn
              class="ml-0"
              color="green"
              dark
              @click.native="addInput(cmdIndex)"
              :disabled="!isAddable(cmdIndex)"
            >
              <v-icon left>add_circle_outline</v-icon>
              Add new key
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn
      color="blue-grey"
      dark
    >
      Load Defaults
    </v-btn>
    <v-btn
      color="blue-grey"
      dark
    >
      Reset
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
import KeyCode from './KeyCode'

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
          keyInputs: cmd.keyInputs.map(key => {
            return {
              key: KeyCode.fromKeyboardEvent(key),
              id: id++
            }
          })
        }
      })
      // JSON.parse(JSON.stringify(this.$store.getters.keyList))
    }
  },
  computed: {
    ...mapState([
      'keyList'
    ])
  },
  methods: {
    isAddable (cmdIndex:number):boolean {
      const keys = this.keyEditList[cmdIndex].keyInputs
      return keys.length === 0 || keys[keys.length - 1].key.code !== ''
    },
    addInput (cmdIndex:number):void {
      this.keyEditList[cmdIndex].keyInputs.push({id: id++, key: new KeyCode()})
    },
    removeInput (cmdIndex:number, keyIndex:number):void {
      this.keyEditList[cmdIndex].keyInputs.splice(keyIndex, 1)
    },
    updateInput (cmdIndex:number, keyIndex:number, value:KeyCode, changed:boolean):void {
      this.keyEditList[cmdIndex].keyInputs.splice(keyIndex, 1, {
        id: this.keyEditList[cmdIndex].keyInputs[keyIndex].id,
        key: value
      })
    }
  },
  filters: {
    kb (val:KeyboardEvent):KeyCode {
      return KeyCode.fromKeyboardEvent(val)
    }
  }
})
</script>

<style>
</style>
