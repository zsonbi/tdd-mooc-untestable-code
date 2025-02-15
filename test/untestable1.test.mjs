import { describe, test,afterEach, beforeEach, expect } from "vitest";
import { expect } from "chai";
import { DateWrapper, getChristmasDate, daysUntilChristmas } from "../src/untestable1-testable.mjs";

describe("Untestable 1: days until Christmas", () => {
  afterEach(() => {
    DateWrapper.clearFixedDate();
  });

  test("10 days before christmas", () => {
    DateWrapper.setFixedDate(new Date("2024-12-15"));

    expect(daysUntilChristmas()).to.equal(10);
  });

  test("0 days before christmas", () => {
    DateWrapper.setFixedDate(new Date("2024-12-25"));

    expect(daysUntilChristmas()).to.equal(0);
  });

  test("364 days before christmas", () => {
    DateWrapper.setFixedDate(new Date("2023-12-26"));

    expect(daysUntilChristmas()).to.equal(365);
  });

  
  test("364 days before christmas", () => {
    DateWrapper.setFixedDate(new Date("2025-12-26"));

    expect(daysUntilChristmas()).to.equal(364);
  });

  test("359 days before christmas", () => {
    DateWrapper.setFixedDate(new Date("2025-12-31"));

    expect(daysUntilChristmas()).to.equal(359);
  });


});
