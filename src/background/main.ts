import { Config, defaultConfig } from '../common'

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ 'config': JSON.stringify(defaultConfig) })
})

chrome.runtime.onMessage.addListener(request => {
  if (request.message === 'updatedConfig') {
    chrome.storage.sync.get('config', value => {
      const config: Config = JSON.parse(value.config)
      if (!config.urls || config.urls === '') return
      const urlList = config.urls.replace(/\r?\n/g, '').split(',').map(url => url.trim())

      chrome.tabs.query({}, tabs => {
        tabs.forEach(tab => {
          const isPageIncludesUrl = urlList.some(url => tab.url?.includes(url))
          if (!tab.id || !tab.url || !isPageIncludesUrl) return
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          })
        })
      })
    })
  }
})
