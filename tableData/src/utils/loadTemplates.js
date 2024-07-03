const fs = require('fs');
const {BlobServiceClient} = require("@azure/storage-blob");

//ENVIRONMENTAL VARIABLES
const blobStorageConnString = process.env.BLOB_CONN_STRING || "";
const blobContainerId = process.env.BLOB_CONTAINER_ID || "noticetemplateblob";

//CLIENTS
const blobServiceClient = BlobServiceClient.fromConnectionString(blobStorageConnString);
const blobContainerClient = blobServiceClient.getContainerClient(blobContainerId);

const uploadDocumentToAzure = async () => {

    const directories = getDirectories("../../output_zip");

    for (var directory of directories) {
        const blockClient = blobContainerClient.getBlockBlobClient(directory + "/template.zip");
        const response = await blockClient.uploadFile(`../../output_zip/${directory}/template.zip`);
        if (response._response.status !== 201) {
            throw new Error(
                `Error uploading logo ${blockClient.name} to container ${blockClient.containerName}`
            );
        }
    }

};

const getDirectories = source =>
    fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)

uploadDocumentToAzure().then(() => {
    console.info("Templates Uploaded");
});


