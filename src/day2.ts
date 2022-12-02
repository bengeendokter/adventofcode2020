import * as fs from "fs";

export default function day(): number
{
	const fileContent: string = fs.readFileSync("input/day2.txt", "utf-8");

	//const /
	const stringToItem: Map<string, string> = new Map([
		["A", "R"],
		["B", "P"],
		["C", "S"],
		["X", "R"],
		["Y", "P"],
		["Z", "S"],
	]);

	const SCORE = 
	{
		R: 1,
		P: 2,
		S: 3,
		LOSE: 0,
		DRAW: 3,
		WIN: 6,
	};


//["A",
	const itemToScore: Map<string, number> = new Map([
		["R", SCORE.R],
		["P", SCORE.P],
		["S", SCORE.S],	
	]); 

	const rockScoreMap: Map<string, number> = new Map([
		["R", SCORE.DRAW],
		["P", SCORE.LOSE],
		["S", SCORE.WIN],
	]);

	const paperScoreMap: Map<string, number> = new Map([
		["R", SCORE.WIN],
		["P", SCORE.DRAW],
		["S", SCORE.LOSE],
	]);

	const scizzorsScoreMap: Map<string, number> = new Map([
		["R", SCORE.LOSE],
		["P", SCORE.WIN],
		["S", SCORE.DRAW],
	]);

	const rockToYou: Map<string, string> = new Map([
		["X", "S"],
		["Y", "R"],
		["Z", "P"],
	]);

	const paperToYou: Map<string, string> = new Map([
		["X", "R"],
		["Y", "P"],
		["Z", "S"],
	]);

	const scizzorsToYou: Map<string, string> = new Map([
		["X", "P"],
		["Y", "S"],
		["Z", "R"],
	]);

	const elfToYouMap = new Map([
		["A", rockToYou],
		["B", paperToYou],
		["C", scizzorsToYou],
	]);

	function matchToScore(you: string, elf: string): number
	{
		const itemScore: number = itemToScore.get(you);

		let matchScore: number = 0;

		if(you === "R")
		{
			matchScore = rockScoreMap.get(elf);
		}
		else if(you === "P")
		{
			matchScore = paperScoreMap.get(elf);
		}
		else // you == "S"
		{
			matchScore = scizzorsScoreMap.get(elf);
		}
		
		return itemScore + matchScore;
	};

	//let itemScore: number = 0;
	//let matchScore: number = 0

	const lineList: Array<string> = fileContent.split("\n").filter(line => line.length !== 0);
	const matchList = lineList.map(line => line.split(" "));
	const scoreList: Array<number> = matchList.map(([elf, you]) => matchToScore(elfToYouMap.get(elf).get(you), stringToItem.get(elf)));
	console.log(scoreList);
	console.log(scoreList[scoreList.length - 1]);
	console.log(scoreList[scoreList.length - 2]);
	return scoreList.reduce((total, score) => total + score);// + matchS;
}
