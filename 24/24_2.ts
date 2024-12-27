function findWrongWires(input: string[]) {
  const values: Record<string, number> = {};
  let i = 0;
  while (input[i]) {
    const [name, v] = input[i].split(": ");
    values[name] = Number(v);
    i++;
  }

  let last_z_index = 0;
  const operations: [string, string, string, string][] = [];
  for (let j = i + 1; j < input.length; j++) {
    //ntg XOR fgs -> mjb
    const [v1, op, v2, , r] = input[j].split(" ");
    operations.push([v1, op, v2, r]);
    if (r.startsWith("z") && last_z_index < Number(r.slice(1))) {
      last_z_index = Number(r.slice(1));
    }
  }

  const last_z = `z${last_z_index.toString().padStart(2, "0")}`;

  const wrong = new Set<string>();
  for (const [x, op, y, z] of operations) {
    if (z[0] === "z" && op !== "XOR" && z !== last_z) {
      wrong.add(z);
    } else if (
      op === "XOR" && z[0] !== "z" &&
      !["x", "y"].includes(x[0]) && !["x", "y"].includes(y[0])
    ) {
      wrong.add(z);
    } else if (op === "AND" && ![x, y].includes("x00")) {
      for (const [x1, op1, y1] of operations) {
        if ((z === x1 || z === y1) && op1 !== "OR") {
          wrong.add(z);
        }
      }
    } else if (op === "XOR") {
      for (const [x1, op1, y1] of operations) {
        if ((z === x1 || z === y1) && op1 === "OR") {
          wrong.add(z);
        }
      }
    }
  }

  return [...wrong].sort().join(",");
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(findWrongWires(puzzle));
}
