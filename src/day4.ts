import * as fs from "fs";
import { splitByNewline, sum } from "./util";

export default function day4(): number
{
  console.log("day4");
  const fileContent: string = fs.readFileSync("input/day4.txt", "utf-8");

  const elfPairList: string[] = splitByNewline(fileContent);

  const splittedElfPairList: string[][] = elfPairList.map(elfPair => elfPair.split(","));

  // part 1
  // const fullyContainsList: number[] = splittedElfPairList.map(([elf1, elf2]) =>
  // {
  //   const [elf1_start, elf1_end]: number[] = elf1.split("-").map(string => parseInt(string));
  //   const [elf2_start, elf2_end]: number[] = elf2.split("-").map(string => parseInt(string));

  //   // elf1 fullyContained in elf2
  //   if(elf1_start >= elf2_start && elf1_end <= elf2_end)
  //   {
  //     return 1;
  //   }
  //   // elf2 fullyContained in elf1
  //   else if(elf2_start >= elf1_start && elf2_end <= elf1_end)
  //   {
  //     return 1;
  //   }

  //   return 0;
  // });

  // return sum(fullyContainsList);

  // part 2
  const overlapList: number[] = splittedElfPairList.map(([elf1, elf2]) =>
  {
    const [elf1_start, elf1_end]: number[] = elf1.split("-").map(string => parseInt(string));
    const [elf2_start, elf2_end]: number[] = elf2.split("-").map(string => parseInt(string));

    if(elf1_start > elf2_end || elf2_start > elf1_end)
    {
      return 0;
    }

    return 1;
  });

  return sum(overlapList);
}
