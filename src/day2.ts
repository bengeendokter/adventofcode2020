import * as fs from "fs";

export default function day(): number
{
  console.log("day2");
  class InputError extends Error
  {
    constructor(message = "Input is not correct")
    {
      super(message);
      this.name = "InputError";
    }
  }

  const fileContent: string = fs.readFileSync("input/day2.txt", "utf-8");

  const elfInput = ["A", "B", "C"] as const;
  type ElfInput = (typeof elfInput)[number];
  const isElfInput = (x: any): x is ElfInput => elfInput.includes(x);

  const youInput = ["X", "Y", "Z"] as const;
  type YouInput = (typeof youInput)[number];
  const isYouInput = (x: any): x is YouInput => youInput.includes(x);

  const input = [...elfInput, ...youInput] as const;
  type Input = (typeof input)[number];
  const isInput = (x: any): x is Input => isElfInput(x) || isYouInput(x);

  type Item = "R" | "P" | "S";

  const stringToItem: Map<Input, Item> = new Map([
    ["A", "R"],
    ["B", "P"],
    ["C", "S"],
    ["X", "R"],
    ["Y", "P"],
    ["Z", "S"],
  ]);

  const SCORE: { readonly [key: string]: number } =
  {
    R: 1,
    P: 2,
    S: 3,
    LOSE: 0,
    DRAW: 3,
    WIN: 6,
  };

  const itemToScore: Map<Item, number> = new Map([
    ["R", SCORE.R],
    ["P", SCORE.P],
    ["S", SCORE.S],
  ]);

  const rockScoreMap: Map<Item, number> = new Map([
    ["R", SCORE.DRAW],
    ["P", SCORE.LOSE],
    ["S", SCORE.WIN],
  ]);

  const paperScoreMap: Map<Item, number> = new Map([
    ["R", SCORE.WIN],
    ["P", SCORE.DRAW],
    ["S", SCORE.LOSE],
  ]);

  const scissorsScoreMap: Map<Item, number> = new Map([
    ["R", SCORE.LOSE],
    ["P", SCORE.WIN],
    ["S", SCORE.DRAW],
  ]);

  const rockToYou: Map<YouInput, Item> = new Map([
    ["X", "S"],
    ["Y", "R"],
    ["Z", "P"],
  ]);

  const paperToYou: Map<YouInput, Item> = new Map([
    ["X", "R"],
    ["Y", "P"],
    ["Z", "S"],
  ]);

  const scissorsToYou: Map<YouInput, Item> = new Map([
    ["X", "P"],
    ["Y", "S"],
    ["Z", "R"],
  ]);

  const elfToYouMap: Map<ElfInput, Map<YouInput, Item>> = new Map([
    ["A", rockToYou],
    ["B", paperToYou],
    ["C", scissorsToYou],
  ]);

  const youToScoreMap: Map<Item, Map<Item, number>> = new Map([
    ["R", rockScoreMap],
    ["P", paperScoreMap],
    ["S", scissorsScoreMap],
  ]);

  function matchToScore(elf: Input, you: Input): number
  {
    if(!isElfInput(elf) || !isYouInput(you))
    {
      throw new InputError();
    }

    const elfItem = stringToItem.get(elf);
    const youItem = elfToYouMap.get(elf).get(you);

    const itemScore: number = itemToScore.get(youItem);

    let matchScore: number = youToScoreMap.get(youItem).get(elfItem);

    return itemScore + matchScore;
  };

  const lineList: string[] = fileContent.split("\n").filter(line => line.length !== 0);
  const matchList: Input[][] = lineList.map(line =>
  {
    const list: string[] = line.split(" ");
    const listTrimmed: string[] = list.map(listItem => listItem.trim());
    if(!listTrimmed.every(isInput))
    {
      throw new InputError();
    }

    return listTrimmed;
  });
  const scoreList: number[] = matchList.map(([elf, you]) => matchToScore(elf, you));

  return scoreList.reduce((total, score) => total + score);
}
