<template>
  <v-app style="width: 400px">
    <v-container
      class="v-application px-0"
      fluid
    >
      <v-row>
        <v-col class="pa-8">
          <v-form>
            <h1 class="h1 mb-3">Configuration</h1>
            <v-select
              v-model="config.position"
              required
              class="mb-2"
              :items="positionList"
              label="Position"
            />
            <v-text-field
              v-model="config.url"
              class="mb-2"
              label="Production URL"
              outlined
              type="text"
            />
            <v-text-field
              v-model="config.text"
              class="mb-2"
              label="Text"
              outlined
              type="text"
            />
            <v-color-picker v-model="config.backgroundColor" />
            <v-color-picker v-model="config.textColor" />
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
import { VBtn, VApp, VContainer, VSelect, VTextField, VColorPicker } from 'vuetify/lib'
import { Config, defaultConfig } from '../common'

@Component({
  components: {
    VBtn, VApp, VContainer, VSelect, VTextField, VColorPicker
  },
})

export default class App extends Vue {
  readonly positionList = ['static', 'fixed']
  saving = false
  config: Config = defaultConfig

  public mounted() {
    chrome.storage.local.get('config', ({ config }) => {
      this.config = JSON.parse(config)
    })
  }

  save() {
    this.saving = true
    chrome.storage.local.set({ 'config': JSON.stringify(this.config) }, () => {
      setTimeout(() => {
        this.saving = false
      }, 500)
    })
  }
}
</script>
