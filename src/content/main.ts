import { Config } from '../common'

chrome.storage.sync.get('config', value => {
  const config: Config = JSON.parse(value.config)
  if (!config.urls || config.urls === '') return
  const urlList = config.urls.replace(/\r?\n/g, '').split(',').map(url => url.trim())
  const isPageIncludesUrl = urlList.some(url => window.location.href.includes(url))

  if (isPageIncludesUrl) {
    let productionHighlighter = document.getElementById('production-highlighter')
    if (!productionHighlighter) {
      productionHighlighter = document.createElement('div')
      document.body.insertBefore(productionHighlighter, document.body.firstChild)
    }
    productionHighlighter.id = 'production-highlighter'
    productionHighlighter.textContent = config.text
    productionHighlighter.style.backgroundColor = config.backgroundColor
    productionHighlighter.style.color = config.textColor
    productionHighlighter.style.position = config.position
    productionHighlighter.style.top = '0'
    productionHighlighter.style.left = '0'
    productionHighlighter.style.width = '100%'
    productionHighlighter.style.height = '40px'
    productionHighlighter.style.zIndex = '9999'
    productionHighlighter.style.fontSize = '27px'
    productionHighlighter.style.textAlign = 'center'
    productionHighlighter.style.lineHeight = '1.4'
  }
})
