import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isPositiveAmount, isValidPublicKey, isValidTitle } from "../utils/validators";

describe("validators", () => {
  it("validates amounts", () => {
    assert.equal(isPositiveAmount("10"), true);
    assert.equal(isPositiveAmount("0"), false);
  });

  it("validates titles", () => {
    assert.equal(isValidTitle("ab"), true);
    assert.equal(isValidTitle("a"), false);
  });

  it("validates keys", () => {
    assert.equal(isValidPublicKey("G" + "A".repeat(55)), true);
    assert.equal(isValidPublicKey("Gshort"), false);
  });
});
