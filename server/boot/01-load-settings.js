'use strict'
import { default as debug } from 'debug'

// to enable these logs set `DEBUG=boot:01-load-settings` or `DEBUG=boot:*`
const log = debug('boot:01-load-settings')

module.exports = function (app) {

  const Setting = app.models.Setting

  function loadDefaultSettings () {
    console.error('Creating default settings')

    const settings = [ {
      type: 'string',
      key: 'appName',
      value: 'LoopBack Admin',
    }, {
      type: 'select',
      key: 'appTheme',
      value: 'skin-blue',
      options: [
        'skin-blue',
        'skin-black',
      ],
    }, {
      type: 'select',
      key: 'appLayout',
      value: 'fixed',
      options: [
        'skin-blue',
        'not-fixed',
      ],
    }, {
      type: 'string',
      key: 'formLayout',
      value: 'horizontal',
    }, {
      type: 'int',
      key: 'formLabelSize',
      value: 3,
    }, {
      type: 'int',
      key: 'formInputSize',
      value: 9,
    }, {
      type: 'boolean',
      key: 'com.module.users.enable_registration',
      value: true,
    } ]

    settings.forEach((setting) => {
      Setting.create(setting, (err) => {
        if (err) {
          console.error(err)
        }
      })
    })
  }

  function loadExistingSettings () {
    console.error('Loading existing settings')
    Setting.find((data) => log(data))
  }

  Setting.count((err, result) => {
    if (err) {
      console.error(err)
    }
    if (result < 1) {
      loadDefaultSettings()
    } else {
      loadExistingSettings()
    }
  })

}
