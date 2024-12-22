function countSumOfComplexities(codes: string[]) {
  let sum = 0;
  for (const code of codes) {
    sum += finalShortestPath(code, 2).length * parseInt(code, 10);
  }

  return sum;
}

const numericKeyboard: Record<string, [number, number]> = {
  "A": [3, 4],
  "0": [2, 4],
  "1": [1, 3],
  "2": [2, 3],
  "3": [3, 3],
  "4": [1, 2],
  "5": [2, 2],
  "6": [3, 2],
  "7": [1, 1],
  "8": [2, 1],
  "9": [3, 1],
};

const emptyPlaceNumericKeyboard: [number, number] = [1, 4];

const directionalKeyboard: Record<string, [number, number]> = {
  "A": [3, 1],
  "^": [2, 1],
  ">": [3, 2],
  "v": [2, 2],
  "<": [1, 2],
};

const emptyPlaceDirectionalKeyboard: [number, number] = [1, 1];

function finalShortestPath(code: string, numberOfDirectionalKeyboards: number) {
  let path = shortestPath(code, numericKeyboard, emptyPlaceNumericKeyboard);
  for (let i = 0; i < numberOfDirectionalKeyboards; i++) {
    path = shortestPath(
      path,
      directionalKeyboard,
      emptyPlaceDirectionalKeyboard,
    );
  }

  return path;
}

function shortestPath(
  code: string,
  keyboard: Record<string, [number, number]>,
  empty: [number, number],
) {
  const path: string[] = [];
  let current = keyboard["A"];
  for (const button of code) {
    const newCoordinate = keyboard[button];
    const diff = [current[0] - newCoordinate[0], current[1] - newCoordinate[1]];
    if (
      newCoordinate[0] === empty[0] &&
        current[1] === empty[1] || diff[1] < 0
    ) {
      path.push(...new Array(Math.abs(diff[1])).fill(diff[1] > 0 ? "^" : "v"));
      path.push(...new Array(Math.abs(diff[0])).fill(diff[0] > 0 ? "<" : ">"));
    } else {
      path.push(...new Array(Math.abs(diff[0])).fill(diff[0] > 0 ? "<" : ">"));
      path.push(...new Array(Math.abs(diff[1])).fill(diff[1] > 0 ? "^" : "v"));
    }
    path.push("A");
    current = newCoordinate;
  }

  return path.join("");
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(countSumOfComplexities(puzzle));
}
