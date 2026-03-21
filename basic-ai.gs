// โค้ดสำหรับวางใน Google Apps Script สำหรับแบบทดสอบ พื้นฐานการใช้เทคโนโลยีปัญญาประดิษฐ์ (AI)
// 1. ไปที่เว็บไซต์ https://script.google.com/
// 2. กดปุ่ม โครงการใหม่ (New Project) แล้วนำโค้ดนี้ไปวางแทนที่
// 3. กดบันทึก (รูปแผ่นดิสก์)
// 4. กด การทำให้ใช้งานได้ (Deploy) -> การทำให้ใช้งานได้รายการใหม่ (New deployment)
// 5. เลือกประเภท: เว็บแอป (Web App)
// 6. สิทธิ์การเข้าถึง: "ทุกคน" (Anyone)
// 7. กด "ทำให้ใช้งานได้" (Deploy) แล้วคัดลอก Web App URL ใหม่ ไปใส่บรรทัดที่ 2 ในไฟล์ basic-ai.js

const SPREADSHEET_ID = '1YZV-Wysb633ZFyh3EaPjM9x8N4RW-dXwDBvS_QPnKPw'; // ID ของ Google Sheet
const SHEET_NAME = 'basic-ai'; // กำหนดให้บันทึกข้อมูลเฉพาะชีตชื่อ basic-ai เท่านั้น

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // สร้างชีตใหม่ถ้ายังไม่มี
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // Setup headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "ชื่อ-สกุล",
        "เบอร์โทรศัพท์",
        "อายุ",
        "ระดับการศึกษา",
        "คะแนน (10)", 
        "%", 
        "ระดับ",
        "ข้อ 1 (Ans)", "ข้อ 1 (Correct?)",
        "ข้อ 2 (Ans)", "ข้อ 2 (Correct?)",
        "ข้อ 3 (Ans)", "ข้อ 3 (Correct?)",
        "ข้อ 4 (Ans)", "ข้อ 4 (Correct?)",
        "ข้อ 5 (Ans)", "ข้อ 5 (Correct?)",
        "ข้อ 6 (Ans)", "ข้อ 6 (Correct?)",
        "ข้อ 7 (Ans)", "ข้อ 7 (Correct?)",
        "ข้อ 8 (Ans)", "ข้อ 8 (Correct?)",
        "ข้อ 9 (Ans)", "ข้อ 9 (Correct?)",
        "ข้อ 10 (Ans)", "ข้อ 10 (Correct?)"
      ]);

      // Bold the header row
      sheet.getRange(1, 1, 1, 28).setFontWeight("bold");
    }

    // Prepare data to insert
    const param = e.parameter;
    
    const rowData = [
      param.timestamp || new Date(),
      param.fullName,
      param.phoneNumber,
      param.age,
      param.education,
      param.score,
      param.percent,
      param.grade,
      param.q1_ans, param.q1_correct,
      param.q2_ans, param.q2_correct,
      param.q3_ans, param.q3_correct,
      param.q4_ans, param.q4_correct,
      param.q5_ans, param.q5_correct,
      param.q6_ans, param.q6_correct,
      param.q7_ans, param.q7_correct,
      param.q8_ans, param.q8_correct,
      param.q9_ans, param.q9_correct,
      param.q10_ans, param.q10_correct
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ 
      result: "success", 
      row: sheet.getLastRow() 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      result: "error", 
      error: error.message 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Support CORS Preflight
function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON);
}
