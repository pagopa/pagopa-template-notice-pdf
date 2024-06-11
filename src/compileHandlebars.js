const fs = require("fs");
const Handlebars = require("handlebars");
let {readFileSync, readdirSync} = require('fs');
const path = require('node:path');


const HandlebarsI18n = require("handlebars-i18n");

const i18next = require("i18next");
i18next.init({
    resources: {
        "it": {
            translation: {
                "title": "Avviso di pagamento",
                "alert": "<strong>Se paghi entro 5 giorni</strong> dalla notifica del verbale"
            }
        },
        "en": {
            translation: {
                "title": "Payment Notice",
                "alert": "<strong>Within 5 days</strong> from the notification"
            }
        }
    },
    lng: "it"
});

HandlebarsI18n.init();

const getFiles = source => readdirSync(source, {withFileTypes: true})
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
const importFile = (filePath, fileName) => readFileSync(`${filePath}/${fileName}`, "utf8");
const requireFile = (filePath, fileName) => require(`${filePath}/${fileName}`);

const helpersPath = './helpers';
const partialPath = `./partials`;

// Register helpers
const helperFiles = getFiles(`${helpersPath}`);
for (let helperFile of helperFiles) {
    const helper = requireFile(`${helpersPath}/`, path.parse(`${helpersPath}/${helperFile}`).name);
    Handlebars.registerHelper(
        path.parse(`${helpersPath}/${helperFile}`).name, helper);
}

// Register partials
const partialFiles = getFiles(`${partialPath}`);
for (let partialFile of partialFiles) {
    const partial = importFile(`${partialPath}/`, partialFile);
    Handlebars.registerPartial(
        path.parse(`${partialPath}/${partialFile}`).name, partial);
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

const templateFile = fs.readFileSync(`./templates/${templateFilePath}`, "utf8");
const template = Handlebars.compile(templateFile);

// Load the JSON data for the template
const data = require(`./json/${dataFilePath}`);
data.tempPath = ".temp";
fs.mkdirSync(".temp", {recursive: true});
// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
