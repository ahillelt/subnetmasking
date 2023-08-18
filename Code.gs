function onFormSubmit(e) {
    var studentEmail = e.response.getRespondentEmail();
    var sheetName = studentEmail + ' Problems';
    
    // Get the destination folder by name or create it if it doesn't exist
    var destinationFolder = getOrCreateFolder('Networking/subnetproblems');
    
    // Create a new Google Sheet for the student
    var spreadsheet = SpreadsheetApp.create(sheetName);
    var sheetId = spreadsheet.getId();
    
    // Generate a unique code for each student
    var unique_code = Math.floor(Math.random() * 100000);
    
    // Get the newly created sheet
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Clear any existing data from the sheet
    sheet.clear();
    
    for (var i = 0; i < 5; i++) {
        var problem = generateProblem(unique_code + i);
        // Write the problems to the sheet
        sheet.appendRow(["Problem " + (i+1) + ": IP Address: " + problem[0] + ", CIDR: " + problem[1]]);
    }
    
    // Write the unique code to the sheet
    sheet.appendRow(["Unique Code: " + unique_code]);
    
    // Move the spreadsheet to the destination folder
    var file = DriveApp.getFileById(sheetId);
    var movedFile = destinationFolder.createFile(file);
    DriveApp.getFileById(sheetId).setTrashed(true); // Remove the original in the root folder
    
    // Share the sheet with the student
    movedFile.addViewer(studentEmail);
    
    // Send an email to the student with a link to their sheet
    MailApp.sendEmail(studentEmail, 'Your Unique Problems', 'You can view your unique problems at this link: ' + movedFile.getUrl());
}

function getOrCreateFolder(folderPath) {
    var folders = folderPath.split('/');
    var currentFolder = DriveApp.getRootFolder();
    
    for (var i = 0; i < folders.length; i++) {
        var folder = currentFolder.getFoldersByName(folders[i]);
        
        if (folder.hasNext()) {
            currentFolder = folder.next();
        } else {
            currentFolder = currentFolder.createFolder(folders[i]);
        }
    }
    
    return currentFolder;
}
