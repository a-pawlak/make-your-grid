import SelectionArea from 'https://cdn.jsdelivr.net/npm/@viselect/vanilla/dist/viselect.mjs';

const selection = new SelectionArea({
  selectables: ['.grid-container > .row > .selectable '],
  boundaries: ['.grid-container'],
})
  .on('start', ({ store, event }) => {
    if (!event.ctrlKey && !event.metaKey) {
      for (const el of store.stored) {
        el.classList.remove('marked');
      }

      selection.clearSelection();
    }
  })
  .on(
    'move',
    ({
      store: {
        changed: { added, removed },
      },
    }) => {
      for (const el of added) {
        el.classList.add('marked');
      }

      for (const el of removed) {
        el.classList.remove('marked');
      }
    }
  );
export default selection;
