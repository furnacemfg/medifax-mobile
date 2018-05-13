cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
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
  "cordova-plugin-hidden-statusbar-overlay": "2.0.1",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-speechrecognition": "1.1.2"
};
// BOTTOM OF METADATA
});