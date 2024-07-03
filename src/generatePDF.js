"use strict";

const {v4: uuidv4} = require("uuid");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const transactionID = uuidv4(); // ex 'F57E2F8E-25FF-4183-AB7B-4A5EC1A96644'

// Parsing command-line arguments for dynamic JSON file and template file path
const args = process.argv.slice(2); // Remove the first two elements
// Default values with a cleaner approach using an object to map flags to their respective file paths
let filePaths = {
    "--outputName": "pagopa-notice.pdf",
};

args.forEach((arg, index) => {
    if (filePaths.hasOwnProperty(arg) && args[index + 1]) {
        filePaths[arg] = args[index + 1];
    }
});

const outputName = filePaths["--outputName"];

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlFile = path.resolve("template.html");

    await page.goto(`file://${htmlFile}`, {
        waitUntil: ["load", "networkidle0"],
    });

    const output_path = '../output_template';
    fs.mkdirSync(output_path, {recursive: true})

    await page.pdf({
        path: `${output_path}/${outputName}`,
        format: "A4",
        landscape: false,
        printBackground: true,
    });

    await browser.close();

    fs.rmSync(".temp", {recursive: true});
})();
