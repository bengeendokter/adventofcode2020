/**
 * Turns a multiline string into a list of strings splitted by every newline.
 * Also trims whitespace.
 * @param {string} fileContent Multiline string content
 * @param {boolean} [noEmptyLine] Boolean to remove empty lines
 * @returns {string[]} A list of lines
 */
export function splitByNewline(fileContent: string, noEmptyLine: boolean = true): string[]
{
  const lines = fileContent
    .split("\n")
    .map(line => line.trim());

  if(noEmptyLine)
  {
    return lines.filter(line => line.length !== 0);
  }

  return lines;
}

/**
 * Returns the total sum of a list of numbers
 * @param {number[]} numberList A list of numbers
 * @returns {number} The total sum
 * @example
 *  sum([2, 3])
 *  5
 *  sum([8, 1, 1])
 *  // => 5
 */
export function sum(numberList: number[]): number
{
  return numberList.reduce((total, number) => total + number);
}
