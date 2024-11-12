class Node {
  constructor() {
    this.letters = new Map();
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word, node = this.root, idx = 0) {
    if (idx > word.length - 1) {
      node.end = true;
      return;
    } else {
      let letter = word[idx];
      if (!node.letters.get(letter)) {
        node.letters.set(letter, new Node());
      }
      idx++;
      return this.insert(word, node.letters.get(letter), idx);
    }
  }

  searchPrefix(prefix, node = this.root, idx = 0) {
    if (idx > prefix.length - 1) {
      if (!node.letters.size) {
        return false;
      }
      return true;
    } else {
      let letter = prefix[idx];
      if (!node.letters.get(letter)) {
        return false;
      }
      idx++;
      return this.searchPrefix(prefix, node.letters.get(letter), idx);
    }
  }

  searchWord(word, node = this.root, idx = 0) {
    if (idx > word.length - 1) {
      return node.end;
    } else {
      let letter = word[idx];
      if (!node.letters.get(letter)) {
        return false;
      }
      idx++;
      return this.searchWord(word, node.letters.get(letter), idx);
    }
  }

  deleteWord(
    word,
    node = this.root,
    idx = 0,
    preNode = this.root,
    letKey = word[0]
  ) {
    if (idx > word.length - 1 && node.end) {
      if (node.letters.size) {
        node.end = false;
      } else {
        preNode.letters.delete(letKey);
      }
    } else {
      let letter = word[idx];
      if (!node.letters.get(letter)) {
        return false;
      }
      node = node.letters.get(letter);
      if (node.letters.size > 1) {
        letKey = word[idx + 1];
        preNode = node;
      } else if (node.letters.size === 1 && node.end) {
        letKey = word[idx + 1];
        preNode = node;
      }

      idx++;
      return this.deleteWord(word, node, idx, preNode, letKey);
    }
  }

  dfs(node = this.root, newStr = "", arr = []) {
    for (let letter of node.letters) {
      if (letter[1].end) {
        arr.push(newStr + letter[0]);
      }
      arr = this.dfs(letter[1], newStr + letter[0], arr);
    }
    return arr;
  }

  autoComplete(str, node = this.root, idx = 0) {
    if (idx > str.length - 1) {
      let returnArr = this.dfs(node, str);
      if (node.end) returnArr.unshift(str);
      return returnArr;
    } else {
      let letter = str[idx];
      if (!node.letters.get(letter)) {
        return [];
      }
      idx++;
      return this.autoComplete(str, node.letters.get(letter), idx);
    }
  }
}

let t = new Trie();
t.insert("ant");
t.insert("a");
t.insert("an");
t.insert("all");
t.insert("almost");
t.insert("ants");
t.insert("and");
t.insert("dad");
t.insert("do");
t.insert("door");

module.exports = { Trie };
