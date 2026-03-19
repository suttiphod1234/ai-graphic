// --- Configuration ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnb8C54VOg0XVi8dJPEpyPmZ2iUl9Ze4SZt13CuoHK_pT8REYwnU9AlWT5-WWQVCBm/exec'; 
const TIME_LIMIT_MINUTES = 15;

// --- Quiz Data ---
const quizQuestions = [
    {
        id: 1,
        question: "ลิขสิทธิ์ (Copyright) คุ้มครองสิ่งใด",
        options: [
            { id: "A", text: "ไอเดีย" },
            { id: "B", text: "ความคิด" },
            { id: "C", text: "ผลงานที่สร้างขึ้น" },
            { id: "D", text: "ข้อมูลทั่วไป" }
        ],
        answer: "C"
    },
    {
        id: 2,
        question: "ข้อใด “ไม่ใช่” การละเมิดลิขสิทธิ์",
        options: [
            { id: "A", text: "คัดลอกภาพผู้อื่นไปใช้" },
            { id: "B", text: "ใช้ภาพโดยไม่ได้รับอนุญาต" },
            { id: "C", text: "ใช้ภาพที่สร้างเอง" },
            { id: "D", text: "นำภาพไปขายโดยไม่ได้สิทธิ์" }
        ],
        answer: "C"
    },
    {
        id: 3,
        question: "การนำภาพจากอินเทอร์เน็ตมาใช้ในโฆษณาโดยไม่ขออนุญาต ถือว่า",
        options: [
            { id: "A", text: "ถูกต้อง" },
            { id: "B", text: "ไม่ผิด" },
            { id: "C", text: "ผิดกฎหมาย" },
            { id: "D", text: "ขึ้นอยู่กับขนาดภาพ" }
        ],
        answer: "C"
    },
    {
        id: 4,
        question: "PDPA เกี่ยวข้องกับข้อใดมากที่สุด",
        options: [
            { id: "A", text: "สีของภาพ" },
            { id: "B", text: "ข้อมูลส่วนบุคคล" },
            { id: "C", text: "ความละเอียดภาพ" },
            { id: "D", text: "โปรแกรมที่ใช้" }
        ],
        answer: "B"
    },
    {
        id: 5,
        question: "ข้อใดเป็นตัวอย่างการละเมิด PDPA",
        options: [
            { id: "A", text: "ใช้ภาพวิวธรรมชาติ" },
            { id: "B", text: "ใช้ภาพที่สร้างเอง" },
            { id: "C", text: "ใช้ภาพบุคคลโดยไม่ได้รับอนุญาต" },
            { id: "D", text: "ใช้ภาพการ์ตูน" }
        ],
        answer: "C"
    },
    {
        id: 6,
        question: "การใช้โลโก้แบรนด์ดังโดยไม่ได้รับอนุญาตเกี่ยวข้องกับกฎหมายใด",
        options: [
            { id: "A", text: "ลิขสิทธิ์" },
            { id: "B", text: "PDPA" },
            { id: "C", text: "เครื่องหมายการค้า" },
            { id: "D", text: "ภาษี" }
        ],
        answer: "C"
    },
    {
        id: 7,
        question: "ข้อใดเป็นแนวทาง “จริยธรรม” ที่ถูกต้อง",
        options: [
            { id: "A", text: "คัดลอกผลงานเพื่อความรวดเร็ว" },
            { id: "B", text: "ไม่ต้องให้เครดิต" },
            { id: "C", text: "ใช้ผลงานคนอื่นโดยไม่แจ้ง" },
            { id: "D", text: "ให้เครดิตเจ้าของผลงาน" }
        ],
        answer: "D"
    },
    {
        id: 8,
        question: "การใช้ AI สร้างภาพโดยเลียนแบบศิลปินโดยตรง อาจมีความเสี่ยงด้านใด",
        options: [
            { id: "A", text: "ไม่มีความเสี่ยง" },
            { id: "B", text: "ความสวยงาม" },
            { id: "C", text: "จริยธรรมและลิขสิทธิ์" },
            { id: "D", text: "ขนาดไฟล์" }
        ],
        answer: "C"
    },
    {
        id: 9,
        question: "ข้อใดเป็นแนวปฏิบัติที่ “เหมาะสม” ในการใช้ AI",
        options: [
            { id: "A", text: "ใช้ภาพโดยไม่ตรวจสอบ" },
            { id: "B", text: "คัดลอกผลงานผู้อื่น" },
            { id: "C", text: "ตรวจสอบสิทธิ์ก่อนใช้งาน" },
            { id: "D", text: "ใช้งานทันทีโดยไม่สนใจ" }
        ],
        answer: "C"
    },
    {
        id: 10,
        question: "ข้อใดเป็น “จริยธรรมในการใช้ AI”",
        options: [
            { id: "A", text: "ใช้เพื่อหลอกลวง" },
            { id: "B", text: "ใช้เพื่อคัดลอก" },
            { id: "C", text: "ใช้อย่างรับผิดชอบ" },
            { id: "D", text: "ใช้เพื่อเลียนแบบ" }
        ],
        answer: "C"
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
    phoneNumber: document.getElementById('phoneNumber'),
    age: document.getElementById('age'),
    education: document.getElementById('education'),
    timeDisplay: document.getElementById('timeDisplay'),
    timerBar: document.getElementById('timerBar'),
    quizForm: document.getElementById('quizForm'),
    
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
            
            // Remove error state if exists
            const qContainer = document.getElementById(`q_container_${qId}`);
            if(qContainer) {
                qContainer.classList.remove('question-error');
            }
        }
    });
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
                <div class="bg-blue-100 text-blue-700 font-bold w-10 h-10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
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
    if (!DOM.fullName.value.trim() || !DOM.phoneNumber.value.trim() || !DOM.age.value.trim() || !DOM.education.value) {
        showToast("กรุณากรอกข้อมูลส่วนตัวให้ครบถ้วนก่อนเริ่มทำแบบทดสอบ");
        
        // Focus on first empty field
        if (!DOM.fullName.value.trim()) DOM.fullName.focus();
        else if (!DOM.phoneNumber.value.trim()) DOM.phoneNumber.focus();
        else if (!DOM.age.value.trim()) DOM.age.focus();
        else if (!DOM.education.value) DOM.education.focus();
        
        return;
    }

    // UI Updates
    DOM.startSection.classList.add('hidden');
    
    // Disable inputs
    [DOM.fullName, DOM.phoneNumber, DOM.age, DOM.education].forEach(el => {
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
            // Warning style at 1 min
            DOM.timerBar.classList.add('timer-warning');
        }
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timeRemaining = 0;
            updateTimerDisplay();
            
            showToast("หมดเวลา! ระบบกำลังส่งคำตอบของคุณ");
            
            // Auto submit
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

    // Validation (only if time isn't up)
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

    // Process Submission
    isSubmitted = true;
    clearInterval(timerInterval);
    
    // Change Button State
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

    if (score >= 9) {
        grade = "ดีมาก";
        gradeClass = "bg-green-100 text-green-700";
        iconHtml = '<i class="bi bi-star-fill text-yellow-400"></i>';
    } else if (score >= 7) {
        grade = "ดี";
        gradeClass = "bg-blue-100 text-blue-700";
        iconHtml = '<i class="bi bi-hand-thumbs-up-fill text-blue-500"></i>';
    } else if (score >= 5) {
        grade = "พอใช้";
        gradeClass = "bg-yellow-100 text-yellow-700";
        iconHtml = '<i class="bi bi-emoji-smile-fill text-yellow-500"></i>';
    } else {
        grade = "ต้องปรับปรุง";
        gradeClass = "bg-red-100 text-red-700";
        iconHtml = '<i class="bi bi-emoji-frown-fill text-slate-400"></i>';
    }

    // Update UI
    DOM.resultName.innerText = `คุณ ${DOM.fullName.value.trim()}`;
    
    // Animate numbers
    animateNumber(DOM.scoreDisplay, 0, score, 1000);
    animateNumber(DOM.percentDisplay, 0, percent, 1000);
    
    DOM.gradeBadge.innerText = grade;
    DOM.gradeBadge.className = `inline-block px-6 py-2 rounded-full font-bold text-lg ${gradeClass}`;
    DOM.resultIcon.innerHTML = iconHtml;

    // Send data to Sheet
    const payload = {
        sheetName: "law",
        timestamp: new Date().toISOString(),
        fullName: DOM.fullName.value.trim(),
        phoneNumber: DOM.phoneNumber.value.trim(),
        age: DOM.age.value.trim(),
        education: DOM.education.value,
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
        // small delay to allow display:block to apply before animation
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
            element.innerHTML = end; // Ensure exact final value
        }
    };
    window.requestAnimationFrame(step);
}

function sendToGoogleSheet(data) {
    DOM.submitStatus.classList.remove('hidden');
    DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-blue-50 text-blue-600 border border-blue-200";
    DOM.submitStatus.innerHTML = '<i class="loader mr-2 border-blue-600 border-t-blue-200 !w-4 !h-4"></i> กำลังบันทึกข้อมูล...';

    if(GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
        setTimeout(() => {
            DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-yellow-50 text-yellow-700 border border-yellow-200";
            DOM.submitStatus.innerHTML = '<i class="bi bi-exclamation-triangle-fill mr-1"></i> โหมดตัวอย่าง: ยังไม่ได้เชื่อมต่อกับ Google Sheets';
            
            // Revert button text for preview mode
            const btnSpan = DOM.submitBtn.querySelector('span');
            btnSpan.innerText = 'ส่งคำตอบแล้ว';
            const btnIcon = DOM.submitBtn.querySelector('i');
            btnIcon.className = 'bi bi-check-circle-fill ml-2';
        }, 1500);
        return;
    }

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important required for GS
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data)
    })
    .then(response => {
        DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200";
        DOM.submitStatus.innerHTML = '<i class="bi bi-check-circle-fill mr-1"></i> บันทึกข้อมูลสำเร็จ';
        console.log("Success:", response);
    })
    .catch(error => {
        console.error('Error:', error);
        DOM.submitStatus.className = "mb-6 p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200";
        DOM.submitStatus.innerHTML = '<i class="bi bi-x-circle-fill mr-1"></i> มีปัญหาในการบันทึกข้อมูล (ข้อมูลอาจบันทึกแล้ว)';
    });
}

function handleReview() {
    // Hide modal
    DOM.resultModal.classList.add('hidden');
    DOM.resultModalContent.classList.remove('scale-100', 'opacity-100');
    DOM.resultModalContent.classList.add('scale-95', 'opacity-0');
    
    // Set UI to review mode
    DOM.quizContainer.classList.add('review-mode');
    DOM.submitBtn.parentElement.classList.add('hidden');
    DOM.timerBar.classList.add('hidden');
    
    // Highlight correct & wrong answers
    quizQuestions.forEach(q => {
        const userAns = userAnswers[q.id];
        const correctAns = q.answer;
        
        const qContainer = document.getElementById(`q_container_${q.id}`);
        // Visual indicator on container
        if (userAns === correctAns) {
            qContainer.classList.add('border-l-4', 'border-l-green-500');
        } else {
            qContainer.classList.add('border-l-4', 'border-l-red-500');
            // Adding correct answer text below
            const correctText = q.options.find(o => o.id === correctAns).text;
            const explanation = document.createElement('div');
            explanation.className = "mt-4 ml-0 md:ml-14 p-3 bg-green-50 rounded-xl border border-green-100 text-green-800 text-sm flex items-start";
            explanation.innerHTML = `<i class="bi bi-check-circle-fill mr-2 mt-0.5"></i> คำตอบที่ถูกต้องคือ: <strong>${correctAns}. ${correctText}</strong>`;
            qContainer.appendChild(explanation);
        }
        
        // Disable inputs
        const inputs = qContainer.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.disabled = true;
            const labelContent = input.nextElementSibling;
            
            if (input.value === correctAns) {
                // Must be marked as correct
                labelContent.classList.add('review-correct');
            } else if (input.value === userAns && userAns !== correctAns) {
                // User picked this, but it's wrong
                labelContent.classList.add('review-wrong');
            }
        });
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Start App
document.addEventListener('DOMContentLoaded', init);
