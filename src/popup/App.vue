<template>
  <v-app style="width: 400px">
    <v-container
      class="v-application px-0"
      fluid
    >
      <v-row>
        <v-col class="px-8 py-5">
          <v-form>
            <v-select
              v-model="config.position"
              required
              class="mb-5"
              :items="positionList"
              label="Position"
              hide-details
            />
            <v-textarea
              v-model="config.urls"
              auto-grow
              class="mb-5"
              label="Production URL"
              rows="2"
              outlined
              type="text"
              hide-details
            />
            <v-text-field
              v-model="config.text"
              class="mb-5"
              label="Text"
              outlined
              type="text"
              hide-details
            />
            <div class="v-label mb-2 theme--light">Background Color</div>
            <v-color-picker v-model="config.backgroundColor" width="360" hide-inputs class="mb-4" />
            <div class="v-label mb-2 theme--light">Text Color</div>
            <v-color-picker v-model="config.textColor" width="360" hide-inputs />
            <div class="text-center">
              <v-btn
                color="primary"
                elevation="2"
                :loading="saving"
                :disabled="saving"
                @click="save"
              >
                SAVE
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import { VBtn, VApp, VContainer, VSelect, VTextarea, VTextField, VColorPicker } from 'vuetify/lib'
import { Config, defaultConfig } from '../common'

@Component({
  components: {
    VBtn, VApp, VContainer, VSelect, VTextarea, VTextField, VColorPicker
  },
})

export default class App extends Vue {
  readonly positionList = ['static', 'fixed']
  saving = false
  config: Config = defaultConfig

  public mounted() {
    chrome.storage.sync.get('config', ({ config }) => {
      this.config = JSON.parse(config)
    })
  }

  save() {
    this.saving = true
    chrome.storage.sync.set({ 'config': JSON.stringify(this.config) }, () => {
      setTimeout(() => {
        this.saving = false
      }, 500)

      chrome.runtime.sendMessage({ message: 'updatedConfig' })
    })
  }
}
</script>
