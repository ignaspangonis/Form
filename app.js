const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const personalId = document.querySelector('input[name="personalId"]');
const spousePersonalId = document.querySelector('input[name="spousePersonalId"]');
const childrenContainer = document.getElementById('childrenContainer');
const childrenCheckbox = document.getElementById('childrenCheckbox');
const spouseContainer = document.getElementById('spouseContainer');
const spouseCheckbox = document.getElementById('spouseCheckbox');

const occupationDropdown = document.getElementById('occupation');
const workingContainer = document.getElementById('workingContainer');
const notWorkingContainer = document.getElementById('notWorkingContainer');
const studyingContainer = document.getElementById('studyingContainer');

const expectedEnd = document.getElementById('expectedEnd');


function promptInvalidId(event) {
  event.target.setCustomValidity('The ID code has to be exactly 11 digits long.');
}

function hidePrompt(event) {
  event.target.setCustomValidity('');
}

personalId.addEventListener('invalid', promptInvalidId);
personalId.addEventListener('change', hidePrompt);
spousePersonalId.addEventListener('invalid', promptInvalidId);
spousePersonalId.addEventListener('change', hidePrompt);
childrenCheckbox.addEventListener('click', event => {
  if (event.target.checked) {
    childrenContainer.style.display = 'block';
  } else {
    childrenContainer.style.display = 'none';
  }
});
spouseCheckbox.addEventListener('click', event => {
  if (event.target.checked) {
    spouseContainer.style.display = 'block';
  } else {
    spouseContainer.style.display = 'none';
  }
});
occupationDropdown.addEventListener('change', event => {
  if (event.target.value === 'Working') {
    workingContainer.style.display = 'block';
    notWorkingContainer.style.display = 'none';
    studyingContainer.style.display = 'none';
  } else if (event.target.value === "Studying") {
    workingContainer.style.display = 'none';
    notWorkingContainer.style.display = 'none';
    studyingContainer.style.display = 'block';
  } else if (event.target.value === "Not working") {
    workingContainer.style.display = 'none';
    notWorkingContainer.style.display = 'block';
    studyingContainer.style.display = 'none';
  }
});

var today = new Date();
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm;
expectedEnd.setAttribute("min", today);

