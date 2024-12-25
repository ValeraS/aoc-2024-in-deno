function countParties(input: string[]) {
  const map = new Map<string, string[]>();
  for (const line of input) {
    const [a, b] = line.split("-");
    const aConnections = map.get(a) ?? [];
    aConnections.push(b);
    map.set(a, aConnections);
    const bConnections = map.get(b) ?? [];
    bConnections.push(a);
    map.set(b, bConnections);
  }

  let biggestParty: string[] = [];
  for (const [computer, connections] of map) {
    const parties: string[][] = [];
    for (const comp of connections) {
      for (const p of parties) {
        if (p.every((c) => map.get(c)?.includes(comp))) {
          p.push(comp);
        }
      }
      parties.push([comp]);
    }

    for (const p of parties) {
      if (p.length + 1 > biggestParty.length) {
        biggestParty = [...p, computer];
      }
    }
  }

  return biggestParty.sort().join(",");
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(
    countParties(puzzle),
  );
}
