import * as fs from "fs";

export default function day1(): number
{
  const fileContent: string = fs.readFileSync("input/day1.txt", "utf-8");

  const elvesByGroup: Array<string> = fileContent.split("\n\n");

  const elvesList: Array<number> = elvesByGroup
    .map(line => line.split("\n"))
    .map(stringList =>
    {
      const numberList: Array<number> = stringList.map(stringNumber => parseInt(stringNumber));
      return numberList.reduce((acc, number) => acc + number);
    });

  elvesList.sort((a, b) => b - a);

  return elvesList.slice(0, 3).reduce((acc, number) => acc + number);
}
