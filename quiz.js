document.addEventListener("DOMContentLoaded", () => {
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
      choices: ["<link>", "<a>", "<href>", "<src>"],
      correct: 1
    }
  ];

  const questionText = document.getElementById("question-text");
  const answersDiv = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const currentEl = document.getElementById("current");
  const totalEl = document.getElementById("total");
  const questionCard = document.getElementById("question-card");

  if (!questionText || !answersDiv || !nextBtn || !currentEl || !totalEl || !questionCard) {
    console.error("Required quiz DOM elements missing.");
    return;
  }

  let currentIndex = 0;
  let score = 0;
  let answered = false;

  function initQuiz() {
    currentIndex = 0;
    score = 0;
    totalEl.textContent = String(QUESTIONS.length);
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUESTIONS[currentIndex];
    currentEl.textContent = String(currentIndex + 1);
    questionText.textContent = q.question;
    answersDiv.innerHTML = "";
    nextBtn.disabled = true;
    answered = false;

    q.choices.forEach((choice, idx) => {
      const btn = document.createElement("button");
      btn.className = "answer-btn";
      btn.type = "button";
      btn.dataset.index = String(idx);
      btn.textContent = choice;
      btn.setAttribute("aria-pressed", "false");

      btn.addEventListener("click", () => handleAnswerClick(btn, idx, q.correct));
      answersDiv.appendChild(btn);
    });
  }

  function handleAnswerClick(btn, idx, correctIdx) {
    if (answered) return;
    answered = true;
    btn.setAttribute("aria-pressed", "true");

    if (idx === correctIdx) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("wrong");
      const correctBtn = Array.from(answersDiv.children).find(
        (c) => Number(c.dataset.index) === correctIdx
      );
      if (correctBtn) correctBtn.classList.add("correct");
    }

    nextBtn.disabled = false;
  }

  function concludeQuiz() {
    try {
      sessionStorage.setItem("quizScore", String(score));
      sessionStorage.setItem("quizTotal", String(QUESTIONS.length));
      window.location.href = "results.html";
    } catch (err) {
      console.warn("sessionStorage blocked — redirecting home.", err);
      window.location.href = "index.html";
    }
  }

  function goNext() {
    if (!answered) return;
    currentIndex++;
    if (currentIndex >= QUESTIONS.length) {
      concludeQuiz();
    } else {
      renderQuestion();
      questionCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

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

  nextBtn.addEventListener("click", goNext);

  initQuiz();
});
