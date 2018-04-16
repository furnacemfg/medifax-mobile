/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
app.initialize();

$(function(){

    var jqxhr = $.get( "https://7z6lcegucj.execute-api.us-east-1.amazonaws.com/dev/customers/c85cf638-3aa0-11e8-8bb4-5e566f9ab6c7", function() {
      json = jqxhr.responseJSON;
      $("#full-name").html(json.name.first + ' ' + json.name.last);
      $("#dob").html(json.dob);
      if (json.dob != null) {
        age = calc_age(json.dob)
        $("#age").html(age);
      }
      $("#emergency-contact").html(json.patient_consents.replace(/\n/g, "<br />"));
      $("#allergies").html(json.allergies.replace(/\n/g, "<br />"));

      // MEDICAL
      $("#bmi").html(json.bmi);
      $("#height").html(convert_inches(json.height));
      $("#weight").html(json.weight + " lbs");
      $("#gender").html(json.gender);
      $("#blood-type").html(json.blood_type);

      $("#patient_preferences").html(json.patient_preferences);
      $("#family_history").html(json.family_history);
      $("#family_history").html(json.family_history);
      $("#lifestyle_history-type").html(json.lifestyle_history);
      $("#social_history-type").html(json.social_history);
      $("#care_plan").html(json.care_plan);
      $("#lab_results").html(json.lab_results);
      $("#referrals").html(json.referrals);

      $("#blood-pressure").html(json.blood_pressure_systolic + " / " + json.blood_pressure_diastolic);

      // DENTAL
      $("#dentist_name").html(json.dentist_name);
      $("#dentist_phone").html(json.dentist_phone);
      $("#dentist_email").html(json.dentist_email);
      $("#dental_condition").html(json.dental_condition.replace(/\n/g, "<br />"));

      $("#ins_provider_med").html(json.ins_provider_med);
      $("#ins_provider_med").html(json.ins_planid_med);
      $("#ins_provider_med").html(json.ins_street_addr_med);
      $("#ins_provider_med").html(json.ins_city_med);
      $("#ins_provider_med").html(json.ins_state_med);
      $("#ins_provider_med").html(json.ins_zip_med);
      $("#ins_provider_med").html(json.ins_phone_med);
      $("#ins_provider_med").html(json.ins_email_med);

      // MEDICAL CONDITIONS
      var medical_conditions = ''
      for (i = 0; i < 10; i++) {
        if (json['current_problems_' + i] != null) {
          medical_conditions += "&#8226;" + " " + json['current_problems_' + i] + "<br />\n";
        }
      }
      $("#medical_conditions").html(medical_conditions)

      // MEDICATIONS
      var current_medications = ""
      var medication_list = ""
      for (i = 0; i < 10; i++) {
        if (json['medication_name_' + i] != null) {
          current_medications += "&#8226;" + " " + json['medication_name_' + i] + " - " + json['medication_dose_' + i] + " - " + json['medication_freq_' + i] + "<br />\n";
          medication_list += medications_wrapper(json['medication_name_' + i], json['medication_dose_' + i], json['medication_freq_' + i])
        }
      }
      $("#current_medications").html(current_medications)
      $("#medication_list").html(medication_list)

    }) // End AJAX call to AWS Lambda
      .done(function() {
        // alert( "second success" );
      })
      .fail(function() {
        console.log("API Error")
      })
      .always(function() {
        // alert( "finished" );
      });
});

function medications_wrapper(name, dose, freq) {
  var markup = "<div class=\"row\"><div class=\"col col-6\">" + name + "</div><div class=\"col col-3\">" + dose + "mg</div><div class=\"col col-3\">" + freq + "/day</div></div>\n<hr />\n"
  return markup
}

function calc_age(birthdate) {
  today = new Date(),
  dob = new Date(birthdate.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  age = today.getFullYear() - dob.getFullYear();
  return age
}

function convert_inches(inches) {
  var feet = Math.floor(inches / 12);
    inches %= 12;
    return feet + "' " + inches + '\"';
}
