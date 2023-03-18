interface Config {
  url: string
  text: string
  backgroundColor: string
  textColor: string
  position: string
}

const defaultConfig: Config = {
  url: '',
  text: '',
  backgroundColor: '#00bcd4',
  textColor: '#ffffff',
  position: 'static'
}

export { Config, defaultConfig }
