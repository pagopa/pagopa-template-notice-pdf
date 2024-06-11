const fs = require("fs");
const Handlebars = require("handlebars");
let {readFileSync, readdirSync} = require('fs');
const path = require('node:path');


const getDirectories = source => readdirSync(source, {withFileTypes: true})
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
const getFiles = source => readdirSync(source, {withFileTypes: true})
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
const importFile = (filePath, fileName) => readFileSync(`${filePath}/${fileName}`, "utf8");
const requireFile = (filePath, fileName) => require(`${filePath}/${fileName}`);

const helpersPath = './helpers';
const partialPath = `./partials`;

// Register helpers
const helperDirectories = getDirectories(helpersPath);
for (let directoryHelper of helperDirectories) {
    const directoryHelperFiles = getFiles(`${helpersPath}/${directoryHelper}`);
    for (let directoryHelperFile of directoryHelperFiles) {
        const helper = requireFile(`../helpers/${directoryHelper}`, path.parse(`${helpersPath}/${directoryHelper}/${directoryHelperFile}`).name);
        Handlebars.registerHelper(
            path.parse(`${helpersPath}/${directoryHelper}/${directoryHelperFile}`).name, helper);
    }
}

// Register partials
const partialDirectories = getDirectories(partialPath);
for (let directoryPartial of partialDirectories) {
    const directoryPartialFiles = getFiles(`${partialPath}/${directoryPartial}`);
    for (let directoryPartialFile of directoryPartialFiles) {
        const partial = importFile(`${partialPath}/${directoryPartial}`, directoryPartialFile);
        Handlebars.registerPartial(
            path.parse(`${partialPath}/${directoryPartial}/${directoryPartialFile}`).name, partial);
    }
}


// Parsing command-line arguments for dynamic JSON file and template file path
const args = process.argv.slice(2); // Remove the first two elements
// Default values with a cleaner approach using an object to map flags to their respective file paths
let filePaths = {
    "--dataFile": "notice-single-payment.json",
    "--templateFile": "template.hbs",
};

args.forEach((arg, index) => {
    if (filePaths.hasOwnProperty(arg) && args[index + 1]) {
        filePaths[arg] = args[index + 1];
    }
});

const dataFilePath = filePaths["--dataFile"];
const templateFilePath = filePaths["--templateFile"];

const templateFile = fs.readFileSync(templateFilePath, "utf8");
// const templateFile = fs.readFileSync(`./templates/${templateFilePath}`, "utf8");
const template = Handlebars.compile(templateFile);

// Load the JSON data for the template
const data = require(`./json/${dataFilePath}`);
data.tempPath = ".temp";
fs.mkdirSync(".temp", {recursive: true});
// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
