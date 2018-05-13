var jqxhr = $.get( "https://7z6lcegucj.execute-api.us-east-1.amazonaws.com/dev/customers/b4a070f4-44a8-11e8-83d4-c29c5548ed15", function() {
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
  $("#blood-pressure").html(json.blood_pressure_systolic + " / " + json.blood_pressure_diastolic);

  $("#patient_preferences").html(json.patient_preferences);
  $("#family_history").html(json.family_history);
  $("#lifestyle_history").html(json.lifestyle_history);
  $("#lifestyle_history-type").html(json.lifestyle_history);
  $("#social_history-type").html(json.social_history);
  $("#care_plan").html(json.care_plan);
  $("#lab_results").html(json.lab_results);
  $("#referrals").html(json.referrals);



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
