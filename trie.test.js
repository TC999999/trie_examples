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

  test("search for word in trie", function () {
    const wordInTrie = t.searchWord("almost");
    expect(wordInTrie).toBe(true);
  });

  test("search for word fails if word is incomplete", function () {
    const wordInTrie = t.searchWord("almos");
    expect(wordInTrie).toBe(false);
  });

  test("search for word fails if complete word is not in trie", function () {
    const wordInTrie = t.searchWord("before");
    expect(wordInTrie).toBe(false);
  });

  test("search for prefix", function () {
    const prefixInTrie = t.searchPrefix("al");
    expect(prefixInTrie).toBe(true);
  });

  test("search for prefix fails if prefix does not exist", function () {
    const prefixInTrie = t.searchPrefix("be");
    expect(prefixInTrie).toBe(false);
  });

  test("search for prefix fails if input is a complete word with no letters after it", function () {
    const wordInTrie = t.searchWord("almost");
    expect(wordInTrie).toBe(true);
    const prefixInTrie = t.searchPrefix("almost");
    expect(prefixInTrie).toBe(false);
  });

  test("insert word", function () {
    t.insert("before");
    const wordInTrie = t.searchWord("before");
    expect(wordInTrie).toBe(true);
  });

  test("can make prefixes into words", function () {
    const prefixInTrie = t.searchPrefix("a");
    expect(prefixInTrie).toBe(true);
    const wordInTrie = t.searchWord("a");
    expect(wordInTrie).toBe(false);
    t.insert("a");

    const wordInTrie2 = t.searchWord("a");
    expect(wordInTrie2).toBe(true);
  });

  test("insert new words with already existing prefixes", function () {
    const prefixInTrie = t.searchPrefix("ant");
    expect(prefixInTrie).toBe(true);
    const wordInTrie = t.searchWord("anthill");
    expect(wordInTrie).toBe(false);

    t.insert("anthill");

    const wordInTrie2 = t.searchWord("anthill");
    expect(wordInTrie2).toBe(true);
  });

  test("delete existing word", function () {
    t.deleteWord("almost");
    const wordInTrie = t.searchWord("almost");
    expect(wordInTrie).toBe(false);
  });

  test("fails to delete nonexistent word", function () {
    const wordInTrie = t.deleteWord("before");
    expect(wordInTrie).toBe(false);
  });

  test("if a deleted word is a prefix, leaves prefix and words that stem from prefix alone", function () {
    const prefixInTrie = t.searchWord("ant");
    expect(prefixInTrie).toBe(true);
    const wordInTrie = t.searchWord("ants");
    expect(wordInTrie).toBe(true);

    t.deleteWord("ant");

    const prefixInTrie2 = t.searchWord("ant");
    expect(prefixInTrie2).toBe(false);
    const prefixInTrie3 = t.searchPrefix("ant");
    expect(prefixInTrie3).toBe(true);
    const wordInTrie2 = t.searchWord("ants");
    expect(wordInTrie2).toBe(true);
  });

  test("if a deleted word shares a prefix with another word, leaves prefix and other words that stem from prefix alone", function () {
    const prefixInTrie = t.searchPrefix("al");
    expect(prefixInTrie).toBe(true);
    const wordInTrie = t.searchWord("alone");
    expect(wordInTrie).toBe(true);
    const wordInTrie2 = t.searchWord("almost");
    expect(wordInTrie2).toBe(true);

    t.deleteWord("almost");

    const prefixInTrie2 = t.searchPrefix("al");
    expect(prefixInTrie2).toBe(true);
    const wordInTrie3 = t.searchWord("alone");
    expect(wordInTrie3).toBe(true);
    const wordInTrie4 = t.searchWord("almost");
    expect(wordInTrie4).toBe(false);
  });

  test("if all words that stem from a prefix are deleted, then the prefix is deleted as well", function () {
    const prefixInTrie = t.searchPrefix("al");
    expect(prefixInTrie).toBe(true);
    const wordInTrie = t.searchWord("alone");
    expect(wordInTrie).toBe(true);
    const wordInTrie2 = t.searchWord("almost");
    expect(wordInTrie2).toBe(true);

    t.deleteWord("alone");
    t.deleteWord("almost");

    const prefixInTrie2 = t.searchPrefix("al");
    expect(prefixInTrie2).toBe(false);
  });

  test("autoComplete returns all words that share the inputted prefix with a depth first search method", function () {
    const autoArr = t.autoComplete("an");
    expect(autoArr).toEqual(["an", "ant", "ants", "and"]);
  });

  test("input for nonexistent prefix in autoComplete function returns empty array", function () {
    const autoArr = t.autoComplete("be");
    expect(autoArr).toEqual([]);
  });

  test("empty string input in autoComplete returns returns all words found via depth first search method", function () {
    const autoArr = t.autoComplete("");
    expect(autoArr).toEqual([
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
