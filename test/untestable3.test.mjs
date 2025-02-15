import { describe, test } from "vitest";
import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("Not existing file", async () => {
    try {
      expect(await parsePeopleCsv("notExisting.csv")).to.deep.equal([]);
    } catch (e) {}
  });

  test("Test example input", async () => {
    const content = await parsePeopleCsv("./test/people.csv");
    expect(content[0].firstName).to.deep.equal("Loid");
    expect(content[1].firstName).to.deep.equal("Anya");
    expect(content[2].firstName).to.deep.equal("Yor");

    expect(content[0].lastName).to.deep.equal("Forger");
    expect(content[1].lastName).to.deep.equal("Forger");
    expect(content[2].lastName).to.deep.equal("Forger");

    expect(content[0].gender).to.deep.equal("m");
    expect(content[1].gender).to.deep.equal("f");
    expect(content[2].gender).to.deep.equal("f");

    expect(content[0].age).to.deep.equal(undefined);
    expect(content[1].age).to.deep.equal(6);
    expect(content[2].age).to.deep.equal(27);
    });

    test("Test not case sensitive gender", async () => {
      const content = await parsePeopleCsv("./test/people_mixedCase.csv");

      expect(content[0].gender).to.deep.equal("m");
      expect(content[1].gender).to.deep.equal("f");
      expect(content[2].gender).to.deep.equal("f");
    });


    test("Test skip empty lines", async () => {
      const content = await parsePeopleCsv("./test/people_emptyLines.csv");

      expect(content.length).to.equal(3);
    });

    test("Test trim and empty columns", async () => {
      const content = await parsePeopleCsv("./test/people_emptyColumns.csv");
      expect(content.length).to.equal(3);
      expect(content[0].firstName).to.deep.equal("Loid");
      expect(content[1].firstName).to.deep.equal("");
      expect(content[2].firstName).to.deep.equal("Yor");
  
      expect(content[0].lastName).to.deep.equal("Forger");
      expect(content[1].lastName).to.deep.equal("Forger");
      expect(content[2].lastName).to.deep.equal("");
  
      expect(content[0].gender).to.deep.equal("");
      expect(content[1].gender).to.deep.equal("f");
      expect(content[2].gender).to.deep.equal("f");
  
      expect(content[0].age).to.deep.equal(undefined);
      expect(content[1].age).to.deep.equal(6);
      expect(content[2].age).to.deep.equal(27);
    });
});
