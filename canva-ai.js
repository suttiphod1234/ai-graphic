// --- Configuration ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3MFZ4dd9pAHu1qi3E4hh4TVLOG2tipwbuIkNvSIJuSI-Iw63bNupP0eaQDzjX22fqaA/exec'; 
const TIME_LIMIT_MINUTES = 15;

// --- Quiz Data ---
const quizQuestions = [
    {
        id: 1,
        question: "Canva คือแพลตฟอร์มประเภทใด?",
        options: [
            { id: "A", text: "โปรแกรมสำหรับเขียนโค้ดเว็บไซต์" },
            { id: "B", text: "แพลตฟอร์มการออกแบบกราฟิกออนไลน์ที่ใช้งานง่าย" },
            { id: "C", text: "โปรแกรมสำหรับคำนวณงบประมาณบัญชี" },
            { id: "D", text: "ระบบจัดการฐานข้อมูลขนาดใหญ่" }
        ],
        answer: "B",
        explanation: "เน้นการลากวางเพื่อให้ทุกคนออกแบบได้"
    },
    {
        id: 2,
        question: "หากต้องการหาเทมเพลตสำหรับ \"โพสต์ Facebook\" ควรไปที่เมนูใดเป็นอันดับแรก?",
        options: [
            { id: "A", text: "Elements (องค์ประกอบ)" },
            { id: "B", text: "Uploads (อัปโหลด)" },
            { id: "C", text: "Templates (แม่แบบ)" },
            { id: "D", text: "Projects (โปรเจกต์)" }
        ],
        answer: "C",
        explanation: "เป็นแหล่งรวมโครงร่างสำเร็จรูปตามขนาดที่ต้องการ"
    },
    {
        id: 3,
        question: "ฟีเจอร์ \"Brand Kit\" มีประโยชน์อย่างไร?",
        options: [
            { id: "A", text: "ใช้สำหรับซื้อโฆษณาใน Facebook" },
            { id: "B", text: "ใช้เก็บโลโก้ ชุดสี และแบบอักษรประจำแบรนด์เพื่อความต่อเนื่องในการออกแบบ" },
            { id: "C", text: "ใช้สำหรับแต่งรูปถ่ายส่วนตัวให้สวยงาม" },
            { id: "D", text: "ใช้สำหรับดาวน์โหลดวิดีโอจาก YouTube" }
        ],
        answer: "B",
        explanation: "รักษาเอกลักษณ์ของแบรนด์ให้สม่ำเสมอในทุกงานออกแบบ"
    },
    {
        id: 4,
        question: "การลบพื้นหลังของภาพ (Background Remover) สามารถทำได้โดยคลิกที่เมนูใดหลังจากเลือกรูปภาพ?",
        options: [
            { id: "A", text: "Edit Image -> BG Remover" },
            { id: "B", text: "Crop" },
            { id: "C", text: "Flip" },
            { id: "D", text: "Animate" }
        ],
        answer: "A",
        explanation: "เป็นเครื่องมือยอดนิยมในเวอร์ชัน Pro"
    },
    {
        id: 5,
        question: "ข้อใดคือวิธีการ \"Group\" (จัดกลุ่ม) องค์ประกอบหลายชิ้นเข้าด้วยกัน?",
        options: [
            { id: "A", text: "กด Ctrl + A" },
            { id: "B", text: "คลิกขวาแล้วเลือก \"Lock\"" },
            { id: "C", text: "คลุมองค์ประกอบที่ต้องการแล้วเลือก \"Group\" หรือกด Ctrl + G" },
            { id: "D", text: "ลบองค์ประกอบทั้งหมดแล้ววางใหม่" }
        ],
        answer: "C",
        explanation: "ช่วยให้เคลื่อนย้ายหรือปรับขนาดหลายชิ้นพร้อมกันได้"
    },
    {
        id: 6,
        question: "หากต้องการแชร์งานออกแบบให้เพื่อนร่วมงาน \"แก้ไขได้\" ควรตั้งค่าการแชร์อย่างไร?",
        options: [
            { id: "A", text: "Anyone with the link can view (ทุกคนที่มีลิงก์ดูได้)" },
            { id: "B", text: "Anyone with the link can edit (ทุกคนที่มีลิงก์แก้ไขได้)" },
            { id: "C", text: "Only you can access (เข้าถึงได้เฉพาะคุณ)" },
            { id: "D", text: "Download as PDF (ดาวน์โหลดเป็น PDF)" }
        ],
        answer: "B",
        explanation: "เพื่อให้คนอื่นสามารถเข้ามาปรับปรุงงานในไฟล์เดียวกันได้"
    },
    {
        id: 7,
        question: "\"Elements\" (องค์ประกอบ) ใน Canva ประกอบไปด้วยอะไรบ้าง?",
        options: [
            { id: "A", text: "ข้อความเพียงอย่างเดียว" },
            { id: "B", text: "รูปภาพ เส้น รูปทรง สติกเกอร์ และวิดีโอ" },
            { id: "C", text: "เฉพาะไฟล์ที่อัปโหลดจากคอมพิวเตอร์เท่านั้น" },
            { id: "D", text: "เฉพาะชุดสี (Color Palette)" }
        ],
        answer: "B",
        explanation: "เป็นศูนย์รวมทรัพยากรที่ใช้ตกแต่งงาน"
    },
    {
        id: 8,
        question: "เมื่อออกแบบเสร็จและต้องการไฟล์ภาพที่มีพื้นหลังโปร่งใส (Transparent Background) ควรดาวน์โหลดเป็นไฟล์ประเภทใด?",
        options: [
            { id: "A", text: "JPG" },
            { id: "B", text: "PDF Standard" },
            { id: "C", text: "PNG" },
            { id: "D", text: "MP4" }
        ],
        answer: "C",
        explanation: "PNG เป็นไฟล์ที่รองรับความโปร่งใสของพื้นหลัง"
    },
    {
        id: 9,
        question: "ฟีเจอร์ \"Magic Switch\" (หรือ Magic Resize) มีหน้าที่อะไร?",
        options: [
            { id: "A", text: "เปลี่ยนสีตัวอักษรโดยอัตโนมัติ" },
            { id: "B", text: "เปลี่ยนขนาดงานออกแบบจากขนาดหนึ่งไปเป็นอีกขนาดหนึ่ง (เช่น จาก IG Post เป็น A4)" },
            { id: "C", text: "ใช้ลบคนออกจากรูปภาพ" },
            { id: "D", text: "ใช้บันทึกงานโดยไม่ต้องกด Save" }
        ],
        answer: "B",
        explanation: "ช่วยให้ปรับขนาดงานให้เหมาะกับหลายแพลตฟอร์มได้รวดเร็ว"
    },
    {
        id: 10,
        question: "ข้อใดคือวิธีที่ถูกต้องในการนำรูปภาพจากคอมพิวเตอร์มาใช้ใน Canva?",
        options: [
            { id: "A", text: "พิมพ์ชื่อรูปในช่องค้นหา Elements" },
            { id: "B", text: "ไปที่เมนู Uploads แล้วเลือก Upload files" },
            { id: "C", text: "ใช้เครื่องมือ Text Box เขียนชื่อไฟล์" },
            { id: "D", text: "ไม่สามารถนำรูปจากภายนอกมาใช้ได้" }
        ],
        answer: "B",
        explanation: "สามารถใช้วิธีลากไฟล์มาวางในหน้าออกแบบได้เช่นกัน"
    }
];

// --- State Variables ---
let timerInterval;
let timeRemaining = TIME_LIMIT_MINUTES * 60;
let isSubmitted = false;
let userAnswers = {};

// --- DOM Elements ---
const DOM = {
    startBtn: document.getElementById('startBtn'),
    startSection: document.getElementById('startSection'),
    quizContainer: document.getElementById('quizContainer'),
    questionsList: document.getElementById('questionsList'),
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    comment: document.getElementById('comment'),
    timeDisplay: document.getElementById('timeDisplay'),
    timerBar: document.getElementById('timerBar'),
    quizForm: document.getElementById('quizForm'),
    progressBar: document.getElementById('progressBar'),
    progressText: document.getElementById('progressText'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMsg: document.getElementById('toastMsg'),
    
    // Result Modal
    resultModal: document.getElementById('resultModal'),
    resultModalContent: document.getElementById('resultModalContent'),
    resultName: document.getElementById('resultName'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    percentDisplay: document.getElementById('percentDisplay'),
    gradeBadge: document.getElementById('gradeBadge'),
    resultIcon: document.getElementById('resultIcon'),
    submitStatus: document.getElementById('submitStatus'),
    reviewBtn: document.getElementById('reviewBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    submitBtn: document.getElementById('submitBtn'),
};


// --- Initialization ---
function init() {
    renderQuestions();
    
    // Event Listeners
    DOM.startBtn.addEventListener('click', handleStart);
    DOM.quizForm.addEventListener('submit', handleSubmit);
    DOM.reviewBtn.addEventListener('click', handleReview);
    DOM.closeModalBtn.addEventListener('click', () => {
        DOM.resultModal.classList.add('hidden');
        DOM.resultModalContent.classList.remove('scale-100', 'opacity-100');
        DOM.resultModalContent.classList.add('scale-95', 'opacity-0');
    });

    // Option selection tracking
    DOM.questionsList.addEventListener('change', (e) => {
        if(e.target.type === 'radio') {
            const qId = e.target.name.split('_')[1];
            userAnswers[qId] = e.target.value;
            
            // Update progress
            updateProgress();

            // Remove error state if exists
            const qContainer = document.getElementById(`q_container_${qId}`);
            if(qContainer) {
                qContainer.classList.remove('question-error');
            }
        }
    });
}

function updateProgress() {
    const answeredCount = Object.keys(userAnswers).length;
    const totalCount = quizQuestions.length;
    const progress = (answeredCount / totalCount) * 100;
    
    if (DOM.progressBar) DOM.progressBar.style.width = `${progress}%`;
    if (DOM.progressText) DOM.progressText.innerText = `${Math.round(progress)}%`;
}

// --- Render Functions ---
function renderQuestions() {
    DOM.questionsList.innerHTML = '';
    
    quizQuestions.forEach((q, index) => {
        const qContainer = document.createElement('div');
        qContainer.id = `q_container_${q.id}`;
        qContainer.className = "bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 block-anim slide-up q-container transition-all duration-300";
        qContainer.style.animationDelay = `${(index * 0.1) + 0.3}s`;
        
        let optionsHtml = '';
        q.options.forEach(opt => {
            optionsHtml += `
                <label class="relative block mb-3 group">
                    <input type="radio" name="question_${q.id}" value="${opt.id}" class="radio-invisible">
                    <div class="option-card p-4 rounded-xl flex items-center">
                        <div class="option-icon w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center mr-4 text-slate-500 font-medium transition-colors">
                            ${opt.id}
                        </div>
                        <div class="text-slate-700 font-medium">
                            ${opt.text}
                        </div>
                    </div>
                </label>
            `;
        });

        qContainer.innerHTML = `
            <div class="flex items-start mb-6">
                <div class="bg-purple-100 text-purple-700 font-bold w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    ${index + 1}
                </div>
                <h3 class="text-lg font-semibold text-slate-800 pt-1">
                    ${q.question}
                </h3>
            </div>
            <div class="space-y-2 ml-0 md:ml-14">
                ${optionsHtml}
            </div>
        `;
        
        DOM.questionsList.appendChild(qContainer);
    });
}

// --- Logic Functions ---

function handleStart() {
    // Validate Required Info
    if (!DOM.fullName.value.trim() || !DOM.email.value.trim()) {
        showToast("กรุณากรอกชื่อและอีเมลก่อนเริ่มทำแบบทดสอบ");
        
        if (!DOM.fullName.value.trim()) DOM.fullName.focus();
        else if (!DOM.email.value.trim()) DOM.email.focus();
        
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(DOM.email.value.trim())) {
        showToast("กรุณากรอกอีเมลให้ถูกต้อง");
        DOM.email.focus();
        return;
    }

    // UI Updates
    DOM.startSection.classList.add('hidden');
    
    // Disable inputs
    [DOM.fullName, DOM.email, DOM.comment].forEach(el => {
        el.setAttribute('disabled', 'true');
        el.classList.add('bg-slate-100', 'text-slate-500', 'border-slate-200');
    });
    
    DOM.quizContainer.classList.remove('hidden');
    DOM.quizContainer.classList.add('block-anim', 'slide-up');
    
    // Start Timer
    startTimer();
}

function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        
        if (timeRemaining <= 60 && timeRemaining > 0) {
            DOM.timerBar.classList.add('timer-warning');
        }
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timeRemaining = 0;
            updateTimerDisplay();
            
            showToast("หมดเวลา! ระบบกำลังส่งคำตอบของคุณ");
            
            setTimeout(() => {
                DOM.quizForm.dispatchEvent(new Event('submit'));
            }, 1000);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    DOM.timeDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showToast(message) {
    DOM.toastMsg.innerText = message;
    DOM.toast.classList.remove('translate-x-full', 'opacity-0');
    
    setTimeout(() => {
        DOM.toast.classList.add('translate-x-full', 'opacity-0');
    }, 3000);
}

function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitted) return;

    if (timeRemaining > 0) {
        let allAnswered = true;
        let firstMissed = null;

        quizQuestions.forEach(q => {
            if (!userAnswers[q.id]) {
                allAnswered = false;
                const qContainer = document.getElementById(`q_container_${q.id}`);
                qContainer.classList.add('question-error');
                if (!firstMissed) firstMissed = qContainer;
            }
        });

        if (!allAnswered) {
            showToast("กรุณาตอบคำถามให้ครบทุกข้อ (ข้อที่ไฮไลต์สีแดง)");
            firstMissed.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }

    isSubmitted = true;
    clearInterval(timerInterval);
    
    const btnSpan = DOM.submitBtn.querySelector('span');
    const btnIcon = DOM.submitBtn.querySelector('i');
    btnSpan.innerText = 'กำลังประมวลผล...';
    btnIcon.className = 'loader ml-2';
    DOM.submitBtn.disabled = true;
    DOM.submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    calculateScore();
}

function calculateScore() {
    let score = 0;
    let itemAnalysis = {};
    
    quizQuestions.forEach(q => {
        const isCorrect = userAnswers[q.id] === q.answer;
        if (isCorrect) {
            score++;
        }
        
        itemAnalysis[`q${q.id}_ans`] = userAnswers[q.id] || "ไม่ตอบ";
        itemAnalysis[`q${q.id}_correct`] = isCorrect;
    });

    const percent = (score / quizQuestions.length) * 100;
    let grade = "";
    let gradeClass = "";
    let iconHtml = "";

    if (score >= 8) {
        grade = "ยอดเยี่ยม";
        gradeClass = "bg-green-100 text-green-700";
        iconHtml = '<i class="bi bi-star-fill text-yellow-400"></i>';
    } else if (score >= 5) {
        grade = "ผ่านการทดสอบ";
        gradeClass = "bg-yellow-100 text-yellow-700";
        iconHtml = '<i class="bi bi-emoji-smile-fill text-yellow-500"></i>';
    } else {
        grade = "ควรกลับไปทบทวน";
        gradeClass = "bg-red-100 text-red-700";
        iconHtml = '<i class="bi bi-emoji-frown-fill text-slate-400"></i>';
    }

    // Update UI
    DOM.resultName.innerText = `คุณ ${DOM.fullName.value.trim()}`;
    
    animateNumber(DOM.scoreDisplay, 0, score, 1000);
    animateNumber(DOM.percentDisplay, 0, percent, 1000);
    
    DOM.gradeBadge.innerText = grade;
    DOM.gradeBadge.className = `inline-block px-6 py-2 rounded-full font-bold text-lg ${gradeClass}`;
    DOM.resultIcon.innerHTML = iconHtml;

    // Send data to Sheet
    const payload = {
        sheetName: "canva-ai",
        timestamp: new Date().toLocaleString('th-TH'),
        fullName: DOM.fullName.value.trim(),
        email: DOM.email.value.trim(),
        comment: DOM.comment.value.trim(),
        score: score,
        fullScore: quizQuestions.length,
        percent: percent,
        grade: grade,
        ...itemAnalysis
    };

    sendToGoogleSheet(payload);
    
    // Show Modal
    setTimeout(() => {
        DOM.resultModal.classList.remove('hidden');
        setTimeout(() => {
            DOM.resultModalContent.classList.remove('scale-95', 'opacity-0');
            DOM.resultModalContent.classList.add('scale-100', 'opacity-100');
        }, 50);
    }, 500);
}

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.innerHTML = end;
        }
    };
    window.requestAnimationFrame(step);
}

function sendToGoogleSheet(data) {
    DOM.submitStatus.classList.remove('hidden');
    DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-blue-50 text-blue-600 border border-blue-200";
    DOM.submitStatus.innerHTML = '<i class="loader mr-2 border-blue-600 border-t-blue-200 !w-4 !h-4"></i> กำลังบันทึกข้อมูลและส่งอีเมล...';

    if(GOOGLE_SCRIPT_URL.includes('Placeholder')) {
        setTimeout(() => {
            DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-yellow-50 text-yellow-700 border border-yellow-200";
            DOM.submitStatus.innerHTML = '<i class="bi bi-exclamation-triangle-fill mr-1"></i> กรุณาเชื่อมต่อ Google Apps Script เพื่อส่งอีเมลและบันทึกข้อมูล';
        }, 1500);
        return;
    }

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    })
    .then(() => {
        DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200";
        DOM.submitStatus.innerHTML = '<i class="bi bi-check-circle-fill mr-1"></i> บันทึกข้อมูลและส่งอีเมลเรียบร้อยแล้ว';
    })
    .catch(error => {
        console.error('Error:', error);
        DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200";
        DOM.submitStatus.innerHTML = '<i class="bi bi-x-circle-fill mr-1"></i> เกิดข้อผิดพลาดในการเชื่อมต่อ';
    });
}

function handleReview() {
    DOM.resultModal.classList.add('hidden');
    DOM.resultModalContent.classList.remove('scale-100', 'opacity-100');
    DOM.resultModalContent.classList.add('scale-95', 'opacity-0');
    
    DOM.quizContainer.classList.add('review-mode');
    DOM.submitBtn.parentElement.classList.add('hidden');
    DOM.timerBar.classList.add('hidden');
    
    quizQuestions.forEach(q => {
        const userAns = userAnswers[q.id];
        const correctAns = q.answer;
        
        const qContainer = document.getElementById(`q_container_${q.id}`);
        if (userAns === correctAns) {
            qContainer.classList.add('border-l-4', 'border-l-green-500');
        } else {
            qContainer.classList.add('border-l-4', 'border-l-red-500');
            
            const explanation = document.createElement('div');
            explanation.className = "mt-4 ml-0 md:ml-14 p-3 bg-green-50 rounded-xl border border-green-100 text-green-800 text-sm flex items-start";
            explanation.innerHTML = `<div><i class="bi bi-check-circle-fill mr-2 mt-0.5"></i> คำตอบที่ถูกต้องคือ: <strong>${correctAns}. ${q.options.find(o => o.id === correctAns).text}</strong><br><span class="text-xs opacity-80 ml-6">${q.explanation || ''}</span></div>`;
            qContainer.appendChild(explanation);
        }
        
        const inputs = qContainer.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.disabled = true;
            const labelContent = input.nextElementSibling;
            
            if (input.value === correctAns) {
                labelContent.classList.add('review-correct');
            } else if (input.value === userAns && userAns !== correctAns) {
                labelContent.classList.add('review-wrong');
            }
        });
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Start App
document.addEventListener('DOMContentLoaded', init);
