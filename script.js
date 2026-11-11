/* ==========================================================
   REAL MADRID FAN PORTAL - JAVASCRIPT
   Showcasing Beginner JS Abilities:
   1. Variables (let, const) & Data Types (Numbers, Strings, Booleans, Arrays, Objects)
   2. DOM Selection (getElementById, querySelector, querySelectorAll)
   3. Event Listeners (click, input, submit)
   4. DOM Manipulation (textContent, innerHTML, classList, createElement)
   5. Conditional Statements (if/else, switch)
   6. Loops and Array Methods (forEach, filter, includes)
   7. Functions and Return values
========================================================== */

// Make sure script executes after HTML is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hala Madrid! JavaScript is successfully loaded.");

  /* ----------------------------------------------------------
     1. THEME SWITCHER (Dark Mode / Light Mode)
     Abilities: querySelector, classList.toggle, conditionals
  ---------------------------------------------------------- */
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  themeToggleBtn.addEventListener("click", () => {
    // Toggle 'dark-mode' class on the body tag
    document.body.classList.toggle("dark-mode");

    // Check if dark-mode is active and update button text
    const isDark = document.body.classList.contains("dark-mode");
    if (isDark) {
      themeToggleBtn.textContent = "☀️ Light Mode";
    } else {
      themeToggleBtn.textContent = "🌙 Dark Mode";
    }
  });

  /* ----------------------------------------------------------
     2. RANDOM CHANT SHOUTER
     Abilities: Arrays, Math.floor, Math.random, DOM updates
  ---------------------------------------------------------- */
  const chantBtn = document.getElementById("chantBtn");
  const chantDisplay = document.getElementById("chantDisplay");

  // An array of popular Real Madrid chants
  const chants = [
    "¡Hala Madrid y nada más! 🤍",
    "¡Así, así, así gana el Madrid! ⚡",
    "¡Cómo no te voy a querer! 👑",
    "¡Hasta el final, vamos Real! 🏆",
    "¡Reyes de Europa! 🌟"
  ];

  chantBtn.addEventListener("click", () => {
    // Generate random index between 0 and chants.length - 1
    const randomIndex = Math.floor(Math.random() * chants.length);
    const chosenChant = chants[randomIndex];

    // Show text and remove 'hidden' class
    chantDisplay.textContent = chosenChant;
    chantDisplay.classList.remove("hidden");
  });

  /* ----------------------------------------------------------
     3. INTERACTIVE TROPHY COUNTER
     Abilities: Number manipulation, functions, innerText, conditionals
  ---------------------------------------------------------- */
  let trophyCount = 15; // Initial UCL trophies count
  const defaultTrophies = 15;

  const trophyCountEl = document.getElementById("trophyCount");
  const trophyMessageEl = document.getElementById("trophyMessage");
  const addTrophyBtn = document.getElementById("addTrophyBtn");
  const minusTrophyBtn = document.getElementById("minusTrophyBtn");
  const resetTrophyBtn = document.getElementById("resetTrophyBtn");

  // Helper function to update display and contextual message
  function updateTrophyDisplay() {
    trophyCountEl.textContent = trophyCount;

    // Beginner conditional logic
    if (trophyCount > 15) {
      trophyMessageEl.textContent = "🔥 Real Madrid is making more European history!";
      trophyMessageEl.style.color = "#2e7d32"; // Green
    } else if (trophyCount === 15) {
      trophyMessageEl.textContent = "Real Madrid currently holds the all-time record with 15 European Cups!";
      trophyMessageEl.style.color = "";
    } else if (trophyCount < 15 && trophyCount >= 0) {
      trophyMessageEl.textContent = "Revisiting classic historic eras!";
      trophyMessageEl.style.color = "";
    } else {
      trophyMessageEl.textContent = "Trophies cannot be negative!";
      trophyMessageEl.style.color = "#d32f2f"; // Red
    }
  }

  addTrophyBtn.addEventListener("click", () => {
    trophyCount = trophyCount + 1; // Increment
    updateTrophyDisplay();
  });

  minusTrophyBtn.addEventListener("click", () => {
    if (trophyCount > 0) {
      trophyCount = trophyCount - 1; // Decrement
      updateTrophyDisplay();
    }
  });

  resetTrophyBtn.addEventListener("click", () => {
    trophyCount = defaultTrophies; // Reset
    updateTrophyDisplay();
  });

  /* ----------------------------------------------------------
     4. DYNAMIC PLAYER ROSTER & FILTERING
     Abilities: Array of Objects, filter(), forEach(), template literals, event delegation
  ---------------------------------------------------------- */
  const players = [
    { number: 1, name: "Thibaut Courtois", position: "Goalkeeper", country: "Belgium" },
    { number: 2, name: "Dani Carvajal", position: "Defender", country: "Spain" },
    { number: 3, name: "Éder Militão", position: "Defender", country: "Brazil" },
    { number: 22, name: "Antonio Rüdiger", position: "Defender", country: "Germany" },
    { number: 5, name: "Jude Bellingham", position: "Midfielder", country: "England" },
    { number: 8, name: "Federico Valverde", position: "Midfielder", country: "Uruguay" },
    { number: 6, name: "Eduardo Camavinga", position: "Midfielder", country: "France" },
    { number: 14, name: "Aurélien Tchouaméni", position: "Midfielder", country: "France" },
    { number: 7, name: "Vinícius Júnior", position: "Forward", country: "Brazil" },
    { number: 9, name: "Kylian Mbappé", position: "Forward", country: "France" },
    { number: 11, name: "Rodrygo", position: "Forward", country: "Brazil" },
    { number: 15, name: "Arda Güler", position: "Midfielder", country: "Turkey" }
  ];

  const playerGrid = document.getElementById("playerGrid");
  const playerSearchInput = document.getElementById("playerSearchInput");
  const positionButtons = document.querySelectorAll(".filter-btn");

  let activePosition = "All";
  let searchTerm = "";

  // Render player cards based on current filter state
  function renderPlayers() {
    // 1. Filter by position and search input
    const filteredPlayers = players.filter((player) => {
      const matchesPosition = activePosition === "All" || player.position === activePosition;
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesPosition && matchesSearch;
    });

    // 2. Clear previous content
    playerGrid.innerHTML = "";

    // 3. Handle empty state
    if (filteredPlayers.length === 0) {
      playerGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 1rem;">No players found matching your search.</p>`;
      return;
    }

    // 4. Create and append HTML for each player using forEach
    filteredPlayers.forEach((player) => {
      const card = document.createElement("div");
      card.className = "player-card";
      card.innerHTML = `
        <div class="player-number">#${player.number}</div>
        <div class="player-name">${player.name}</div>
        <div class="player-position">${player.position}</div>
        <div class="player-country">📍 ${player.country}</div>
      `;
      playerGrid.appendChild(card);
    });
  }

  // Filter Buttons Click Events
  positionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove 'active' class from all buttons
      positionButtons.forEach((b) => b.classList.remove("active"));
      // Add 'active' class to clicked button
      btn.classList.add("active");

      // Update state & re-render
      activePosition = btn.getAttribute("data-position");
      renderPlayers();
    });
  });

  // Search Input Event
  playerSearchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderPlayers();
  });

  // Initial render
  renderPlayers();

  /* ----------------------------------------------------------
     5. MADRIDISTA TRIVIA QUIZ
     Abilities: Objects, state management, loops, conditionals, disabling buttons
  ---------------------------------------------------------- */
  const quizQuestions = [
    {
      question: "How many UEFA Champions League titles has Real Madrid won (as of 2024)?",
      options: ["12", "14", "15", "16"],
      correctIndex: 2
    },
    {
      question: "What is the famous home stadium of Real Madrid?",
      options: ["Camp Nou", "Santiago Bernabéu", "Metropolitano", "San Siro"],
      correctIndex: 1
    },
    {
      question: "What year was Real Madrid C.F. founded?",
      options: ["1902", "1899", "1910", "1923"],
      correctIndex: 0
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const currentQuestionNumEl = document.getElementById("currentQuestionNum");
  const totalQuestionsNumEl = document.getElementById("totalQuestionsNum");
  const questionTextEl = document.getElementById("questionText");
  const optionsContainerEl = document.getElementById("optionsContainer");
  const quizFeedbackEl = document.getElementById("quizFeedback");
  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  const quizContainerEl = document.getElementById("quizContainer");
  const quizResultBoxEl = document.getElementById("quizResultBox");
  const quizFinalScoreEl = document.getElementById("quizFinalScore");
  const restartQuizBtn = document.getElementById("restartQuizBtn");

  totalQuestionsNumEl.textContent = quizQuestions.length;

  function loadQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    currentQuestionNumEl.textContent = currentQuestionIndex + 1;
    questionTextEl.textContent = q.question;
    optionsContainerEl.innerHTML = "";
    quizFeedbackEl.textContent = "";
    nextQuestionBtn.classList.add("hidden");

    q.options.forEach((optText, index) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = optText;

      btn.addEventListener("click", () => handleAnswer(index, btn));
      optionsContainerEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, clickedBtn) {
    const q = quizQuestions[currentQuestionIndex];
    const optionButtons = optionsContainerEl.querySelectorAll(".option-btn");

    // Disable all options once answered
    optionButtons.forEach((btn) => (btn.disabled = true));

    if (selectedIndex === q.correctIndex) {
      score++;
      clickedBtn.classList.add("correct");
      quizFeedbackEl.textContent = "✅ Correct! ¡Hala Madrid!";
      quizFeedbackEl.style.color = "var(--success-color)";
    } else {
      clickedBtn.classList.add("wrong");
      // Highlight the correct answer
      optionButtons[q.correctIndex].classList.add("correct");
      quizFeedbackEl.textContent = "❌ Oops, that's not quite right!";
      quizFeedbackEl.style.color = "var(--error-color)";
    }

    nextQuestionBtn.classList.remove("hidden");
  }

  nextQuestionBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      // Quiz completed!
      quizContainerEl.classList.add("hidden");
      quizResultBoxEl.classList.remove("hidden");
      quizFinalScoreEl.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    }
  });

  restartQuizBtn.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    quizResultBoxEl.classList.add("hidden");
    quizContainerEl.classList.remove("hidden");
    loadQuestion();
  });

  // Load first question
  loadQuestion();

  /* ----------------------------------------------------------
     6. FAN MESSAGE BOARD (Form Handling & Element Creation)
     Abilities: preventDefault, form inputs, createElement, appendChild / prepend
  ---------------------------------------------------------- */
  const fanForm = document.getElementById("fanForm");
  const fanNameInput = document.getElementById("fanName");
  const fanMessageInput = document.getElementById("fanMessage");
  const messagesList = document.getElementById("messagesList");

  fanForm.addEventListener("submit", (event) => {
    // 1. Prevent normal form submission page reload
    event.preventDefault();

    // 2. Read values and trim whitespace
    const name = fanNameInput.value.trim();
    const message = fanMessageInput.value.trim();

    // Simple validation check
    if (name === "" || message === "") {
      alert("Please fill in both name and message!");
      return;
    }

    // 3. Create new list item dynamically
    const newMsgItem = document.createElement("li");
    newMsgItem.className = "message-item";

    // Format timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    newMsgItem.innerHTML = `
      <strong>${name}:</strong>
      <p>${message}</p>
      <span class="timestamp">Today at ${timeString}</span>
    `;

    // 4. Prepend at top of list so newest message appears first
    messagesList.prepend(newMsgItem);

    // 5. Reset input fields
    fanForm.reset();
  });
});

