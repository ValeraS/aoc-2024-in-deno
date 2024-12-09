function getFilesystemChecksum(diskMap: string) {
  const disk: number[] = [];
  const files: { id: number; start: number; space: number }[] = [];
  const freeSpaces: { start: number; space: number }[] = [];
  for (let i = 0; i < diskMap.length; i++) {
    const space = Number(diskMap[i]);
    if (i % 2 === 0) {
      files.push({ id: i / 2, space, start: disk.length });
      disk.push(...new Array(space).fill(i / 2));
    } else {
      freeSpaces.push({ space, start: disk.length });
      disk.push(...new Array(space).fill(-1));
    }
  }

  while (files.length > 0) {
    const file = files.pop()!;
    let i = 0;
    while (
      i < freeSpaces.length && freeSpaces[i].space < file.space
    ) {
      i++;
    }
    if (i === freeSpaces.length || freeSpaces[i].start > file.start) {
      continue;
    }
    const freeSpace = freeSpaces[i];
    for (let j = 0; j < file.space; j++) {
      disk[freeSpace.start + j] = file.id;
      disk[file.start + j] = -1;
    }
    freeSpace.start += file.space;
    freeSpace.space -= file.space;
  }

  let i = 0;
  let checksum = 0;
  while (i < disk.length) {
    if (disk[i] !== -1) {
      checksum += disk[i] * i;
    }
    i++;
  }

  return checksum;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(getFilesystemChecksum(puzzle[0]));
}
