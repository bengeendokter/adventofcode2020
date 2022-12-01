import * as fs from "fs";

const content: string = fs.readFileSync("input/day1.txt", "utf-8");

const elves: Array<string> = content.split("\n\n");

const elvesList: Array<number> = elves
.map(line => line.split("\n"))
.map(list => 
    {
        const numberList: Array<number> = list.map(stringNumber => parseInt(stringNumber));
        return numberList.reduce((acc, number) => acc + number);
    })
.filter(total => !isNaN(total));

elvesList.sort((a, b) => b - a);

console.log(elvesList.slice(0, 3).reduce((acc, number) => acc + number));

export { };