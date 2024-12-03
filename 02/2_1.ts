function countSafeReports(reports: string[]) {
  let count = 0;
  for (const reportString of reports) {
    if (!reportString) {
      continue;
    }

    const report = reportString.split(/\s+/).map(Number);
    if (isSafeReport(report)) {
      count++;
    }
  }

  return count;
}

function isSafeReport(report: number[]) {
  const sign = Math.sign(report[1] - report[0]);
  if (sign === 0) {
    return false;
  }

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.sign(diff) !== sign || Math.abs(diff) > 3) {
      return false;
    }
  }

  return true;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const text = await Deno.readTextFile(filename);
  const reports = text.split("\n");
  console.log(countSafeReports(reports));
}
