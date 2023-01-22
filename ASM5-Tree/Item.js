
class Item {
    constructor (key, value) {
        this._key = key;
        this._value = value;
    }
    key() {
        return this._key;
    }
    value() {
        return this._value;
    }
    toString() {
        return "(" + this._key + ", " + this._value + ")";
    }
}
function compareItems(item1, item2, compare=compareKeys) {
    return compare(item1.key(), item2.key());
}
function compareKeys(key1, key2) {
    return key1 - key2;
}

exports.Item = Item;
exports.compareItems = compareItems;
exports.compareKeys = compareKeys;
