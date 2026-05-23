function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var payload = {};

  try {
    payload = JSON.parse(e.postData.contents || "{}");
  } catch (error) {
    return jsonResponse({
      success: false,
      error: "Invalid JSON payload."
    });
  }

  var requiredFields = ["name", "email", "phone", "company", "service", "message", "source"];
  for (var i = 0; i < requiredFields.length; i += 1) {
    var key = requiredFields[i];
    if (!payload[key] || String(payload[key]).trim() === "") {
      return jsonResponse({
        success: false,
        error: "Missing required field: " + key
      });
    }
  }

  var timestamp = payload.timestamp || new Date().toISOString();

  sheet.appendRow([
    timestamp,
    payload.name,
    payload.email,
    payload.phone,
    payload.company,
    payload.service,
    payload.message,
    payload.source
  ]);

  return jsonResponse({
    success: true,
    message: "Thank you! We'll be in touch within 24 hours."
  });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
