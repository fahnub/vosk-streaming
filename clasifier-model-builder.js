const { fromCSV } = require('rx-from-csv')
const whichx = require('whichx')
const fs = require('fs')
const DATASETS_PATH = './dataset'
const MODELS_PATH = './models'

function loadClassificationModel({ datasetInputPath, modelOutputPath }) {
  const whichpet = new whichx()
  whichpet.addLabels(['START_VIDEO', 'STOP_VIDEO', 'PHOTO', 'MORE_ZOOM', 'LESS_ZOOM', 'LIGHT', 'UNKNOW'])
  fromCSV(datasetInputPath)
    .forEach((data) => {
      whichpet.addData(data.action, data.interaction)
      if (datasetInputPath.includes('_en')) console.log(data)
    })
    .finally(() => {
      const model = whichpet.export()
      const data = JSON.stringify(model)
      fs.writeFile(modelOutputPath, data, (err) => {
        if (err) {
          console.log(err)
          return
        }
        console.info('Loaded classification model')
      })
    })
}
loadClassificationModel({
  datasetInputPath: `${DATASETS_PATH}/datasets_es.csv`,
  modelOutputPath: `${MODELS_PATH}/text_clasifier_es.model`,
})
loadClassificationModel({
  datasetInputPath: `${DATASETS_PATH}/datasets_en.csv`,
  modelOutputPath: `${MODELS_PATH}/text_clasifier_en.model`,
})