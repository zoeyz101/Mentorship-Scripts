function sendEmail() {
  var spreadsheetUrl =
    "https://docs.google.com/spreadsheets/d/1kQEAxeMzhuXR2hNe0WEC346XSmKKX-7jl-gEWaxNGPg/edit"; // change if new spreadsheet - remember to end url with /edit
  var ss = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var matching_sheet = ss.getSheetByName("Matched");
  var matching = matching_sheet.getDataRange().getValues();
  var matching_row = matching_sheet.getLastRow();

  for (var i = 1; i < matching_row; ++i) {
    var match = matching[i];
    MentorEmail(match);
    MenteeEmail(match);
  }
}

//MentorEmail - find mentee #1 and if exists - mentee #2,
function MentorEmail(match, mentees) {
  var name = match[0];
  var email = match[1];
  var mentee = "Name: " + match[2] + "\nEmail: " + match[3];
  const introText =
    "We are reaching out to you because you have shown interest in being a mentor for an incoming BME 2025 student. Based on your google form responses we have matched you with a suitable mentee(s) who will greatly benefit from your upper year wisdom, program tips and friendly guidance. See below for contact information.";
  const endText =
    "The next step is to reach out to your mentee and arrange a meeting. We recommend using Google Meet! Please also be on the lookout for an email for our Kickoff Event and join our discord if you have not already - https://discord.gg/Fuczsgd\n\n Duru, Zoey, Grace\n(BME ‘24)";
  if (match[4]) {
    mentee += "\nName: " + match[4] + "\nEmail: " + match[5];
  }
  var body =
    "Greetings " +
    name +
    `\n\n` +
    introText +
    `\n\n` +
    mentee +
    `\n\n` +
    endText;
  Logger.log(body);
  GmailApp.sendEmail(email, "BME Mentorship Project Match", body);
}
//MenteeEmail - find mentor send to mentee #1 and mentee #2
function MenteeEmail(match, mentors) {
  var name = match[2];
  var email = match[3];
  const mentorName = match[0];
  const mentorEmail = match[1];
  const introText =
    "We are reaching out to you because you have shown interest in being a part of the bme mentorship program. Based on your google form responses we have matched you with a suitable mentor that will hopefully provide you with some upper year wisdom and guidance. See below for contact information.";
  const endText =
    "Your mentor will reach out to you soon through email, and you both can arrange a suitable time and method for your initial meeting. The goal is to get familiar with networking, develop friendships among the program and get answers to your questions.\nWe hope you have a great first year, feel free to reach out to us with any questions! Please feel free to reach out to your mentor first as well and let us know if they do not respond.\n\nDuru, Zoey, Grace\n(BME ‘24)\n\nPS. As for our skill testing question in the form, the man in the photo is in fact: The man, the myth, the legend...Igor Ivkovic. One of the coolest professors we know.";
  var body =
    "Greetings " +
    name +
    `\n\n` +
    introText +
    `\n\n` +
    "Name: " +
    mentorName +
    `\n` +
    "Email:" +
    mentorEmail +
    `\n\n` +
    endText;

  GmailApp.sendEmail(email, "BME Mentorship Project Match", body);
  if (match[4]) {
    name = match[4];
    email = match[5];
    var body =
      "Greetings " +
      name +
      `\n\n` +
      introText +
      `\n\n` +
      "Name: " +
      mentorName +
      `\n` +
      "Email: " +
      mentorEmail +
      `\n\n` +
      endText;
    GmailApp.sendEmail(email, "BME Mentorship Project Match", body);
  }
}

//Helper Function - Search
function Search(target, values) {
  var row;
  for (i; i < values.length(); ++i) {
    if (values[i][1] == target) row = i;
  }
  return values[i];
}
