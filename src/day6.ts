import * as fs from "fs";

export default function day6(): number
{
  console.log("day6");
  const fileContent: string = fs.readFileSync("input/day6.txt", "utf-8");
  // const test1: string = "bvwbjplbgvbhsrlpgdmjqwftvncz"; // 5
  // const test2: string = "nppdvjthqldpwncqszvftbrmjlhg"; // 6
  // const test3: string = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"; // 10
  // const test4: string = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"; // 11

  // const test5: string = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"; // 19
  // const test6: string = "bvwbjplbgvbhsrlpgdmjqwftvncz"; // 23
  // const test7: string = "nppdvjthqldpwncqszvftbrmjlhg"; // 23
  // const test8: string = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"; // 29
  // const test9: string = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"; // 26

  const charList: string[] = [...fileContent];

  // part 1
  // const PACKET_SIZE: number = 4;
  // part 2
  const PACKET_SIZE: number = 14;
  let index: number = PACKET_SIZE - 1;
  const lastCharacters: string[] = charList.slice(0, PACKET_SIZE);
  let isPacketFound: boolean = false;

  while(!isPacketFound)
  {
    const fourCharSet: Set<string> = new Set(lastCharacters);
    if(fourCharSet.size == PACKET_SIZE)
    {
      isPacketFound = true;
    }

    index++;
    lastCharacters.shift();
    lastCharacters.push(charList[index]);
  }

  return index;
}
