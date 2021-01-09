const maidenContainer = document.getElementById('maidenContainer');
const genderContainer = document.getElementById('genderContainer');
const femaleRadioButton = document.getElementById('female');
const personalId = document.getElementById('personalId');
const spousePersonalId = document.querySelector('input[name="spousePersonalId"]');
const childrenContainer = document.getElementById('childrenContainer');
const childrenNames = document.getElementById('childrenNames');
const childrenCheckbox = document.getElementById('childrenCheckbox');
const childAddButton = document.getElementById('childAdd');
const spouseContainer = document.getElementById('spouseContainer');
const occupationDropdown = document.getElementById('occupation');

const workingContainer = document.getElementById('workingContainer');
const notWorkingContainer = document.getElementById('notWorkingContainer');
const studyingContainer = document.getElementById('studyingContainer');
const maternityContainer = document.getElementById('maternityContainer');
const containerArray = [workingContainer, studyingContainer, notWorkingContainer];

const expectedEnd = document.getElementById('expectedEnd');
const contactAddButton = document.getElementById('contactAdd');
const contactContainer = document.getElementById('contactContainer');
const submitButton = document.getElementById('submitButton');
const maritalStatus = document.getElementById('maritalStatus');
let contactCount = 0;
let childCount = 1;
let people = [];
let today = new Date();
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = yyyy + '-' + mm;
expectedEnd.setAttribute("min", today);


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
maritalStatus.addEventListener('change', event => {
  if (maritalStatus.value === 'Married') {
    spouseContainer.style.display = 'block';
    changeRequired(spouseContainer, true);
  } else {
    spouseContainer.style.display = 'none';
    changeRequired(spouseContainer, false);
  }
});
occupationDropdown.addEventListener('change', event => {
  if (event.target.value === 'Working') {
    changeDisplay(containerArray, 0);
  } else if (event.target.value === "Studying") {
    changeDisplay(containerArray, 1);
  } else if (event.target.value === "Not working") {
    changeDisplay(containerArray, 2);
  } else if (event.target.value === "On maternity/paternity leave") {
    changeDisplay(containerArray, 3);
  }
});
contactAddButton.addEventListener('click', event => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('button');

  contactCount++;

  label.htmlFor = input.id = input.name = `url-${contactCount}`;
  input.type = 'url';
  button.type = 'button';
  button.classList.add("contactRemove");
  button.innerHTML = "-"
  button.id = `button-${contactCount}`;

  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(button);
  contactContainer.appendChild(div); // add div to the HTML
  button.addEventListener('click', event => {
    event.target.parentNode.remove();
  })
});
genderContainer.addEventListener('click', event => {
  if (event.target.value === 'female') {
    maidenContainer.style.display = 'block';
  } else {
    maidenContainer.style.display = 'none';
  }
});

childAddButton.addEventListener('click', event => {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const button = document.createElement('button');

  childCount++;

  label.htmlFor = input.id = input.name = `child-${childCount}`;
  input.type = 'text';
  button.type = 'button';
  button.classList.add("childRemove");
  button.innerHTML = "-"
  button.id = `button-${childCount}`;

  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(button);
  childrenNames.appendChild(div); // add div to the HTML

  button.addEventListener('click', event => {
    event.target.parentNode.remove();
  })
});





function changeDisplay(array, displayedIndex) {
  for (let i = 0; i < array.length; i++) {
    if (i === displayedIndex) {
      array[i].style.display = 'block';
      changeRequired(array[i], true);
    } else {
      array[i].style.display = 'none';
      changeRequired(array[i], false);
    }
  }
}

function changeRequired(container, bool) {
  container.querySelectorAll('input').forEach(input => {
    input.required = bool;
  });
}




submitButton.addEventListener('click', addPerson);
function addPerson(event) {
  console.log(event)
  const form = document.querySelector('form');
  for(var i=0; i < form.elements.length; i++){
    if(form.elements[i].value === '' && form.elements[i].hasAttribute('required')){
      return;
    }
  }
  console.log(document.getElementById('personalId').value.toString().length)
  if (personalId.value.toString().length !== 11)
    return;
  event.preventDefault();
  
  let person = {
    id: Date.now(),
    firstName: document.getElementById('firstName').value,
    middleName: document.getElementById('middleName').value,
    lastName: document.getElementById('lastName').value,
    maidenName: document.getElementById('maidenName').value,
    birthDate: document.getElementById('birthDate').value,
    personalId: document.getElementById('personalId').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    contacts: getInputValues(contactContainer),
    address: document.getElementById('address').value,
    maritalStatus: maritalStatus.value,
    spouseInfo: {
      firstName: document.getElementById('spouseFirstName').value,
      lastName: document.getElementById('spouseLastName').value,
      personalId: document.getElementById('spousePersonalId').value,
    },
    contacts: getInputValues(childrenNames),
    hasChildren: isChecked(childrenCheckbox),
    education: document.getElementById('education').value,
    occupation: document.getElementById('occupation').value,
    studiesInfo: {
      degree: document.getElementById('degree').value,
      year: document.getElementById('year').value,
      institution: document.getElementById('institution').value,
    },
    workInfo: {
      company: document.getElementById('company').value,
      position: document.getElementById('position').value,
    },
    reasonForNotWorking: document.getElementById('reason').value,
    expectedEnd: expectedEnd,
    experience: document.getElementById('experience').value,
    workType: document.getElementById('workType').value,
    workArea: document.getElementById('workArea').value,    
  }
  people.push(person);
  document.forms[0].reset();
  // console.warn('added', {people});
  let pre = document.querySelector('#msg pre');
  pre.innerHTML = "Form successfully accepted and stored into <i>people</i> array!"
  // pre.textContent = '\n' + JSON.stringify(people, '\t', 2);
}

function getInputValues(container) {
  const inputs = container.querySelectorAll('input');
  if (inputs.length > 0) {
    let inputValues = [];
    inputs.forEach(input => {
      inputValues.push(input.value);
    })
    return inputValues;
  } else {
    return [];
  }
}

function isChecked(element) {
  return element.checked;
}
