function getRowIndex(index, pageNumber, paginator) {
    let firstPageItems = paginator[0][0].length;
    let secondPageItems = paginator[1][0].length;
    let pageRows = paginator[1].length;
    return firstPageItems + (index * secondPageItems) + (pageRows * secondPageItems * pageNumber);
}

module.exports = getRowIndex;
