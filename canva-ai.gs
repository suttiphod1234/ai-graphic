/**
 * โค้ดสำหรับวางใน Google Apps Script สำหรับแบบทดสอบ Canva For Ai
 * 1. ไปที่ https://script.google.com/
 * 2. สร้างโครงการใหม่และวางโค้ดนี้
 * 3. เปลี่ยน SPREADSHEET_ID เป็นไอดีของชีตของคุณ
 * 4. Deploy เป็น Web App (สิทธิ์การเข้าถึง: "ทุกคน")
 * 5. นำ Web App URL ไปใส่ใน canva-ai.js
 */

const SPREADSHEET_ID = '1sG2mBw4Us_B4IKsADLFfrx1rJH5aHdztPORrmhYVsEs'; 
const SHEET_NAME = 'canva-ai';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "ชื่อ-สกุล", "อีเมล", "ความคิดเห็น", "คะแนน", "เต็ม", "%", "ระดับ",
        "ข้อ 1", "ข้อ 1 (C)", "ข้อ 2", "ข้อ 2 (C)", "ข้อ 3", "ข้อ 3 (C)", 
        "ข้อ 4", "ข้อ 4 (C)", "ข้อ 5", "ข้อ 5 (C)", "ข้อ 6", "ข้อ 6 (C)",
        "ข้อ 7", "ข้อ 7 (C)", "ข้อ 8", "ข้อ 8 (C)", "ข้อ 9", "ข้อ 9 (C)",
        "ข้อ 10", "ข้อ 10 (C)"
      ]);
      sheet.getRange(1, 1, 1, 28).setFontWeight("bold").setBackground("#f3f4f6");
    }

    const p = e.parameter;
    const rowData = [
      p.timestamp, p.fullName, p.email, p.comment, p.score, p.fullScore, p.percent, p.grade,
      p.q1_ans, p.q1_correct, p.q2_ans, p.q2_correct, p.q3_ans, p.q3_correct,
      p.q4_ans, p.q4_correct, p.q5_ans, p.q5_correct, p.q6_ans, p.q6_correct,
      p.q7_ans, p.q7_correct, p.q8_ans, p.q8_correct, p.q9_ans, p.q9_correct,
      p.q10_ans, p.q10_correct
    ];

    sheet.appendRow(rowData);

    // ส่งอีเมลแจ้งผล
    sendResultEmail(p.email, p.fullName, p.score, p.fullScore, p.percent, p.grade);

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendResultEmail(toEmail, name, score, full, percent, grade) {
  const subject = `สรุปผลคะแนนแบบทดสอบ: หลักสูตรการใช้งาน Canva For Ai - คุณ ${name}`;
  
  let bodyHtml = `
    <div style="font-family: 'Kanit', sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7d2ae8 0%, #00c4cc 100%); padding: 40px 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">สรุปผลการทดสอบ</h1>
        <p style="opacity: 0.9;">หลักสูตรการใช้งาน Canva For Ai</p>
      </div>
      <div style="padding: 30px; line-height: 1.6; color: #334155;">
        <p>สวัสดีคุณ <strong>${name}</strong>,</p>
        <p>ขอขอบคุณที่เข้าร่วมการทดสอบความรู้ในหลักสูตรนี้ สรุปผลคะแนนของคุณมีดังนี้:</p>
        
        <div style="display: flex; gap: 10px; margin-bottom: 20px; text-align: center;">
          <div style="flex: 1; background: #f8fafc; padding: 20px; border-radius: 15px;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">คะแนนที่ได้</p>
            <p style="margin: 5px 0 0; font-size: 28px; font-weight: bold; color: #7d2ae8;">${score}/${full}</p>
          </div>
          <div style="flex: 1; background: #f8fafc; padding: 20px; border-radius: 15px;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">เปอร์เซ็นต์</p>
            <p style="margin: 5px 0 0; font-size: 28px; font-weight: bold; color: #00c4cc;">${percent}%</p>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="margin: 0; font-size: 14px; color: #64748b;">ระดับผลการประเมิน</p>
          <div style="display: inline-block; padding: 10px 30px; background: #f1f5f9; border-radius: 30px; font-weight: bold; color: #475569; font-size: 18px; margin-top: 10px;">
            ${grade}
          </div>
        </div>

        <p style="font-size: 14px; color: #94a3b8; text-align: center;">หากคุณมีข้อสงสัยเพิ่มเติม สามารถติดต่อสอบถามได้ทันที</p>
      </div>
      <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; font-size: 12px; color: #94a3b8;">ส่งโดยระบบแจ้งเตือนอัตโนมัติจาก Coach Sarm</p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: toEmail,
    subject: subject,
    htmlBody: bodyHtml
  });
}

function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON);
}
