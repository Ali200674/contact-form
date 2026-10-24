// Global
const mailingList = document.querySelector("#mailingList");
const meetOption = document.querySelector("#metOption");

// Check if mailing list check box changes and show six row if clicked and don't if not
mailingList.addEventListener("change", (event) => {
  const sixRow = document.querySelector("#sixth-row");

  if (event.target.checked) {
    sixRow.style.display = "flex";
    sixRow.style.alignItems = "center";
  } else {
    sixRow.style.display = "none";
  }
});

// Listen for any changes to meetOption. If user selects 'other', display the other meet option box, else keep it hidden
meetOption.addEventListener("change", (event) => {
  const thirdRow = document.querySelector("#third-row");
  const otherMeetOption = document.querySelector("#other-meet-option");

  if (event.target.value === "other") {
    otherMeetOption.style.display = "block";
    thirdRow.style.gridTemplateColumns = "1.5fr 1.5fr";
  } else {
    otherMeetOption.style.display = "none";
    thirdRow.style.gridTemplateColumns = "3fr";
  }
});

document.querySelector("#form").onsubmit = () => {
  resetAllErrors();

  let isFormValid = true;

  // Fields to check
  const firstName = document.querySelector("#fname");
  const lastName = document.querySelector("#lname");
  const emailAddress = document.querySelector("#email");
  const linkedinLink = document.querySelector("#linkedinURL");

  // Error fields that go with fields
  const firstNameError = document.querySelector("#fname-err");
  const lastNameError = document.querySelector("#lname-err");
  const emailError = document.querySelector("#email-err");
  const linkedinError = document.querySelector("#linkedin-err");
  const meetOptionError = document.querySelector("#meetOption-err");

  // for first name
  if (firstName.value === "") {
    firstNameError.style.display = "inline-block";
    isFormValid = false;
  }

  // for last name
  if (lastName.value === "") {
    lastNameError.style.display = "inline-block";

    isFormValid = false;
  }

  // for email
  if (emailAddress.value !== "") {
    if (
      !(emailAddress.value.includes("@") && emailAddress.value.includes("."))
    ) {
      emailError.textContent = "Email Address Needs Both @ And .!";
      emailError.style.display = "inline-block";
      isFormValid = false;
    }
  } else if (mailingList.checked && emailAddress.value === "") {
    emailError.textContent = "Email Address Is Required";
    emailError.style.display = "inline-block";
    isFormValid = false;
  }

  if (
    linkedinLink.value !== "" &&
    !linkedinLink.value.startsWith("https://linkedin.com/in/")
  ) {
    linkedinError.style.display = "inline-block";
    isFormValid = false;
  }

  if (meetOption.value === "none") {
    meetOptionError.style.display = "inline-block";
    isFormValid = false;
  }
  return isFormValid;
};

/**
 * Method to reset all errors
 */
function resetAllErrors() {
  document.querySelectorAll(".err").forEach((error) => {
    error.style.display = "none";
  });
}
