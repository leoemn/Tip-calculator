// Grab elements from the DOM
const billInput = document.querySelector('.bill input');
const tipButtons = document.querySelectorAll('.tip button');
const customTipInput = document.querySelector('.tip input');
const peopleInput = document.querySelector('.people input');
const tipAmountDisplay = document.querySelector('.person1 .amount p');
const totalAmountDisplay = document.querySelector('.person2 .amount p');
const resetButton = document.querySelector('.reset');
const errorMessage = document.querySelector('.error-message')

let bill = 0;
let tipPercent = 0;
let numberOfPeople = 1;

// Function to check if all necessary fields are filled
function checkFields() {
  if (bill > 0 && tipPercent > 0 && numberOfPeople > 0) {
    resetButton.style.backgroundColor = 'hsl(172, 67%, 45%)';
  } else {
    resetButton.style.backgroundColor = 'hsl(180, 52%, 26%)';
  }
}

// Function to update the tip and total amounts
function updateAmounts() {
  if (numberOfPeople < 1) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = "Can't be zero"
    peopleInput.style.border = '2px solid red';
    return;
  }
  else {
    errorMessage.style.display = 'none';
  }

  const tipAmount = (bill * tipPercent) / 100;
  const totalAmount = bill + tipAmount;

  const tipPerPerson = (tipAmount / numberOfPeople).toFixed(2);
  const totalPerPerson = (totalAmount / numberOfPeople).toFixed(2);

  tipAmountDisplay.textContent = `$${tipPerPerson}`;
  totalAmountDisplay.textContent = `$${totalPerPerson}`;

  checkFields();
}

// Event listener for bill input
billInput.addEventListener('input', (e) => {
  bill = parseFloat(e.target.value);
  updateAmounts();
});

// Event listener for tip buttons
tipButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    tipPercent = parseFloat(e.target.textContent);
    button.style.backgroundColor = 'hsl(172, 67%, 45%)';
    updateAmounts();
  });
});

// Event listener for custom tip input
customTipInput.addEventListener('input', (e) => {
  tipPercent = parseFloat(e.target.value);
  updateAmounts();
});

// Event listener for number of people input
peopleInput.addEventListener('input', (e) => {
  numberOfPeople = parseInt(e.target.value);
  updateAmounts();
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
  bill = 0;
  tipPercent = 0;
  numberOfPeople = 0;

  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';
  tipAmountDisplay.textContent = '$0.00';
  totalAmountDisplay.textContent = '$0.00';

  checkFields();
});

// Event listener to reset peopleInput
peopleInput.addEventListener("click", () => {
    errorMessage.style.display = 'none';
    peopleInput.style.border = '0px'
});
