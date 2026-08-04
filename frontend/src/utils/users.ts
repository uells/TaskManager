export function shortenFullName(fullName: string): string {
  const parted = fullName.split(" ");
  if (parted.length === 0) {
    return "";
  }
  if (parted.length === 1) {
    return parted[0];
  }
  if (parted.length === 2) {
    const family = parted[0];
    const name = parted[1][0] + ".";
    return family + " " + name;
  }

  const family = parted[0];
  const name = parted[1][0] + ".";
  const patronymic = parted[2][0] + ".";
  return family + " " + name + " " + patronymic;
}
