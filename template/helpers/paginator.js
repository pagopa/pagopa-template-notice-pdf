function paginator(notice) {

    let instalments = notice.instalments.items;
    const instalmentsLength = instalments.length;

    const firstPageRows = 1;
    let firstPageColumns = 2;
    let secondPageRows = 3;
    let secondPageColumns = 2;

    switch (instalmentsLength) {
        case 2:
            firstPageColumns = 2;
            secondPageRows = 0;
            break;
        case 3:
            firstPageColumns = 3;
            secondPageRows = 0;
            break;
        case 4:
            firstPageColumns = 2;
            secondPageRows = 1;
            secondPageColumns = 2;
            break;
        case 5:
            firstPageColumns = 2;
            secondPageRows = 1;
            secondPageColumns = 3;
            break;
        case 6:
            firstPageColumns = 2;
            secondPageRows = 2;
            secondPageColumns = 2;
            break;
        case 7:
            firstPageColumns = 3;
            secondPageRows = 2;
            secondPageColumns = 2;
            break;
        case 8:
            firstPageColumns = 2;
            secondPageRows = 2;
            secondPageColumns = 3;
            break;
        default:
            firstPageColumns = 3;
            secondPageRows = 3;
            secondPageColumns = 3;
    }

    return paginateAndGroupArray(instalments, firstPageRows, firstPageColumns, secondPageRows, secondPageColumns);
}

function paginateAndGroupArray(array, firstPageRows, firstPageCols, pageRows, pageCols) {
    // Funzione per dividere una pagina in righe e colonne
    function splitIntoRowsAndCols(page, numRows, numCols) {
        let rows = [];
        for (let i = 0; i < numRows; i++) {
            let start = i * numCols;
            let end = start + numCols;
            if (start < page.length) {
                rows.push(page.slice(start, end));
            }
        }
        return rows;
    }

    // Risultato finale, un array di pagine, ogni pagina è un array di righe
    let paginatedArray = [];

    // Aggiungi la prima pagina con un numero di righe e colonne specifico
    let firstPageSize = firstPageRows * firstPageCols;
    let firstPage = array.slice(0, firstPageSize);
    paginatedArray.push(splitIntoRowsAndCols(firstPage, firstPageRows, firstPageCols));

    // Calcola il numero di elementi rimanenti
    let remainingItems = array.length - firstPageSize;

    // Divide il resto dell'array in pagine
    let pageSize = pageRows * pageCols;
    let totalPages = Math.ceil(remainingItems / pageSize);

    for (let i = 0; i < totalPages; i++) {
        let start = firstPageSize + i * pageSize;
        let end = start + pageSize;
        let page = array.slice(start, end);
        paginatedArray.push(splitIntoRowsAndCols(page, pageRows, pageCols));
    }

    return paginatedArray;
}

module.exports = paginator;