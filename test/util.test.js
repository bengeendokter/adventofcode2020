import doctest from "../doctest-js/src/doctest.js";

describe("Doctests", () =>
{
  // file paths are relative to root of directory
  doctest("build/util.js");
});
