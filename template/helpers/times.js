function times(n, options) {
    let ret = Array.from({length: n}, (_, i) => i);
    return ret;
}

module.exports = times;
