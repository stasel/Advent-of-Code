import * as fs from 'fs/promises';

export async function loadFile(fileName) {
    return await fs.readFile(fileName, {'encoding': 'utf8'});
}

export async function loadIntArray(fileName, separator=",") {
    const fileContents = await fs.readFile(fileName, {'encoding': 'utf8'});
    return fileContents
        .split(separator)
        .map(x => parseInt(x))
}

// Array operations
Array.prototype.sum = function() {
    return this.reduce((a, b) => a + b, 0);
}

Array.prototype.max = function() { 
    return Math.max(...this);
}


 // Set operations

Set.prototype.union = function(other) {
    const _union = new Set(this);
    for (const elem of other) {
      _union.add(elem);
    }
    return _union;
}

Set.prototype.intersect = function(other) {
    const _intersection = new Set();
    for (const elem of other) {
      if (this.has(elem)) {
        _intersection.add(elem);
      }
    }
    return _intersection;
}
