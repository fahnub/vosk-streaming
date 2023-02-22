const { initSpeechRecognizer } = require('./model.loader')
const { initMicListener } = require('./mic.listener')

const speechRecognizer = initSpeechRecognizer()
initMicListener(speechRecognizer)