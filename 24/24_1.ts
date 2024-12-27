function calculate(input: string[]) {
  const values: Record<string, number> = {};
  let i = 0;
  while (input[i]) {
    const [name, v] = input[i].split(": ");
    values[name] = Number(v);
    i++;
  }

  const operations: [string, string, string, string][] = [];
  for (let j = i + 1; j < input.length; j++) {
    //ntg XOR fgs -> mjb
    const [v1, op, v2, , r] = input[j].split(" ");
    operations.push([v1, op, v2, r]);
  }

  while (operations.length > 0) {
    for (let k = operations.length - 1; k >= 0; k--) {
      const [n1, op, n2, r] = operations[k];
      const v1 = values[n1];
      const v2 = values[n2];
      if (v1 !== undefined && v2 !== undefined) {
        values[r] = apply(op, v1, v2);
        operations.splice(k, 1);
      }
    }
  }

  let n = "";
  i = 0;
  while (true) {
    const name = "z" + i.toString().padStart(2, "0");
    const v = values[name];
    if (v === undefined) {
      break;
    }
    n = v + n;
    i++;
  }

  console.log(n);

  return parseInt(n, 2);
}

function apply(op: string, v1: number, v2: number) {
  switch (op) {
    case "AND": {
      return v1 & v2;
    }
    case "OR": {
      return v1 | v2;
    }
    case "XOR": {
      return v1 ^ v2;
    }
  }
  throw new Error(`Unknown operation: ${op}`);
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(calculate(puzzle));
}
