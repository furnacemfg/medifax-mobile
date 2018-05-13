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



$( document ).ready(function() {
  // If we're on an info screen then load the info from local storage
  if ( $('#info-screen').length > 0 ) {
    var storage = window.localStorage;
    var json = JSON.parse(storage.getItem('customer_data'));
    console.log(json)
    // Load the data
    $("#full-name").html(json.name.first + ' ' + json.name.last);
    $("#med-full-name").html(json.name.first + ' ' + json.name.last);
    $("#dob").html(json.dob);
    $("#med-dob").html(json.dob);
    $("#emergency-contact").html(json.patient_consents.replace(/\n/g, "<br />"));
    $("#med-emergency-contact").html(json.patient_consents.replace(/\n/g, "<br />"));
    $("#allergies").html(json.allergies.replace(/\n/g, "<br />"));
    $("#med-allergies").html(json.allergies.replace(/\n/g, "<br />"));

    // DOB handling
    if (json.dob != null) {
      age = calc_age(json.dob)
      $("#age").html(age);
      $("#med-age").html(age);
    }

    // MEDICAL
    $("#bmi").html(json.bmi);
    $("#height").html(convert_inches(json.height));
    $("#weight").html(json.weight + " lbs");
    $("#gender").html(json.gender);
    $("#blood-type").html(json.blood_type);
    $("#blood-pressure").html(json.blood_pressure_systolic + " / " + json.blood_pressure_diastolic);

    $("#patient_preferences").html(json.patient_preferences);
    $("#family_history").html(json.family_history);
    $("#lifestyle_history").html(json.lifestyle_history);
    $("#lifestyle_history-type").html(json.lifestyle_history);
    $("#social_history-type").html(json.social_history);
    $("#care_plan").html(json.care_plan);
    $("#lab_results").html(json.lab_results);
    $("#referrals").html(json.referrals);

    // MEDICAL IMAGES
    var medical_images = ''
    var i;
    for (i = 0; i < json.images.medical.length; i++) {
        medical_images += image_wrapper(json.images.medical[i][0], json.images.medical[i][1], json.images.medical[i][2]);
    }
    $("#medical_images").html(medical_images)

    // DENTAL IMAGES
    var dental_images = ''
    var i;
    for (i = 0; i < json.images.dental.length; i++) {
        dental_images += image_wrapper(json.images.dental[i][0], json.images.dental[i][1], json.images.dental[i][2]);
    }
    $("#dental_images").html(dental_images)

    // MEDICAL CONDITIONS
    var medical_conditions = ''
    for (i = 0; i < 10; i++) {
      if (json['current_problems_' + i] != null) {
        medical_conditions += "&#8226;" + " " + json['current_problems_' + i] + "<br />\n";
      }
    }
    $("#medical_conditions").html(medical_conditions)
    $("#med-medical_conditions").html(medical_conditions)

    // MEDICATIONS
    var current_medications = ""
    var medication_list = ""
    for (i = 0; i < 10; i++) {
      if (json['medication_name_' + i] != null) {
        current_medications += "&#8226;" + " " + json['medication_name_' + i] + " - " + json['medication_dose_' + i] + "mg - " + json['medication_freq_' + i] + "x / day<br />\n";
        medication_list += medications_wrapper(json['medication_name_' + i], json['medication_dose_' + i], json['medication_freq_' + i])
      }
    }
    $("#current_medications").html(current_medications)
    $("#medication_list").html(medication_list)

    // DENTAL
    $("#dentist_name").html(json.dentist_name);
    $("#dentist_phone").html(json.dentist_phone);
    $("#dentist_email").html(json.dentist_email);
    $("#dental_condition").html(json.dental_condition.replace(/\n/g, "<br />"));

    $("#ins_provider_med").html(json.ins_provider_med);
    $("#ins_planid_med").html(json.ins_planid_med);
    $("#ins_street_addr_med").html(json.ins_street_addr_med);
    $("#ins_city_med").html(json.ins_city_med);
    $("#ins_state_med").html(json.ins_state_med);
    $("#ins_zip_med").html(json.ins_zip_med);
    $("#ins_phone_med").html(json.ins_phone_med);
    $("#ins_email_med").html(json.ins_email_med);

    $("#ins_provider_dental").html(json.ins_provider_dental);
    $("#ins_planid_dental").html(json.ins_planid_dental);
    $("#ins_street_addr_dental").html(json.ins_street_addr_dental);
    $("#ins_city_dental").html(json.ins_city_dental);
    $("#ins_state_dental").html(json.ins_state_dental);
    $("#ins_zip_dental").html(json.ins_zip_dental);
    $("#ins_phone_dental").html(json.ins_phone_dental);
    $("#ins_email_dental").html(json.ins_email_dental);


  } // End customer data assignments

 window.plugins.speechRecognition.startListening(successCallback, errorCallback);

});


// Fix to the panel not closing once jQuery Mobile added into the mix
$(".panel-item").click(function(){
  $.app.menu.toggle();
});

$("#refresh-data").click(function(){
  var URL_FETCH = "https://7z6lcegucj.execute-api.us-east-1.amazonaws.com/dev/customers/"
  var storage = window.localStorage;
  var json = JSON.parse(storage.getItem('customer_data'));
  var jqxhr = $.get( URL_FETCH + json.id, function() {
    json = jqxhr.responseJSON;
    var storage = window.localStorage;
    storage.setItem('customer_data', JSON.stringify(json))
    alert("Your Medifax data has been updated.")
    // Redirect to the Emergency information screen
    window.location.replace("emergency.html");
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

$("#auth-user").click(function(){
  // Check if the user is logged in.
  var URL_AUTH = "https://7z6lcegucj.execute-api.us-east-1.amazonaws.com/dev/customers/auth";
  var URL_FETCH = "https://7z6lcegucj.execute-api.us-east-1.amazonaws.com/dev/customers/"
  if ($("#access_code").val() != '') {
    // Build the JSON to post to the endpoint
    var payload = '{"access_code": "' + $("#access_code").val() + '"}';
    $ajax = $.ajax({
      type: 'POST',
      url: URL_AUTH,
      data: payload,
      dataType: 'json',
      success: function(data) {
        if (data.message == 'Success') {
          // console.log(data.id);
          // Looks like the Access Code was correct. Let's fetch the customer data.
          var jqxhr = $.get( URL_FETCH + data.id, function() {
            json = jqxhr.responseJSON;
            var storage = window.localStorage;
            storage.setItem('logged_in', 1) // This can only be set if the data has been stored to local info.
            storage.setItem('customer_data', JSON.stringify(json))
            // Redirect to the Emergency information screen
            window.location.replace("emergency.html");
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

        } else {
          console.log("Login was unsuccessful.");
        }
        // console.log(data);

      },
      error:function (xhr, ajaxOptions, thrownError) {
          dir(thrownError);
          dir(xhr);
          dir(ajaxOptions);
      }
    });

  } else { // User did not enter an access code.
    console.log("No Access Code Found");
  }
});

function image_wrapper(src, title, date) {
  var markup = "<p><a href=\"" + src + "\" target=\"_blank\"><img src=\"" + src + "\" class=\"img-fluid\" /></a>\n<br /><strong>" + title + "</strong><br />" + date + "\n<hr /></p>\n";
  return markup;
}

function medications_wrapper(name, dose, freq) {
  var markup = "<div class=\"row\"><div class=\"col col-5\">" + name + "</div><div class=\"col col-4\">" + dose + "mg</div><div class=\"col col-3\">" + freq + "x/day</div></div>\n<hr />\n"
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
