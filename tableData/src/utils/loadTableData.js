const fs = require('fs');
const { odata, TableClient } = require("@azure/data-tables");

//ENVIRONMENTAL VARIABLES
const tableConnString = process.env.TABLE_CONN_STRING || "";
const tableName = process.env.TABLE_NAME || "";
const partitionKey = process.env.PARTITION_KEY || "templates";

//CLIENTS
const tableClient = TableClient.fromConnectionString(tableConnString, tableName);

const uploadDocumentToAzure = async () => {

    const entities = tableClient.listEntities({
      queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
    });

    for await (const entity of entities) {
        await tableClient.deleteEntity(partitionKey, entity.rowKey);
    }

    const tableDataList = JSON.parse(fs.readFileSync('tableData.json'));
    for (const tableData of tableDataList) {
        const result = await tableClient.createEntity(tableData);
        console.info(result);
    }

};

uploadDocumentToAzure().then(() => {
  console.info("Table Data Uploaded");
});


