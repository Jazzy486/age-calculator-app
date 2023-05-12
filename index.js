const button = document.getElementById("img-div");

// Add event listener to input fields to detect Enter key press
const inputFields = document.querySelectorAll(".input-fields");
inputFields.forEach((inputField) => {
  const button = document.getElementById("img-div");
  const input = inputField.querySelector("input");
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      // Enter key code is 13
      event.preventDefault();
      button.click();
    }
  });
});

// Validate each input field
let yearInput = "";
let monthInput = "";
let dayInput = "";

button.addEventListener("click", () => {
  const inputFields = document.querySelectorAll(".input-fields");

  // Remove any existing error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((errorMessage) => errorMessage.remove());
  inputFields.forEach((inputField) => {
    inputField.firstElementChild.classList.remove("label-red-alert");
    inputField.lastElementChild.classList.remove("red-alert");
  });

  // Validate each input field
  inputFields.forEach((inputField) => {
    const inputValue = inputField.querySelector("input").value;
    const fieldName = inputField.querySelector("label").textContent.trim();

    function addError(err) {
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("error-message");
      errorMessage.textContent = err;
      inputField.lastElementChild.classList.add("red-alert");
      inputField.firstElementChild.classList.add("label-red-alert");
      inputField.appendChild(errorMessage);
    }

    if (inputValue === "") {
      // If it's empty, append a line below the input field with an error message
      addError("This field can't be empty");
    }

    //Validate Year
    if (fieldName === "YEAR") {
      const year = parseInt(inputValue, 10);

      if (year <= 0 || year > 2023) {
        addError("Invalid Year Input");
      } else {
        yearInput = year;
        // yearOutput.innerHTML = 2023 - yearInput;
      }
    }

    //Validate Month
    if (fieldName === "MONTH") {
      const month = parseInt(inputValue, 10);

      if (month <= 0 || month > 12) {
        addError("Invalid month input");
      } else {
        monthInput = month;
        // monthOutput.innerHTML = monthInput;
      }
    }

    // Validate day according to month entered
    if (fieldName === "DAY") {
      const monthInput = document.querySelector("input[name = 'month']").value;
      const month = parseInt(monthInput, 10);
      const day = parseInt(inputValue, 10);
      const thirtyOneDaysMonths = [01, 03, 05, 07, 08, 10, 12, 1, 3, 5, 7, 8];
      const thirtyDaysMonths = [04, 06, 09, 11, 4, 6, 9];

      if (day <= 0 || day > 31) {
        addError("Invalid day input");
      } else if (thirtyOneDaysMonths.includes(month) && (day < 1 || day > 31)) {
        addError("Specified month has max 31 days");
      } else if (thirtyDaysMonths.includes(month) && (day < 1 || day > 30)) {
        addError("Specified month has max 30 days");
      } else if ((month === 02 || month === 2) && (day < 1 || day > 29)) {
        addError("Specified month has max 29 days");
      } else {
        dayInput = day;
      }
    }

    // Get current date
    const currentDate = new Date();

    // Calculate age in years, months, and days
    const birthDate = new Date(`${monthInput}/${dayInput}/${yearInput}`);
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(
      ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000)
    );
    const ageInMonths = Math.floor(
      (ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) /
        (30.44 * 24 * 60 * 60 * 1000)
    );
    const ageInDays = Math.floor(
      (ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) /
        (24 * 60 * 60 * 1000)
    );

    var yearOutput = document.getElementById("years-output");
    yearOutput.innerHTML = ageInYears;

    var monthOutput = document.getElementById("months-output");
    monthOutput.innerHTML = ageInMonths;

    var dayOutput = document.getElementById("days-output");
    dayOutput.innerHTML = ageInDays;
  });
});
