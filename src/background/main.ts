import { defaultConfig } from '../common'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 'config': JSON.stringify(defaultConfig) })
})
