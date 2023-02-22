function initMicListener({ loadData, sigint }) {
  const mic = require('mic')
  const SAMPLE_RATE = process.env.SAMPLE_RATE
  const micInstance = mic({
    rate: String(SAMPLE_RATE),
    channels: '1',
    debug: false,
    device: 'default',
  })
  const micInputStream = micInstance.getAudioStream()
  micInputStream.on('data', loadData)
  process.on('SIGINT', sigint)
  micInstance.start()
}

module.exports = { initMicListener }