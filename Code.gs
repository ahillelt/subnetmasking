function onFormSubmit(e) {
    var studentEmail = e.response.getRespondentEmail();

    // Create a new Google Sheet for the student
    var newSheet = SpreadsheetApp.create(studentEmail + ' Problems');
    
    // Generate a unique code for each student
    var unique_code = Math.floor(Math.random() * 100000);
    
    for (var i = 0; i < 5; i++) {
        var problem = generateProblem(unique_code + i);
        // Write the problems to the new sheet
        newSheet.appendRow(["Problem " + (i+1) + ": IP Address: " + problem[0] + ", CIDR: " + problem[1]]);
    }

    // Write the unique code to the new sheet
    newSheet.appendRow(["Unique Code: " + unique_code]);

    // Share the new sheet with the student
    newSheet.addViewer(studentEmail);
    
    // Send an email to the student with a link to their sheet
    MailApp.sendEmail(studentEmail, 'Your Unique Problems', 'You can view your unique problems at this link: ' + newSheet.getUrl());
}
