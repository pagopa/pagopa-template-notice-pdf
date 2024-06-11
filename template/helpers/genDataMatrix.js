const bitgener = require('bitgener');

function genDataMatrix(data, path) {
    const trimmedData = data.replaceAll(' ', '');
    bitgener({
        data: data,
        type: 'datamatrix',
        output: path + "/" + trimmedData + '.svg',
        encoding: 'utf8',
        rectangular: false,
        padding: 0,
        width: 256,
        height: 256,
        original2DSize: false,
        color: 'black',
        opacity: 1,
        bgColor: '#F7931A',
        bgOpacity: 0,
        hri: {
            show: false
        }
    }).then((ret) => {
        console.log(ret);
    });

    return path + "/" + trimmedData + ".svg"
}

module.exports = genDataMatrix;
