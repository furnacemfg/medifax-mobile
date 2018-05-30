cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-hidden-statusbar-overlay.HiddenStatusbarOverlay",
    "file": "plugins/cordova-plugin-hidden-statusbar-overlay/www/hidden-statusbar-overlay.js",
    "pluginId": "cordova-plugin-hidden-statusbar-overlay",
    "clobbers": [
      "cordova.plugins.statusbarOverlay"
    ]
  },
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-speechrecognition.SpeechRecognition",
    "file": "plugins/cordova-plugin-speechrecognition/www/speechRecognition.js",
    "pluginId": "cordova-plugin-speechrecognition",
    "merges": [
      "window.plugins.speechRecognition"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-hidden-statusbar-overlay": "2.0.1",
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-speechrecognition": "1.1.2"
};
// BOTTOM OF METADATA
});