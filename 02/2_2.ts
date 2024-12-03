function countSafeReports(reports: string[]) {
  let count = 0;
  for (const reportString of reports) {
    if (!reportString) {
      continue;
    }

    const report = reportString.split(/\s+/).map(Number);
    if (isSafeReport(report, true)) {
      count++;
    }
  }

  return count;
}

function isSafeReport(report: number[], allowError = false): boolean {
  const sign = Math.sign(report[1] - report[0]);
  if (sign === 0) {
    return allowError ? isSafeReport(report.slice(1)) : false;
  }

  for (let i = 1; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    const currentSign = Math.sign(diff);
    if (currentSign !== sign || Math.abs(diff) > 3) {
      if (allowError) {
        if (currentSign === 0) {
          return isSafeReport([...report.slice(0, i), ...report.slice(i + 1)]);
        }
        return (i === 2 && Math.abs(diff) < 3 &&
          isSafeReport(report.slice(1))) ||
          isSafeReport([
            ...report.slice(0, i),
            ...report.slice(i + 1),
          ]) ||
          isSafeReport([...report.slice(0, i - 1), ...report.slice(i)]);
      }
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
