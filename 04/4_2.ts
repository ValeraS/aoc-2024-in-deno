function countWords(puzzle: string[]) {
  let totalWords = 0;
  for (let i = 1; i < puzzle.length - 1; i++) {
    for (let j = 1; j < puzzle[i].length - 1; j++) {
      if (isXmas(puzzle, i, j)) {
        totalWords++;
      }
    }
  }
  return totalWords;
}

function isXmas(puzzle: string[], i: number, j: number) {
  return puzzle[i][j] === "A" &&
    (puzzle[i - 1][j - 1] === "M" && puzzle[i + 1][j + 1] === "S" ||
      puzzle[i - 1][j - 1] === "S" && puzzle[i + 1][j + 1] === "M") &&
    (puzzle[i - 1][j + 1] === "M" && puzzle[i + 1][j - 1] === "S" ||
      puzzle[i - 1][j + 1] === "S" && puzzle[i + 1][j - 1] === "M");
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countWords(puzzle));
}
