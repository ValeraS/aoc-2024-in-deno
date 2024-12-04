function countWords(puzzle: string[], word: string) {
  let totalWords = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      totalWords += countWordsInPosition(puzzle, word, i, j);
    }
  }
  return totalWords;
}

function countWordsInPosition(
  puzzle: string[],
  word: string,
  i: number,
  j: number,
) {
  if (word[0] !== puzzle[i][j]) {
    return 0;
  }

  const wordLength = word.length;
  const maxI = puzzle.length;
  const maxJ = puzzle[i].length;
  let count = 0;
  // right
  if (maxJ - j >= wordLength) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i][j + k] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // left
  if (j >= wordLength - 1) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i][j - k] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // up
  if (i >= wordLength - 1) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i - k][j] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // down
  if (maxI - i >= wordLength) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i + k][j] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // right / down
  if (maxJ - j >= wordLength && maxI - i >= wordLength) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i + k][j + k] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // right / up
  if (maxJ - j >= wordLength && i >= wordLength - 1) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i - k][j + k] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // left / down
  if (j >= wordLength - 1 && maxI - i >= wordLength) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i + k][j - k] !== word[k]) {
        count--;
        break;
      }
    }
  }
  // left / up
  if (j >= wordLength - 1 && i >= wordLength - 1) {
    count++;
    for (let k = 1; k < wordLength; k++) {
      if (puzzle[i - k][j - k] !== word[k]) {
        count--;
        break;
      }
    }
  }

  return count;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countWords(puzzle, "XMAS"));
}
