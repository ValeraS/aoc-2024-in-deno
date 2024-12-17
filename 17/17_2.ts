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
let output: number[] = [];

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
  output.push(v);
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

function initProgram(A: number) {
  Memory.A = A;
  Memory.B = 0;
  Memory.C = 0;
  output = [];
  pointer = 0;
}

/*
  2,4, 1,3, 7,5, 4,1, 1,3, 0,3, 5,5, 3,0
  B = A % 8 // 2, 4
  B = B xor 3 // 1, 3
  C = [A / 2^B] // 7, 5
  B = B xor C // 4, 1
  B = B xor 3 // 1, 3  1
  A = [A / 8] // 0, 3
  output B % 8 // 5, 5
  jmp 0 // 3, 0

  This only works because we know that A decreases by a factor of 8 at each step.
*/
function findA(program: number[], index: number, initial: number): number {
  for (let i = 0; i < 8; i++) {
    const A = initial + Math.pow(8, index) * i;
    initProgram(A);
    while (pointer < program.length) {
      instructions[program[pointer]](program[pointer + 1]);
    }
    if (output[index] === program[index]) {
      if (index === 0) {
        return A;
      }

      const ans = findA(program, index - 1, A);
      if (ans !== -1) {
        return ans;
      }
    }
  }
  return -1;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  const program = puzzle[4].slice("Program: ".length).split(",").map(Number);
  console.log(findA(program, program.length, 0));
}
