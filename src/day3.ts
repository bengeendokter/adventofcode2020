import * as fs from "fs";

export default function day(): number
{
  console.log("day3");
  const fileContent: string = fs.readFileSync("input/day3.txt", "utf-8");

  function charToPriority(char: string): number
  {
    const charCode: number = char.charCodeAt(0);

    if(charCode > 90) // lowercase
    {
      return charCode - 96; // start at 1
    }
    else // uppercase
    {
      return charCode - 38; // start at 27
    }
  }

  function groupByN(rsList: string[], n: number = 3): string[][]
  {
    let result: string[][] = [];

    for (let index = 0; index < rsList.length; index += n)
    {
      result.push(rsList.slice(index, index + n));
    }

    return result;
  }

  const rucksackList: string[] = fileContent
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length !== 0);

  // part 1
  // const rucksackHalvesList: string[][] = rucksackList
  //   .map(rs => [rs.slice(0, rs.length / 2), rs.slice(rs.length / 2, rs.length)]);

  // const wrongItemList: string[] = rucksackHalvesList
  //   .map(([halve1, halve2]) => [...halve1].find(char => halve2.includes(char)));

  // const priorityList: number[] = wrongItemList.map(charToPriority);
  // return priorityList.reduce((total, priority) => total + priority);

  // part 2
  const elfGroupList: string[][] = groupByN(rucksackList);

  const badgeList: string[] = elfGroupList
  .map(([g1, g2, g3]) => [...g1].find(char => g2.includes(char) && g3.includes(char)));

  const priorityList: number[] = badgeList.map(charToPriority);
  return priorityList.reduce((total, priority) => total + priority);
}
