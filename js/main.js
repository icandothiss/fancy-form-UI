// Questions Array
const questions = [
  { question: "Enter Your First Name" },
  { question: "Enter Your Last Name" },
  { question: "Enter Your Email Name", pattern: /\S+@\S+\.\S+/ },
  { question: "Create A Password", type: "password" },
];

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Postion At First Question
let Postion = 0;

// Init DOM Elements
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");
const container = document.getElementById("container");

// EVENTS

// Gst question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);

// Next Button Click
nextBtn.addEventListener("click", validate);

// input field enter click
inputField.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS

// Get Question From Array & Add To Markup
function getQuestion() {
  //Get Current Question
  inputLabel.innerHTML = questions[Postion].question;
  // Get Current Type
  inputField.type = questions[Postion].type || "text";
  //Get Current Answer
  inputField.value = questions[Postion].answer || "";
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.getElementsByClassName.width =
    (Postion * 100) / questions.length + "%";

  // Add User Icon OR Back arrow depending on question
  prevBtn.className = Postion ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

// Display question to user
function showQuestion() {
  inputGroup.style.opacity = 1;
  //might be useless
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

// Hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  //might be useless
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = "none";
  //might be useless
  inputGroup.style.border = null;
}

// transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
  // make sure pattern matches if there is one
  if (!inputField.value.match(questions[Postion].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

// field input fail
function inputFail() {
  formBox.className = "error";
  // Repeat Shake Motion -  Set i to number of shakes
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// field input passed
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // store answer in array
  questions[Postion].answer = inputField.value;

  // Increment Position
  Postion++;

  // if new question, hide current and get next
  if (questions[Postion]) {
    hideQuestion();
    getQuestion();
  } else {
    // remove if no more questions
    hideQuestion();
    formBox.className = "close";
    progress.style.width = "100%";

    // form complete
    formComplete();
  }
}

// all fields complete - show h1 end
function formComplete() {
  console.log(questions);
  const h1 = document.createElement("h1");
  h1.classList.add("end");
  h1.appendChild(
    document.createTextNode(`thanks ${questions[0].answer} Your are registred`)
  );
  setTimeout(() => {
    formBox.parentElement.appendChild(h1);
    setTimeout(() => {
      h1.style.opacity = 1;
    }, 50);
  }, 1000);
}
