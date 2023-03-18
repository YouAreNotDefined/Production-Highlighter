import { Config } from '../common'

chrome.storage.local.get('config', (value) => {
  const config: Config = value.config
  if (window.location.href.includes(config.url)) {
    const div = document.createElement('div')
    div.textContent = config.text
    div.style.backgroundColor = config.backgroundColor
    div.style.color = config.textColor
    div.style.position = config.position
    div.style.top = '0'
    div.style.left = '0'
    div.style.width = '100%'
    div.style.height = '30px'
    div.style.zIndex = '9999'
    document.body.prepend(div)
  }
})
