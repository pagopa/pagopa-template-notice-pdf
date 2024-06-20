const fs = require('fs');
import { BlobServiceClient } from "@azure/storage-blob";

//ENVIRONMENTAL VARIABLES
const blobStorageConnString = process.env.BLOB_CONN_STRING || "";
const blobContainerId = process.env.BLOB_CONTAINER_ID || "noticetemplateblob";

//CLIENTS
const blobServiceClient = BlobServiceClient.fromConnectionString(blobStorageConnString);
export const blobContainerClient = blobServiceClient.getContainerClient(blobContainerId);

const uploadDocumentToAzure = async () => {

  const directories = getDirectories("../../output");

  for (directory of directories) {
    const blockClient = blobContainerClient.getBlockBlobClient(directory+"/template.zip");
    const response = await blockClient.uploadFile(`../../output/${directory}/template.zip`);
    if (response._response.status !== 201) {
      throw new Error(
        `Error uploading logo ${blockClient.name} to container ${blockClient.containerName}`
      );
    }
  }

};

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

uploadDocumentToAzure().then(() => {
  console.info("Templates Uploaded");
});


