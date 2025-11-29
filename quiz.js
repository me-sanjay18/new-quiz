// quiz.js
// Minimal behaviour: load questions one-by-one, show MCQ, detect clicks, move next, end -> go home.

// --- SAMPLE QUESTIONS ---


const QUESTIONS = [
  {
    id: 1,
    question: "Which language runs in a web browser?",
    choices: ["Python", "JavaScript", "C++", "Java"],
    correct: 1
  },
  {
    id: 2,
    question: "What does HTML stand for?",
    choices: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Machine Language",
      "Hyperlink Text Markup Language"
    ],
    correct: 1
  },
  {
    id: 3,
    question: "Which operator is used for assignment in JavaScript?",
    choices: ["==", "=", "===", "=>"],
    correct: 1
  },
  {
    id: 4,
    question: "Which tag is used to create a link in HTML?",
    choices: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;src&gt;"],
    correct: 1
  }
];

// DOM refs
const questionText = document.getElementById("question-text");
const answersDiv = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const currentEl = document.getElementById("current");
const totalEl = document.getElementById("total");

const questionCard = document.getElementById("question-card");

let currentIndex = 0;
let answered = false;

// init
function initQuiz() {
  currentIndex = 0;
  totalEl.textContent = QUESTIONS.length;
  renderQuestion();
}

// render question
function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  currentEl.textContent = currentIndex + 1;
  questionText.textContent = q.question;
  answersDiv.innerHTML = "";
  nextBtn.disabled = true;
  answered = false;

  q.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.type = "button";
    btn.dataset.index = idx;
    btn.innerHTML = choice;
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", () => handleAnswerClick(btn, idx, q.correct));
    answersDiv.appendChild(btn);
  });
}

// handle answer click
function handleAnswerClick(btn, idx, correctIdx) {
  if (answered) return;
  answered = true;
  btn.setAttribute("aria-pressed", "true");

  if (idx === correctIdx) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    // highlight correct button
    const correctBtn = Array.from(answersDiv.children).find(
      (c) => Number(c.dataset.index) === correctIdx
    );
    if (correctBtn) correctBtn.classList.add("correct");
  }

  nextBtn.disabled = false;
}

// move to next or conclude
function goNext() {
  if (!answered) return; // require answer before next
  currentIndex++;
  if (currentIndex >= QUESTIONS.length) {
    // Quiz concluded — go back to home (no score shown)
    window.location.href = "index.html";
  } else {
    renderQuestion();
    questionCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// keyboard helper: number keys select, Enter -> next
document.addEventListener("keydown", (e) => {
  if (!questionCard.classList.contains("hidden") && !answered) {
    if (/^[1-9]$/.test(e.key)) {
      const idx = Number(e.key) - 1;
      const button = answersDiv.children[idx];
      if (button) button.click();
    }
  }
  if (e.key === "Enter" && !nextBtn.disabled) {
    nextBtn.click();
  }
});

// listeners
nextBtn.addEventListener("click", goNext);

// start
initQuiz();
