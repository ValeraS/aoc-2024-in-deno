function getFilesystemChecksum(diskMap: string) {
  const disk: number[] = [];
  for (let i = 0; i < diskMap.length; i++) {
    const space = Number(diskMap[i]);
    if (i % 2 === 0) {
      disk.push(...new Array(space).fill(i / 2));
    } else {
      disk.push(...new Array(space).fill(-1));
    }
  }

  let i = 0;
  let j = disk.length - 1;
  while (i < j) {
    if (disk[i] !== -1) {
      i++;
      continue;
    }
    if (disk[j] === -1) {
      j--;
      continue;
    }
    disk[i] = disk[j];
    disk[j] = -1;
    i++;
    j--;
  }

  i = 0;
  let checksum = 0;
  while (i < disk.length && disk[i] !== -1) {
    checksum += disk[i] * i;
    i++;
  }

  return checksum;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(getFilesystemChecksum(puzzle[0]));
}
