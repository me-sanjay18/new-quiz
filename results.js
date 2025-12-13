document.addEventListener("DOMContentLoaded", () => {
    const resultsMsg = document.getElementById("results-msg");
    const restartBtn = document.getElementById("restart-btn");
    const homeBtn = document.getElementById("home-btn");
  
    if (!resultsMsg || !restartBtn || !homeBtn) {
      console.error("Results DOM missing.");
      return;
    }
  
    const rawScore = sessionStorage.getItem("quizScore");
    const rawTotal = sessionStorage.getItem("quizTotal");
  
    if (rawScore === null || rawTotal === null) {
      resultsMsg.textContent = "No result found — redirecting to home...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 900);
      return;
    }
  
    const score = Number(rawScore);
    const total = Number(rawTotal);
  
    if (Number.isNaN(score) || Number.isNaN(total)) {
      resultsMsg.textContent = "Result data corrupted. Redirecting to home...";
      setTimeout(() => (window.location.href = "index.html"), 900);
      return;
    }
  
    resultsMsg.textContent = `You got ${score} out of ${total} correct!`;
  
    restartBtn.addEventListener("click", () => {
      sessionStorage.removeItem("quizScore");
      sessionStorage.removeItem("quizTotal");
      window.location.href = "quiz.html";
    });
  
    homeBtn.addEventListener("click", () => {
      sessionStorage.removeItem("quizScore");
      sessionStorage.removeItem("quizTotal");
      window.location.href = "index.html";
    });
  });
  