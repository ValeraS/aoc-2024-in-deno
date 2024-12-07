function getTotalCalibrationResult(puzzle: string[]) {
  let total = 0;
  for (const line of puzzle) {
    const [resStr, numbersStr] = line.split(": ");
    const res = Number(resStr);
    const numbers = numbersStr.split(/\s+/).map(Number);
    if (isValidEquation(res, numbers)) {
      total += res;
    }
  }
  return total;
}

const operatorsMap = {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
  "||": (a: number, b: number) => Number(`${a}${b}`),
} as const;

const operators = ["+", "*", "||"] as const;

function* combinations<T>(
  iterable: readonly T[],
  length: number,
): Generator<T[]> {
  const indexes = new Array(length).fill(0);
  yield indexes.map((i) => iterable[i]);
  while (true) {
    let i = length - 1;
    for (; i >= 0; i--) {
      if (indexes[i] < iterable.length - 1) {
        break;
      }
    }
    if (i < 0) {
      return;
    }
    indexes[i]++;
    indexes.fill(0, i + 1);
    yield indexes.map((i) => iterable[i]);
  }
}

function isValidEquation(res: number, numbers: number[]) {
  for (const combination of combinations(operators, numbers.length - 1)) {
    let subResult = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
      subResult = operatorsMap[combination[i - 1]](subResult, numbers[i]);
      if (subResult > res) {
        break;
      }
    }
    if (subResult === res) {
      return true;
    }
  }
  return false;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(getTotalCalibrationResult(puzzle));
}
