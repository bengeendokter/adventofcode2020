import * as fs from "fs";
import { splitByNewline } from "./util.js";

export default function day5(): string
{
  console.log("day5");
  const fileContent: string = fs.readFileSync("input/day5.txt", "utf-8");

  const [cratesAndNumbers, steps] : string[] = fileContent.split("\n\r\n");

  const cratesLineList: string[] = cratesAndNumbers.split("\n");

  const numbers : string = cratesLineList.pop();

  const maxNumber: number = numbers
  .split(" ")
  .map(numberString => parseInt(numberString))
  .pop();

  const cratesList : string[][] = new Array(maxNumber).fill(0).map(zero => []);

  for (const line of cratesLineList)
  {
    for (let index = 1; index < line.length; index += 4)
    {
      const char = line.charAt(index);
      if(char !== " ")
      {
        cratesList[(index - 1) / 4].push(char);
      }
    }
  }

  const stepsLineList : string[] = splitByNewline(steps);
  // move 1 from 2 to 1 => [1, [2, 1]]
  const stepsList: Array<[number, number[]]> = stepsLineList
  .map(line => line.split(" from "))
  .map(([amount, fromTo]) =>
  {
    const amountInt: number = parseInt(amount.split(" ").pop());
    const fromToList: number[] = fromTo.split(" to ").map(stringNumber => parseInt(stringNumber));

    return [amountInt, fromToList];
  });

  for(const step of stepsList)
  {
    const amount: number = step[0];
    const from: number = step[1][0] - 1;
    const to: number = step[1][1] - 1;

    // part 1
    // for (let index = 0; index < amount; index++)
    // {
    //   cratesList[to].unshift(cratesList[from].shift());
    // }

    // part 2
    cratesList[to].unshift(...cratesList[from].splice(0, amount));
  }

  return cratesList.map(list => list.shift()).join("");
}
