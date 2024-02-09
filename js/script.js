import selection from './selection.js';
import * as view from './model.js';

const gridElement = document.querySelector('.grid-container');
const section2 = document.querySelector('.section-2');
const htmlMarkup = document.querySelector('.html-code');
const cssMarkup = document.querySelector('.css-code');
const starter = document.querySelector('.starter');
const menu = document.querySelector('.menu');
let interval = setInterval(null, 1000);
clearInterval(interval);

const starterGrid = function (size) {
  view.currentItems.length = 0;
  view.modifyItemNumber(0, true);
  const ratio = window.innerWidth / window.innerHeight;
  const rows = Math.floor(window.innerWidth / ratio / size);
  const cols = Math.floor(window.innerHeight / size);
  view.addRowsCols(cols, rows);

  let markup = '';
  for (let i = 1; i <= rows; i++) {
    markup += `<div class="row row-${i}">`;
    for (let j = 1; j <= cols; j++) {
      markup += `<div class="cell selectable col-${j} row-${i}" data-location="${i} / ${j}"></div>`;
    }
    markup += `</div>`;
  }
  gridElement.insertAdjacentHTML('afterbegin', markup);
  view.clearMarkups();
};
const gridSizeMaker = function (e) {
  if (e.target.classList.contains('grid-size-1')) {
    gridElement.innerHTML = '';
    starterGrid(32);
  }
  if (e.target.classList.contains('grid-size-2')) {
    gridElement.innerHTML = '';
    starterGrid(64);
  }
  if (e.target.classList.contains('grid-size-3')) {
    gridElement.innerHTML = '';
    starterGrid(128);
  }
};

const selectShape = function (e) {
  if (e.target.name === 'pie-chart-outline') {
    interval = setInterval(
      () => gridElement.firstChild.firstChild.classList.toggle('marked'),
      500
    );
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  }
};

const safeItem = function (e) {
  if (e.target.name === 'save-outline') {
    const itemNum = view.itemNumber;
    view.addSelectedItem([itemNum, ...selection.getSelection()]);
    selection.getSelection().forEach(el => {
      el.classList.add(`item-color-${itemNum}`);

      el.classList.remove('selectable');
    });
    view.modifyItemNumber(1);
  }
};

const undoSafeItem = function (e) {
  if (!view.currentItems.length) return;
  if (e.target.name === 'arrow-back-outline') {
    const undoElements = view.undoSelection();
    const classToRemove = `item-color-${undoElements[0]}`;
    undoElements.slice(1).forEach(el => {
      el.classList.remove(classToRemove);
      el.classList.remove('marked');
      el.classList.add('selectable');
    });
  }
};

const resetGrid = function (e) {
  if (!view.currentItems.length) return;
  if (e.target.name === 'refresh-outline') {
    view.currentItems.forEach(el => {
      el.slice(1).forEach(elem => {
        elem.classList.remove(`item-color-${el[0]}`);
        elem.classList.remove('marked');
        elem.classList.add('selectable');
      });
    });
    view.currentItems.length = 0;
    view.modifyItemNumber(0, true);
  }
};

const showCode = function (e) {
  if (!view.currentItems.length) return;
  if (e.target.name === 'code-download-outline') {
    section2.scrollIntoView({
      behavior: 'smooth',
    });
    view.clearMarkups();
    view.createMarkups();
    htmlMarkup.innerText = view.htmlMarkup;
    cssMarkup.innerText = view.cssMarkup;
  }
};

const startApp = function () {
  starter.addEventListener('click', () => {
    starter.classList.add('move');
    gridElement.classList.remove('background-img');
  });

  starterGrid(64);
  // start selecting imterval removing
  gridElement.addEventListener('click', e => {
    clearInterval(interval);
    gridElement.firstChild.firstChild.classList.remove('marked');

    if (
      e.target === gridElement.firstChild.firstChild ||
      selection.getSelection()[0] === gridElement.firstChild.firstChild
    )
      gridElement.firstChild.firstChild.classList.add('marked');
  });
  // menu listener
  menu.addEventListener('click', e => {
    if (!e.target.classList.contains('icon')) return;
    gridSizeMaker(e);
    selectShape(e);
    safeItem(e);
    undoSafeItem(e);
    resetGrid(e);
    showCode(e);
  });
  section2.addEventListener('click', e => {
    if (e.target.classList.contains('btn-up'))
      scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  });
};

startApp();
