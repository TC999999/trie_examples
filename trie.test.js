const { Trie } = require("./trie");

describe("Trie", function () {
  let t;
  beforeEach(function () {
    t = new Trie();
    t.insert("ant");
    t.insert("an");
    t.insert("alone");
    t.insert("almost");
    t.insert("ants");
    t.insert("and");
    t.insert("dad");
    t.insert("do");
    t.insert("door");
  });

  test("searchWord() returns true if inputted word is in trie", function () {
    expect(t.searchWord("almost")).toBeTruthy();
  });

  test("searchWord() returns false if word is incomplete", function () {
    expect(t.searchWord("almos")).toBeFalsy();
  });

  test("searchWord() returns false if complete word is not in trie", function () {
    expect(t.searchWord("before")).toBeFalsy();
  });

  test("searchPrefix() returns true if prefix is in trie and not a complete word", function () {
    expect(t.searchPrefix("al")).toBeTruthy();
  });

  test("searchPrefix() returns false if prefix does not exist in trie", function () {
    expect(t.searchPrefix("be")).toBeFalsy();
  });

  test("searchPrefix() returns true if inputted string is a complete word with letters after it", function () {
    expect(t.searchWord("an")).toBeTruthy();
    expect(t.searchPrefix("an")).toBeTruthy();
  });

  test("searchPrefix() returns false if inputted string is a complete word with no letters after it", function () {
    expect(t.searchWord("almost")).toBeTruthy();
    expect(t.searchPrefix("almost")).toBeFalsy();
  });

  test("insert() inserts a new word into the trie", function () {
    expect(t.searchWord("before")).toBeFalsy();
    t.insert("before");
    expect(t.searchWord("before")).toBeTruthy();
  });

  test("insert() can make already existing prefixes into words", function () {
    expect(t.searchPrefix("a")).toBeTruthy();
    expect(t.searchWord("a")).toBeFalsy();

    t.insert("a");
    expect(t.searchWord("a")).toBeTruthy();
  });

  test("insert() makes new words with already existing prefixes", function () {
    expect(t.searchPrefix("ant")).toBeTruthy();
    expect(t.searchWord("anthill")).toBeFalsy();

    t.insert("anthill");
    expect(t.searchWord("anthill")).toBeTruthy();
  });

  test("delete() removes an existing word from the trie", function () {
    expect(t.searchWord("almost")).toBeTruthy();
    t.deleteWord("almost");
    expect(t.searchWord("almost")).toBeFalsy();
  });

  test("delete() returns false if attempting to delete a nonexistent word", function () {
    expect(t.deleteWord("before")).toBeFalsy();
  });

  test("delete(): if a deleted word is a prefix, leaves prefix and words that stem from prefix alone", function () {
    expect(t.searchWord("an")).toBeTruthy();
    expect(t.searchWord("ant")).toBeTruthy();
    expect(t.searchWord("ants")).toBeTruthy();

    t.deleteWord("an");
    expect(t.searchWord("an")).toBeFalsy();
    expect(t.searchPrefix("an")).toBeTruthy();
    expect(t.searchWord("ant")).toBeTruthy();
    expect(t.searchWord("ants")).toBeTruthy();
  });

  test("delete(): if a deleted word shares a prefix with another word, leaves prefix and other words that stem from prefix alone", function () {
    expect(t.searchPrefix("al")).toBeTruthy();
    expect(t.searchWord("alone")).toBeTruthy();
    expect(t.searchWord("almost")).toBeTruthy();

    t.deleteWord("almost");
    expect(t.searchPrefix("al")).toBeTruthy();
    expect(t.searchWord("alone")).toBeTruthy();
    expect(t.searchWord("almost")).toBeFalsy();
  });

  test("delete(): if all words that stem from a prefix are deleted, then the prefix is deleted as well", function () {
    expect(t.searchPrefix("al")).toBeTruthy();
    expect(t.searchWord("alone")).toBeTruthy();
    expect(t.searchWord("almost")).toBeTruthy();

    t.deleteWord("alone");
    t.deleteWord("almost");
    expect(t.searchPrefix("al")).toBeFalsy();
  });

  test("autoComplete() returns all words that share the inputted prefix with a depth first search method", function () {
    expect(t.autoComplete("an")).toEqual(["an", "ant", "ants", "and"]);
  });

  test("autoComplete() returns array with a length of one when the inputted prefix does not share its prefix with other words", function () {
    expect(t.autoComplete("and")).toEqual(["and"]);
  });

  test("autoComplete() returns an empty array for nonexistent prefix input", function () {
    expect(t.autoComplete("be")).toEqual([]);
  });

  test("autoComplete() returns an array with all words in the trie found via depth first search method when the input is an empty string", function () {
    expect(t.autoComplete("")).toEqual([
      "an",
      "ant",
      "ants",
      "and",
      "alone",
      "almost",
      "dad",
      "do",
      "door",
    ]);
  });
});
