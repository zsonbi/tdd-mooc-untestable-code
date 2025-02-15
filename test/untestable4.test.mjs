import { afterAll, afterEach, beforeAll, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4-testable.mjs";
import { expect } from "chai";
import argon2 from "@node-rs/argon2";

const cleanup = true;
describe("Untestable 4: enterprise application", () => {
  let service;
  beforeAll(() => {
    process.env.PGUSER = 'untestable';
    process.env.PGHOST = 'localhost';
    process.env.PGDATABASE = 'untestable';
    process.env.PGPASSWORD = 'secret';
    process.env.PGPORT = '5432';
  });

  afterAll(() => {


    PostgresUserDao.getInstance().close();
  });

  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(async () => {
    //We do it here instead of after all so the test cases are independent of each other
    if (cleanup) {
      for (let index = 1; index < PostgresUserDao.currentId; index++) {
        await PostgresUserDao.getInstance().delete(index);
      }
      PostgresUserDao.getInstance().currentId = 1;
    }
  });

  test("todo", async () => {
    // TODO: write proper tests for both PasswordService and PostgresUserDao
  });

  test("Test user add", async () => {
    const user = {
      userId: PostgresUserDao.currentId++,
      passwordHash: "test123",
    };
    await PostgresUserDao.instance.save(user);
    const querried = await PostgresUserDao.getInstance().getById(user.userId);
    expect(querried.userId).to.equal(user.userId);
    expect(querried.passwordHash).to.equal(user.passwordHash);
  });

  test("Test multiple user add", async () => {
    const user = {
      userId: PostgresUserDao.currentId++,
      passwordHash: "test123",
    };
    await PostgresUserDao.instance.save(user);
    user.userId = PostgresUserDao.currentId++,
      await PostgresUserDao.instance.save(user);
    const querried = await PostgresUserDao.getInstance().getById(user.userId);
    const querried2 = await PostgresUserDao.getInstance().getById(user.userId - 1);
    expect(querried2.userId).to.equal(user.userId - 1);
    expect(querried2.passwordHash).to.equal(user.passwordHash);
    expect(querried.userId).to.equal(user.userId);
    expect(querried.passwordHash).to.equal(user.passwordHash);
  });


  test("Test password change", async () => {
    const user = {
      userId: PostgresUserDao.currentId++,
      passwordHash: argon2.hashSync("test123"),
    };
    await PostgresUserDao.instance.save(user);
    const querried = await PostgresUserDao.getInstance().getById(user.userId);
    expect(querried.userId).to.equal(user.userId);
    expect(querried.passwordHash).to.equal(user.passwordHash);
    const passService = new PasswordService();
    await passService.changePassword(querried.userId, "test123", "newPass");
    const querried2 = await PostgresUserDao.getInstance().getById(user.userId);
    expect(querried2.userId).to.equal(user.userId);
    expect(argon2.verifySync(querried2.passwordHash, "newPass")).to.equal(true);
  });

  test("Test password invalid pass change", async () => {
    const user = {
      userId: PostgresUserDao.currentId++,
      passwordHash: argon2.hashSync("test123"),
    };
    await PostgresUserDao.instance.save(user);
    const querried = await PostgresUserDao.getInstance().getById(user.userId);
    expect(querried.userId).to.equal(user.userId);
    expect(querried.passwordHash).to.equal(user.passwordHash);
    const passService = new PasswordService();
    await expect(async () => {
      await passService.changePassword(querried.userId, "test1234", "newPass");
    }).rejects.toThrow("wrong old password");

    const querried2 = await PostgresUserDao.getInstance().getById(user.userId);
    expect(querried2.userId).to.equal(user.userId);
    expect(argon2.verifySync(querried2.passwordHash, "test123")).to.equal(true);
  });
});
