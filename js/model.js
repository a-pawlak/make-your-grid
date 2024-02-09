let cols = 0;
let rows = 0;
export const currentItems = [];
export let itemNumber = 0;
export let htmlMarkup = '';
export let cssMarkup = '';

export const addSelectedItem = function (selection) {
  currentItems.push(selection);
};

export const addRowsCols = function (colNum, rowNum) {
  cols = colNum;
  rows = rowNum;
};

export const undoSelection = function () {
  return currentItems.pop();
};

export const modifyItemNumber = function (num, reset = false) {
  if (!reset) {
    itemNumber += num;
  } else itemNumber = 0;
};

export const clearMarkups = function () {
  htmlMarkup = '';
  cssMarkup = '';
};

export const createMarkups = function () {
  cssMarkup += `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        height: 100vh;
      }

      .grid-container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(${cols}, 1fr);
        grid-template-rows: repeat(${rows}, 1fr);
      }

      // Make items visible
      .grid-container > div {
        border: 1px solid #586f7c60;
        padding: 12px 12px;
        font-size: 0.8rem;
        color: #586f7c;
        text-transform: uppercase;
      }
  `;
  htmlMarkup += `
  <div class="grid-container">`;

  currentItems.forEach(el => {
    cssMarkup += `
      .item-${el[0]} {
        grid-area: ${el[1].dataset.location} / ${
      +el[el.length - 1].dataset.location.slice(0, 2) + 1
    } / ${+el[el.length - 1].dataset.location.slice(-2) + 1}
      }
    `;
    htmlMarkup += `
      <div class="item-${el[0]}">Item ${el[0]}</div> `;
  });
  htmlMarkup += `
  </div>`;
};
