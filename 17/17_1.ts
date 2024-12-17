const Memory = {
  A: 0,
  B: 0,
  C: 0,
};

function value(v: number) {
  switch (v) {
    case 0:
    case 1:
    case 2:
    case 3: {
      return v;
    }
    case 4: {
      return Memory.A;
    }
    case 5: {
      return Memory.B;
    }
    case 6: {
      return Memory.C;
    }
    default: {
      throw new Error(`Unknown value: ${v}`);
    }
  }
}

let pointer = 0;
const output: string[] = [];

function adv(n: number) {
  Memory.A = Math.floor(Memory.A / Math.pow(2, value(n)));
  pointer += 2;
}

function bxl(n: number) {
  Memory.B = Number(BigInt(Memory.B) ^ BigInt(value(n)));
  pointer += 2;
}

function bst(n: number) {
  Memory.B = value(n) % 8;
  pointer += 2;
}

function jnz(n: number) {
  if (Memory.A === 0) {
    pointer += 2;
  } else {
    pointer = value(n);
  }
}

function bxc(_n: number) {
  Memory.B = Number(BigInt(Memory.B) ^ BigInt(Memory.C));
  pointer += 2;
}

function out(n: number) {
  const v = value(n) % 8;
  output.push(`${v}`);
  pointer += 2;
}

function bdv(n: number) {
  Memory.B = Math.floor(Memory.A / Math.pow(2, value(n)));
  pointer += 2;
}

function cdv(n: number) {
  Memory.C = Math.floor(Memory.A / Math.pow(2, value(n)));
  pointer += 2;
}

const instructions = [adv, bxl, bst, jnz, bxc, out, bdv, cdv];

function runProgram(input: string[]) {
  Memory.A = Number(/\d+/.exec(input[0])![0]);
  Memory.B = Number(/\d+/.exec(input[1])![0]);
  Memory.C = Number(/\d+/.exec(input[2])![0]);

  const program = input[4].slice("Program: ".length).split(",").map(Number);
  pointer = 0;
  while (pointer < program.length) {
    instructions[program[pointer]](program[pointer + 1]);
  }
  return output.join(",");
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(runProgram(puzzle));
}
