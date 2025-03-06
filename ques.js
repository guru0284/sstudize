/*******************************
 *  Login & Signup Functionality
 *******************************/
function showSignup() {
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("signup-container").classList.remove("hidden");
  // Hide header and footer
  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";
  // Hide main content sections
  document.getElementById("main-website").classList.add("hidden");
  document.getElementById("task-page").classList.add("hidden");
  document.getElementById("insights-page").classList.add("hidden");
}

function showLogin() {
  document.getElementById("signup-container").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  // Hide header and footer
  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";
  // Hide main content sections
  document.getElementById("main-website").classList.add("hidden");
  document.getElementById("task-page").classList.add("hidden");
  document.getElementById("insights-page").classList.add("hidden");
}

function signup() {
  let email = document.getElementById("signup-email").value;
  let password = document.getElementById("signup-password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  alert("Signup successful! Please login.");
  showLogin();
}

function login() {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;
  let storedEmail = localStorage.getItem("userEmail");
  let storedPassword = localStorage.getItem("userPassword");
  if (email === storedEmail && password === storedPassword) {
    alert("Login successful!");
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("signup-container").classList.add("hidden");
    // Show header and footer after login
    document.querySelector("header").style.display = "flex";
    document.querySelector("footer").style.display = "block";
    loadHomePage(); // Load the home page after login
  } else {
    alert("Wrong credentials!");
  }
}

function logout() {
  // Clear localStorage
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");
  // Hide main content and show login
  document.getElementById("main-website").classList.add("hidden");
  document.getElementById("task-page").classList.add("hidden");
  document.getElementById("insights-page").classList.add("hidden");
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("signup-container").classList.add("hidden");
  // Hide header and footer
  document.querySelector("header").style.display = "none";
  document.querySelector("footer").style.display = "none";
  showLogin(); // Redirect to login page
}

/*******************************
 *        Page Navigation
 *******************************/
function loadHomePage() {
  hideAllPages();
  document.getElementById("main-website").classList.remove("hidden");
}

function loadTaskPage() {
  hideAllPages();
  document.getElementById("task-page").classList.remove("hidden");
  startQuiz(); // Start the quiz when the task page is loaded
}

function loadInsightsPage() {
  hideAllPages();
  document.getElementById("insights-page").classList.remove("hidden");
  // Removed the redundant call to displayInsights() to prevent overwriting correct parameters.
}

function hideAllPages() {
  document.getElementById("main-website").classList.add("hidden");
  document.getElementById("task-page").classList.add("hidden");
  document.getElementById("insights-page").classList.add("hidden");
}

/*******************************
 *      Quiz Functionality
 *******************************/
let questions = [
  {
    type: "multiple-choice",
    question:
      "A body is moving with uniform acceleration. If its velocity increases from 10 m/s to 20 m/s in 4 seconds, what is its acceleration?",
    options: ["2.5 m/s²", "5 m/s²", "7.5 m/s²", "10 m/s²"],
    answer: "2.5 m/s²",
  },
  {
    type: "multiple-choice",
    question: "Which of the following elements has the highest electronegativity?",
    options: ["Sodium (Na)", "Chlorine (Cl)", "Potassium (K)", "Fluorine (F)"],
    answer: "Fluorine (F)",
  },
  {
    type: "multiple-choice",
    question: "What is the derivative of f(x) = x³ + 2x² - 5x + 1?",
    options: ["3x² + 4x - 5", "x² + 4x - 5", "3x² + 2x - 5", "x³ + 2x² - 5"],
    answer: "3x² + 4x - 5",
  },
  {
    type: "short-answer",
    question: "Explain the concept of conservation of energy with an example.",
  },
  {
    type: "short-answer",
    question: "Describe the difference between ionic and covalent bonds.",
  },
  {
    type: "scale",
    question: "How often do you create a study schedule?",
    options: ["1 - Never", "2", "3", "4", "5 - Always"],
  },
  {
    type: "scale",
    question: "How well do you stick to your study schedule?",
    options: ["1 - Not at all", "2", "3", "4", "5 - Very well"],
  },
  {
    type: "multiple-choice",
    question: "Which of the following best describes your study environment?",
    options: [
      "Quiet and free from distractions",
      "Somewhat noisy but manageable",
      "Very noisy and distracting",
      "I study wherever I can find the time",
    ],
  },
  {
    type: "short-answer",
    question: "Describe a typical study day. How do you allocate time to different subjects?",
  },
  {
    type: "scenario",
    question:
      "You are stuck on a difficult problem and have spent a lot of time on it. What do you do?",
    options: [
      "Keep trying until you solve it, no matter how long it takes.",
      "Ask a friend or teacher for help immediately.",
      "Take a break and come back to it later.",
      "Look up the solution online.",
    ],
  },
  {
    type: "short-answer",
    question: "Describe your approach to solving a complex Physics problem. What steps do you take?",
  },
  {
    type: "multiple-choice",
    question: "When faced with a challenging problem, do you:",
    options: [
      "Break it down into smaller parts?",
      "Try to find a similar solved problem?",
      "Give up easily?",
      "Seek help from others?",
    ],
  },
  {
    type: "scale",
    question: "How stressed do you feel about the JEE exam?",
    options: ["1 - Not at all", "2", "3", "4", "5 - Extremely stressed"],
  },
  {
    type: "multiple-choice",
    question: "How do you typically cope with exam-related stress?",
    options: [
      "Exercise",
      "Meditation/Relaxation techniques",
      "Spending time with friends/family",
      "Watching movies/TV shows",
      "I don't cope well with stress.",
    ],
  },
  {
    type: "short-answer",
    question: "What strategies do you use to maintain a positive attitude during your JEE preparation?",
  },
  {
    type: "yes-no",
    question: "Do you get enough sleep on most nights?",
  },
  {
    type: "yes-no",
    question: "Do you take regular breaks during your study sessions?",
  },
  {
    type: "multiple-choice",
    question: "Which of the following resources do you use for JEE preparation? (Select all that apply)",
    options: [
      "Textbooks",
      "Coaching classes",
      "Online resources (e.g., Khan Academy, YouTube)",
      "Practice papers",
      "Previous years' question papers",
    ],
  },
  {
    type: "scale",
    question: "How helpful do you find your coaching classes?",
    options: ["1 - Not at all", "2", "3", "4", "5 - Extremely helpful"],
  },
  {
    type: "short-answer",
    question: "Describe your preferred study techniques. What works best for you?",
  },
  {
    type: "multiple-choice",
    question: "What time of day do you study best?",
    options: ["Morning", "Afternoon", "Evening", "Night"],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 600; // 10 minutes in seconds
let timerInterval;
let correctAnswers = 0;
let incorrectAnswers = 0;
let startTime;
let chart; // Chart instance
let responses = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 600;
  correctAnswers = 0;
  incorrectAnswers = 0;
  startTime = new Date().getTime(); // Start time
  responses = [];
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  if (currentQuestionIndex < questions.length) {
    let question = questions[currentQuestionIndex];
    let questionHTML = `<p>${question.question}</p>`;

    switch (question.type) {
      case "multiple-choice":
      case "scale":
      case "scenario":
        questionHTML += question.options
          .map(
            (option, index) => `
              <div>
                  <input type="radio" id="option-${index}" name="answer" value="${option}">
                  <label for="option-${index}">${option}</label>
              </div>
            `
          )
          .join("");
        break;
      case "short-answer":
        questionHTML += `<textarea id="answer-${currentQuestionIndex}" rows="4" cols="50"></textarea>`;
        break;
      case "yes-no":
        questionHTML += `
          <div>
              <input type="radio" id="yes" name="answer" value="Yes">
              <label for="yes">Yes</label>
          </div>
          <div>
              <input type="radio" id="no" name="answer" value="No">
              <label for="no">No</label>
          </div>
        `;
        break;
    }

    // Add "Next" and "Skip" buttons
    questionHTML += `<button onclick="nextQuestion()">Next</button>`;
    questionHTML += `<button onclick="skipQuestion()">Skip</button>`;

    questionContainer.innerHTML = questionHTML;
  } else {
    endQuiz();
  }
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    let selectedAnswer = null;
    const currentQuestion = questions[currentQuestionIndex];

    if (
      currentQuestion.type === "multiple-choice" ||
      currentQuestion.type === "scale" ||
      currentQuestion.type === "yes-no" ||
      currentQuestion.type === "scenario"
    ) {
      const radioButtons = document.querySelectorAll('input[name="answer"]');
      radioButtons.forEach((button) => {
        if (button.checked) {
          selectedAnswer = button.value;
        }
      });
      if (selectedAnswer === null) {
        alert("Please select an answer.");
        return;
      }
    } else if (currentQuestion.type === "short-answer") {
      const answerElement = document.getElementById(`answer-${currentQuestionIndex}`);
      selectedAnswer = answerElement ? answerElement.value : "";
    }

    responses[currentQuestionIndex] = selectedAnswer;
    checkAnswer(selectedAnswer);
    currentQuestionIndex++;
    loadQuestion();
  } else {
    endQuiz();
  }
}

function skipQuestion() {
  responses[currentQuestionIndex] = null;
  currentQuestionIndex++;
  loadQuestion();
}

function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];
  // Only multiple-choice questions have a correct 'answer' in the data
  if (currentQuestion.type === "multiple-choice" && currentQuestion.answer) {
    if (selectedAnswer === currentQuestion.answer) {
      score++;
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }
  }
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById("timer").innerText = `Time: ${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

async function endQuiz() {
  clearInterval(timerInterval);
  let endTime = new Date().getTime();
  let timeTaken = endTime - startTime;
  let minutesTaken = Math.floor(timeTaken / 60000);
  let secondsTaken = ((timeTaken % 60000) / 1000).toFixed(0);

  // Capture short-answer responses if not already
  questions.forEach((question, index) => {
    if (question.type === "short-answer") {
      const answerElement = document.getElementById(`answer-${index}`);
      if (answerElement) {
        responses[index] = answerElement.value;
      }
    }
  });

  alert(`Quiz Over! Your score: ${score} out of ${questions.length}`);

  const attendedQuestions = responses.filter((r) => r !== null).length;
  const unattendedQuestions = questions.length - attendedQuestions;

  // Call your backend to get the SOCA analysis
  try {
    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        responses: responses,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const socaAnalysis = data.analysis;

    displayInsights(minutesTaken, secondsTaken, socaAnalysis, attendedQuestions, unattendedQuestions);
    loadInsightsPage();
    document.getElementById("submit-button").style.display = "none";
  } catch (error) {
    console.error("Error during SOCA analysis:", error);
    alert("Failed to generate SOCA analysis. Please try again later.");
  }
}

function displayInsights(minutesTaken, secondsTaken, socaAnalysis, attended, unattended) {
  const ctx = document.getElementById("myChart").getContext("2d");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Attended", "Unattended"],
      datasets: [
        {
          label: "Quiz Attendance",
          data: [attended, unattended],
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
          borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Quiz Attendance",
        },
      },
    },
  });

  document.getElementById("time-taken").innerHTML = `Time taken: ${minutesTaken} minutes and ${secondsTaken} seconds`;
  document.getElementById("final-score").innerHTML = `Final Score: ${score} out of ${questions.length}`;
  document.getElementById("correct-answers").innerHTML = `Correct Answers: ${correctAnswers}`;
  document.getElementById("soca-analysis").innerHTML = socaAnalysis;
}
