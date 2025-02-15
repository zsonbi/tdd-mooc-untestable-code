import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue, diceRoll } from "../src/untestable2-testable.mjs";

describe("Untestable 2: a dice game", () => {
  test("Test roll truly random", () => {

    const rolledValues = new Set();
    //Really small chance to not have all of the numbers
    for (let index = 0; index < 10000; index++) {
      const result = diceRoll();
      rolledValues.add(result);
    }
    const allNumbersRolled = [...Array(6).keys()].map(i => i + 1).every(num => rolledValues.has(num));
    expect(allNumbersRolled).to.equal(true);
  });

  test("Equal dice num", ()=>{
    for (let diceNum = 1; diceNum <= 6; diceNum++) {
      const score = diceHandValue(diceNum,diceNum);
      expect(score).to.equal(100+diceNum);
    }
  });

  test("First dice bigger", ()=>{
    for (let diceNum = 1; diceNum <= 5; diceNum++) {
      const score = diceHandValue(6,diceNum);
      expect(score).to.equal(6);
    }
  });

  test("Second dice bigger", ()=>{
    for (let diceNum = 1; diceNum <= 5; diceNum++) {
      const score = diceHandValue(diceNum,6);
      expect(score).to.equal(6);
    }
  });

  test("Small numbers", ()=>{
      const score = diceHandValue(1,2);
      expect(score).to.equal(2);
});



});