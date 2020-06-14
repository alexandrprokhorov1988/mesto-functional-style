const initialCards = [
  {
    name: 'Дорога',
    link: 'images/card-winter-6.jpg',
    alt: 'Дорога.',
  },
  {
    name: 'Дом',
    link: 'images/card-winter-5.jpg',
    alt: 'Дом.',
  },
  {
    name: 'Деревья',
    link: 'images/card-winter-4.jpg',
    alt: 'Деревья.',
  },
  {
    name: 'Пруд',
    link: 'images/card-winter-3.jpg',
    alt: 'Пруд под снегом.',
  },
  {
    name: 'Солнце',
    link: 'images/card-winter-2.jpg',
    alt: 'Дорога в снегу.',
  },
  {
    name: 'Калитка',
    link: 'images/card-winter-1.jpg',
    alt: 'Калитка.',
  }
];
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const nameInput = document.querySelector('[name=name]');
const jobInput = document.querySelector('[name=profession]');
const imgInput = document.querySelector('[name=imgName]');
const linkInput = document.querySelector('[name=link]');
const nameField = document.querySelector('.profile__user-name');
const jobField = document.querySelector('.profile__user-profession');
const editForm = document.querySelector('#editForm');
const addForm = document.querySelector('#addForm');
const editPopup = document.querySelector('#editPopup');
const addPopup = document.querySelector('#addPopup');
const sectionElement = document.querySelector('.elements');
const imgPopup = document.querySelector('#imgPopup');
const img = imgPopup.querySelector('.popup__image');
const imgTitle = imgPopup.querySelector('.popup__image-title');
const allPopups = Array.from(document.querySelectorAll('.popup'));
const card = document.querySelector('#card').content;
const popupOpenClass = 'popup_opened';
const cardTitleClass = 'card__title';
const popupNameClass = 'popup';
const closeIconClass = 'popup__close-icon';
const cardImgClass = 'card__img';
const cardClass = 'card';
const cardDeleteClass = 'card__delete';
const cardLikeClass = 'card__like';
const cardLikeActiveClass = 'card__like_active';

const cloneCards = (name, link, alt = 'Картинка.') => {
  const cardElement = card.cloneNode(true);
  const cardImg = cardElement.querySelector(`.${cardImgClass}`);
  const cardTitle = cardElement.querySelector(`.${cardTitleClass}`);
  cardImg.src = link;
  cardImg.alt = alt;
  cardTitle.textContent = name;
  return cardElement;
};

const removeCard = (e) => {
  if (e.target.classList.contains(cardDeleteClass)) {
    e.target.closest(`.${cardClass}`).remove();
  }
};

const changeLike = (e) => {
  if (e.target.classList.contains(cardLikeClass)) {
    e.target.classList.toggle(cardLikeActiveClass);
  }
};

const renderCard = (parentNode, childNode) => {
  parentNode.prepend(childNode);
};

const togglePopup = (element) => {
  element.classList.toggle(popupOpenClass);
};

const closePopup = () => {
  const openedPopup = document.querySelector(`.${popupOpenClass}`);
  if (openedPopup) {
    togglePopup(openedPopup);
  }
};

const closePopupKey = (event) => {
  if (event.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', closePopupKey);
  }
};

const removeCloseEvents = () => {
  document.removeEventListener('keydown', closePopupKey);
};

const setCloseEvents = () => {
  document.addEventListener('keydown', closePopupKey);
};

const showImgPopup = (e) => {
  if (e.target.classList.contains(cardImgClass)) {
    img.src = e.target.src;
    imgTitle.textContent = e.target.closest(`.${cardClass}`).querySelector(`.${cardTitleClass}`).textContent;
    img.alt = e.target.alt;
    togglePopup(imgPopup);
    setCloseEvents();
  }
};

const addTextFromDOMtoInput = () => {
  nameInput.value = nameField.textContent;
  jobInput.value = jobField.textContent;
};

const formSubmitHandlerEdit = (event) => {
  event.preventDefault();
  nameField.textContent = nameInput.value;
  jobField.textContent = jobInput.value;
  closePopup();
  removeCloseEvents();
};

const resetInputs = (imgInput, linkInput) => {
  imgInput.value = '';
  linkInput.value = '';
};

const formSubmitHandlerAdd = (event) => {
  event.preventDefault();
  renderCard(sectionElement, cloneCards(imgInput.value, linkInput.value));
  resetInputs(imgInput, linkInput);
  closePopup();
  removeCloseEvents();
};

const closePopupOverlay = (e) => {
  if (e.target.classList.contains(popupNameClass) || e.target.classList.contains(closeIconClass)) {
    closePopup();
    removeCloseEvents();
  }
};

const setButtonCloseEvents = () => {
  allPopups.forEach((elem) => {
    elem.addEventListener('click', closePopupOverlay);
  });
};

const showCards = () => {
  initialCards.forEach(({name, link, alt}) => {
    renderCard(sectionElement, cloneCards(name, link, alt));
  });
};

setButtonCloseEvents();
showCards();
addTextFromDOMtoInput();

popupEditButton.addEventListener('click', () => {
  addTextFromDOMtoInput();
  togglePopup(editPopup);
  setCloseEvents();
});
popupAddButton.addEventListener('click', () => {
  togglePopup(addPopup);
  setCloseEvents();
});
editForm.addEventListener('submit', formSubmitHandlerEdit);
addForm.addEventListener('submit', formSubmitHandlerAdd);
sectionElement.addEventListener('click', changeLike);
sectionElement.addEventListener('click', removeCard);
sectionElement.addEventListener('click', showImgPopup);