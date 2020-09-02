const SONG_LIST_ITEM_STATES = {
  DEFAULT: 'initial',
  CORRECT: 'correct',
  INCORRECT: 'incorrect',
  isDefault(state) {
    return this.DEFAULT === state;
  },
  isCorrect(state) {
    return this.CORRECT === state;
  },
  isIncorrect(state) {
    return this.INCORRECT === state;
  },
};

export default {
  SONG_LIST_ITEM_STATES,
};
