const getRandomId = (length) => Math.floor(Math.random() * length);

/**
 * Shuffles the given array by Fisher and Yates method
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method
 * @param {Array|HTMLCollection} arr source array which must be shuffled
 * @returns {Array|HTMLCollection} shuffled array of elements
 */
const shuffleFisherYates = (array) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const randomIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randomIdx]] = [arr[randomIdx], arr[i]]; // swap elements
  }
  return arr;
};

/**
 * Shuffles the given array by Fisher and Yates method
 * and guarantees that numbers from shuffled array are not equal to
 * the items from source array
 * @param {Array|HTMLCollection} arr source array which must be shuffled
 * @returns {Array|HTMLCollection} shuffled array of elements
 */
const shuffle = (array) => {
  const arr = [...array];

  // Fisher and Yates method
  const shuffledArr = shuffleFisherYates(arr);

  for (let i = 0, LENGTH = shuffledArr.length; i < LENGTH; i += 1) {
    const isEqualItems = shuffledArr[i] === arr[i];
    const isNextItemLast = i + 1 === LENGTH;

    if (isEqualItems && isNextItemLast) {
      // reach the end? -> swap first & last element
      [shuffledArr[i], shuffledArr[0]] = [shuffledArr[0], shuffledArr[i]];
    } else if (isEqualItems && !isNextItemLast) {
      // default action -> swap this & last element
      const LAST_IDX = LENGTH - 1;

      [shuffledArr[i], shuffledArr[LAST_IDX]] = [shuffledArr[LAST_IDX], shuffledArr[i]];
    }
  }

  return shuffledArr;
};

export default {
  getRandomId,
  shuffleFisherYates,
  shuffle,
};
