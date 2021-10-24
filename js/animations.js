//////////////////////////
// Text type animation
const textRecipes = document.querySelectorAll('.header__recipe');
const texts = ['pasta', 'pizza', 'burger', 'cakes', 'salad', '...and more'];
let arrIndex = 0;
let letterIndex = 0;

export function type() {
  if (letterIndex < texts[arrIndex].length) {
    textRecipes.forEach(recipe => {
      recipe.textContent += texts[arrIndex].charAt(letterIndex);
    });
    letterIndex++;
    setTimeout(type, 200);
  } else {
    setTimeout(() => {
      setTimeout(erase, 100);
    }, 1000);
  }
}

function erase() {
  if (letterIndex > 0) {
    textRecipes.forEach(recipe => {
      recipe.textContent = texts[arrIndex].substring(0, letterIndex - 1);
    });
    letterIndex--;
    setTimeout(erase, 100);
  } else {
    arrIndex++;
    if (arrIndex >= texts.length) arrIndex = 0;

    setTimeout(type, 200);
  }
}

//////////////////////////
// Counter
const counters = document.querySelectorAll('.counter__counter');

function updateCounter() {
  counters.forEach(counter => {
    const counterCell = +counter.textContent;
    const counterData = +counter.dataset.counter;
    const speed = 100;
    const gap = counterData / speed;

    if(counterCell < counterData) {
      counter.textContent = Math.ceil(counterCell + gap);
    }
  })
}
setInterval(updateCounter, 1);

//////////////////////////
// Slider
const slides = document.querySelectorAll('.recipe__slide');
const btnLeft = document.querySelector('.btn__slider--left');
const btnRight = document.querySelector('.btn__slider--right');
let currSlide = 0;
const maxSlide = slides.length;

function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}
goToSlide(0);

export function nextSlide() {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }

  goToSlide(currSlide);
}

function prevSlide() {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

//////////////////////////
// Sticky navigation
const nav = document.querySelector('.nav');
const recipeContainer = document.querySelector('.flex-container');
const height = nav.getBoundingClientRect().height;

function stickyNav(entries) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    nav.classList.remove('nav__sticky');
  } else {
    nav.classList.add('nav__sticky');
  }
}

let navOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${height}px`,
};

let navigationObserver = new IntersectionObserver(stickyNav, navOptions);

navigationObserver.observe(recipeContainer);

//////////////////////////
// Hamburger MENU
const hamburgerIcon = document.querySelector('.nav__menu');
const timesIcon = document.querySelector('.nav__times--icon');
const navMenu = document.querySelector('.nav__list');
// Open Menu
hamburgerIcon.addEventListener('click', () => {
  navMenu.classList.add('nav__list--active');
});
// Close Menu
timesIcon.addEventListener('click', () => {
  navMenu.classList.remove('nav__list--active');
});


//////////////////////////
// Scroll on submit
// Results
const resultsSection = document.querySelector('.results');
export function scrollToResultsSeciton() {
  resultsSection.scrollIntoView({ behavior: 'smooth'});
}
//////////////////////////
// Recipe
const recipeSection = document.querySelector('.recipe');
export function scrollToRecipeSeciton() {
  recipeSection.scrollIntoView({ behavior: 'smooth'});
}

//////////////////////////
// DropDown
const dropdownBtns = document.querySelectorAll('.dropdown__btn');
const dropdown = document.querySelectorAll('.dropdown__list');
const navIcon = document.querySelectorAll('.nav__icon');

dropdownBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    dropdown.forEach(menu => {
      if (
        btn.closest('.nav__item').querySelector('.dropdown') !== menu &&
        menu.classList.contains('dropdown--active')
      ) {
        menu.classList.remove('dropdown--active');
        navIcon.forEach(icon => icon.classList.remove('nav__icon--active'));
      }
    });
    const dropdownMenu = btn.closest('.nav__item').querySelector('.dropdown');
    if(!dropdownMenu) return;
    dropdownMenu.classList.toggle('dropdown--active');
  });
});

//////////////////////////
// SubMENU
const subLinks = document.querySelectorAll('.subMenu__btn');
const subMenus = document.querySelectorAll('.sub-dropdown');

subLinks.forEach(btn => {
  btn.addEventListener('click', e => {
    subMenus.forEach(menu => {
      if (
        btn.closest('.dropdown__item').querySelector('.sub-dropdown') !==
        menu &&
        menu.classList.contains('sub-dropdown--active')
      ) {
        menu.classList.remove('sub-dropdown--active');
      }
    });
    const dropdown = btn
      .closest('.dropdown__item')
      .querySelector('.sub-dropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('sub-dropdown--active');
  });
});

//////////////////////////
// Progress Bar
function progressBar() {
  const currentScroll = window.pageYOffset;
  const fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
  );
  const clientHeight = document.documentElement.clientHeight;
  const subHeight = fullHeight - clientHeight;

  const scroll = (currentScroll / subHeight) * 100;
  document.querySelector('.progressBar__bar').style.width = `${scroll}%`;
}

window.addEventListener('scroll', progressBar);

//////////////////////////
// FORM
const formBtnOpen = document.querySelector('.nav__log-in');
const formBtnClose = document.querySelector('.form__times');
const form = document.querySelector('.form');

// Open Form
formBtnOpen.addEventListener('click', () => {
  form.classList.add('form__active');
})
// Close Form
formBtnClose.addEventListener('click', () => {
  form.classList.remove('form__active');

  logInPasswordField.classList.remove('error');
  logInPasswordField.classList.remove('errorIcon');
  logInEmailField.classList.remove('error');
  logInEmailField.classList.remove('errorIcon');
  signUpPasswordField.classList.remove('error');
  signUpPasswordField.classList.remove('errorIcon');
  signUpEmailField.classList.remove('error');
  signUpEmailField.classList.remove('errorIcon');
  signUpPasswordField.classList.remove('error');
  signUpPasswordField.classList.remove('errorIcon');

})
// Show Log in or Sign up
const logInBtn = document.getElementById('logInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const logInFrom = document.getElementById('logIn');
const signUpFrom = document.getElementById('signUp');

function showSignUpForm() {
  signUpFrom.style.left = `0`;
  logInFrom.style.left = `100%`;
}

function showLogInForm() {
  logInFrom.style.left = `0`;
  signUpFrom.style.left = `-100%`;
}

logInBtn.addEventListener('click', showLogInForm);
signUpBtn.addEventListener('click', showSignUpForm);

const logInForm = document.querySelector('.form__logIn');
const logInEmailField = logInForm.querySelector('.email');
const logInEmailInput = logInEmailField.querySelector('input');
const logInPasswordField = logInForm.querySelector('.password');
const logInPasswordInput = logInPasswordField.querySelector('input');

const signUpForm = document.querySelector('.form__signUp');
const signUpUsernameField = signUpForm.querySelector('.username');
const signUpUsernameInput = signUpUsernameField.querySelector('input');
const signUpEmailField = signUpForm.querySelector('.email');
const signUpEmailInput = signUpEmailField.querySelector('input');
const signUpPasswordField = signUpForm.querySelector('.password');
const signUpPasswordInput = signUpPasswordField.querySelector('input');

//////////////////////////////////
// LOG IN
logInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(logInEmailInput.value === '') {
    logInEmailField.classList.add('shake');
    logInEmailField.classList.add('error');
    logInEmailField.classList.add('errorIcon');
  }
  if(logInPasswordInput.value === '') {
    logInPasswordField.classList.add('shake');
    logInPasswordField.classList.add('error');
    logInPasswordField.classList.add('errorIcon');
  }
  setTimeout(() => {
    logInEmailField.classList.remove('shake');
    logInPasswordField.classList.remove('shake');
  }, 1000);
})

//////////////////////
// Check for LOG IN
function checkLogInEmailInput() {
  let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!this.value.match(pattern)) {
    logInEmailField.classList.add('errorInvalid');
  } else {
    logInEmailField.classList.remove('errorInvalid');
  }
  if(this.value === '') {
    logInEmailField.classList.add('error');
    logInEmailField.classList.remove('errorInvalid');
  } else {
    logInEmailField.classList.remove('error');
  }
}
logInEmailInput.addEventListener('keyup', checkLogInEmailInput);

function checkLogInPasswordInput() {
  if(logInPasswordInput.value.length > 0 && logInPasswordInput.value.length < 8) {
    logInPasswordField.classList.add('errorLenght');
    logInPasswordField.classList.remove('error');
  } else {
    logInPasswordField.classList.remove('errorLenght');
  }
  if(logInPasswordInput.value === '') {
    logInPasswordField.classList.add('error');
  }
}
logInPasswordInput.addEventListener('keyup', checkLogInPasswordInput);

//////////////////////////////////
// SIGN UP
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(signUpUsernameInput.value === '') {
    signUpUsernameField.classList.add('shake');
    signUpUsernameField.classList.add('error');
    signUpUsernameField.classList.add('errorIcon');
  }
  if(signUpEmailInput.value === '') {
    signUpEmailField.classList.add('shake');
    signUpEmailField.classList.add('error');
    signUpEmailField.classList.add('errorIcon');
  }
  if(signUpPasswordInput.value === '') {
    signUpPasswordField.classList.add('shake');
    signUpPasswordField.classList.add('error');
    signUpPasswordField.classList.add('errorIcon');
  }
  setTimeout(() => {
    signUpEmailField.classList.remove('shake');
    signUpPasswordField.classList.remove('shake');
  }, 1000);
})

//////////////////////
// Check for SIGN UP
function checkSignUpEmailInput() {
  let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!this.value.match(pattern)) {
    signUpEmailField.classList.add('errorInvalid');
  } else {
    signUpEmailField.classList.remove('errorInvalid');
  }
  if(this.value === '') {
    signUpEmailField.classList.add('error');
    signUpEmailField.classList.remove('errorInvalid');
  } else {
    signUpEmailField.classList.remove('error');
  }
}
signUpEmailInput.addEventListener('keyup', checkSignUpEmailInput);

function checkSignUpPasswordInput() {
  if(signUpPasswordInput.value.length > 0 && signUpPasswordInput.value.length < 8) {
    signUpPasswordField.classList.add('errorLenght');
    signUpPasswordField.classList.remove('error');
  } else {
    signUpPasswordField.classList.remove('errorLenght');
  }
  if(signUpPasswordInput.value === '') {
    signUpPasswordField.classList.add('error');
  }
}
signUpPasswordInput.addEventListener('keyup', checkSignUpPasswordInput);

//////////////////////////
// Cards popup
const gridContainer = document.querySelector('.grid__container');
const popup = document.querySelector('.popup');
const popupBox = document.querySelector('.popup__box');
const popupIcon = document.querySelector('.popup__icon');
// Modal Open
function modalOpen() {
  popup.classList.add('popup__active');
  popupBox.classList.add('popup__box--active');
  popupIcon.classList.add('popup__icon--active');
}
// Modal Close
function modalClose() {
  popup.classList.remove('popup__active');
  popupBox.classList.remove('popup__box--active');
}

gridContainer.addEventListener('click', function (e) {
  const btns = this.querySelectorAll('.btn__popup');
  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      modalOpen();
    });
  });
});

popupIcon.addEventListener('click', modalClose);

// Tabs

const tabsContainer = document.querySelector('.tabs');
const tabs = document.querySelectorAll('.tabs__tab');
const chefContents = document.querySelectorAll('.chef__content');

tabsContainer.addEventListener('click', (e) => {
  const tab = e.target.closest('.tabs__tab');
  tabs.forEach(t => t.classList.remove('tabs__tab--active'));
  tab.classList.add('tabs__tab--active');

  const tabData = tab.dataset.tab;
  chefContents.forEach(content => content.classList.remove('chef__content--active'));
  document.querySelector(`.chef__content--${tabData}`).classList.add('chef__content--active');
})

//////////////////////////
// Reaviling Sections
const sections = document.querySelectorAll('.section');

function reavilingSections(entries) {
 const [ entry ] = entries;

 if(entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
}

let sectionOptions = {
  root: null,
  threshold: 0.2,
}

const sectionObserver = new IntersectionObserver(reavilingSections, sectionOptions);

sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
})