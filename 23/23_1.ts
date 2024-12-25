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

  const paths = new Set<string>();
  for (const computer of map.keys()) {
    if (!computer.startsWith("t")) {
      continue;
    }
    const parties = findPaths(map, computer, computer, 3);
    for (const p of parties) {
      paths.add(p);
    }
  }

  return paths.size;
}

function findPaths(
  map: Map<string, string[]>,
  start: string,
  finish: string,
  pathLength: number,
) {
  const queue: string[][] = [[start]];
  const paths = new Set<string>();
  while (queue.length > 0) {
    const path = queue.shift()!;
    const connections = map.get(path.at(-1)!)!;
    const isLast = path.length === pathLength;
    for (const connection of connections) {
      if (connection === finish && isLast) {
        paths.add(path.sort().join(","));
      }
      if (!isLast && !path.includes(connection)) {
        queue.push([...path, connection]);
      }
    }
  }
  return paths;
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(
    countParties(puzzle),
  );
}
