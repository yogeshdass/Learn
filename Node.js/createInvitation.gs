function createInvitation() {
  var f = DriveApp.getFileById("1iDzxDPdsWshrU6oDan62opJYTElalucxnavdiIVKYaE");
  var spreadsheet = SpreadsheetApp.open(f);
  var allsheets = spreadsheet.getSheets();
  for(var sheet in allsheets){
    var locksheet = allsheets[sheet];
    var datarange = locksheet.getDataRange();
    var lastcol = datarange.getLastColumn();
    for(var col=1; col<=lastcol; col++) {
      if(locksheet.getRange(3, col).getValue() == "Yogesh") {
        var startevent = locksheet.getRange(4,col).getValue();
        var endevent = locksheet.getRange(5,col).getValue();
        var event = CalendarApp.getDefaultCalendar().setTimeZone("Asia/Kolkata").createEvent('NOC Shift', new Date(startevent), new Date(endevent),{location: ''});
        Logger.log('Event ID: ' + event.getId());
      }
    }
  }  
}
