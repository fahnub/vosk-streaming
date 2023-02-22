function initSpeechRecognizer() {
  const fs = require('fs')
  const vosk = require('./vosk')
  const MODEL_PATH = process.env.MODEL_PATH
  const SAMPLE_RATE = process.env.SAMPLE_RATE
  if (!fs.existsSync(MODEL_PATH)) {
    console.log("Please download the model from https://alphacephei.com/vosk/models and unpack as " + MODEL_PATH + " in the current folder.")
    process.exit()
  }
  vosk.setLogLevel(0)
  const model = new vosk.Model(MODEL_PATH)
  const recognizer = new vosk.Recognizer({ model: model, sampleRate: SAMPLE_RATE })
  const loadData = (data) => {
    if (recognizer.acceptWaveform(data)) {
      let result = recognizer.result()
      console.log(result)
    }
  }
  const sigint = () => {
    console.log(recognizer.finalResult())
    console.log('\nDone')
    recognizer.free()
    model.free()
  }
  return { loadData, sigint }
}

module.exports = { initSpeechRecognizer }