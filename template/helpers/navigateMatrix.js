function navigateMatrix(matrix, row, column) {
    let ret = matrix;
    if (row !== null && row !== undefined && !isNaN(row)) {
        ret = ret[row];

    }
    if (column !== null && column !== undefined && !isNaN(column)) {
        ret = ret[column];
    }
    return ret;
}

module.exports = navigateMatrix;
