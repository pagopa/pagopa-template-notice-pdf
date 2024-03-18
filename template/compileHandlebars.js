const fs = require("fs");
const Handlebars = require("handlebars");

// Import helpers
const eq = require("./helpers/eq.js");
const add = require("./helpers/add.js");
const slice = require("./helpers/slice.js");
const not = require("./helpers/not.js");
const splitAndSpace = require("./helpers/splitAndSpace.js");
const lowercase = require("./helpers/lowercase.js");
// Register helpers
Handlebars.registerHelper("eq", eq);
Handlebars.registerHelper("add", add);
Handlebars.registerHelper("slice", slice);
Handlebars.registerHelper("not", not);
Handlebars.registerHelper("splitAndSpace", splitAndSpace);
Handlebars.registerHelper("lowercase", lowercase);

// Import partials
const partialPath = `./partials`;
const importPartial = (fileName) => fs.readFileSync(`${partialPath}/${fileName}.hbs`, "utf8");

const header = importPartial(`header`);
const mainInfo = importPartial(`main-info`);
const paymentInfo = importPartial(`payment-info`);
const paymentMethods = importPartial(`payment-methods`);
const paymentData = importPartial(`payment-data`);
const paymentPoste = importPartial(`payment-poste`);
// Common partials
const paymentQR = importPartial(`payment-qrcode`);
const paymentQRCol = importPartial(`payment-qrcode-col`);
const paymentQRColCompact = importPartial(`payment-qrcode-col-compact`);
const paymentQRColDense = importPartial(`payment-qrcode-col-dense`);
const paymentBollettino = importPartial(`payment-bollettino`);
// Codice della Strada's infraction
const paymentInfoInfraction = importPartial(`payment-info-infraction`);
const paymentInfoInfractionP1 = importPartial(`payment-info-infraction-p1`);
const paymentInfoInfractionP2 = importPartial(`payment-info-infraction-p2`);
const paymentSeparatorInfraction = importPartial(`payment-separator-infraction`);
// Multiple instalments
const paymentInfoMultipleInstalments = importPartial(`payment-info-multiple-instalments`);
const paymentMultipleInstalments2col = importPartial(`payment-multiple-instalments-2col`);
const paymentMultipleInstalments3col = importPartial(`payment-multiple-instalments-3col`);
const paymentDataMultipleInstalmentsP1 = importPartial(`payment-data-multiple-instalments-p1`);
const paymentDataMultipleInstalmentsP2 = importPartial(`payment-data-multiple-instalments-p2`);

// Register partials
Handlebars.registerPartial("header", header);
Handlebars.registerPartial("mainInfo", mainInfo);
Handlebars.registerPartial("paymentInfo", paymentInfo);
Handlebars.registerPartial("paymentMethods", paymentMethods);
Handlebars.registerPartial("paymentData", paymentData);
Handlebars.registerPartial("paymentPoste", paymentPoste);

//-- Commons
Handlebars.registerPartial("paymentQR", paymentQR);
Handlebars.registerPartial("paymentQRCol", paymentQRCol);
Handlebars.registerPartial("paymentQRColCompact", paymentQRColCompact);
Handlebars.registerPartial("paymentQRColDense", paymentQRColDense);
Handlebars.registerPartial("paymentBollettino", paymentBollettino);
//-- Infractions
Handlebars.registerPartial("paymentInfoInfraction", paymentInfoInfraction);
Handlebars.registerPartial("paymentInfoInfractionP1", paymentInfoInfractionP1);
Handlebars.registerPartial("paymentInfoInfractionP2", paymentInfoInfractionP2);
Handlebars.registerPartial("paymentSeparatorInfraction", paymentSeparatorInfraction);
// Multiple instalments
Handlebars.registerPartial("paymentInfoMultipleInstalments", paymentInfoMultipleInstalments);
Handlebars.registerPartial("paymentMultipleInstalments2col", paymentMultipleInstalments2col);
Handlebars.registerPartial("paymentMultipleInstalments3col", paymentMultipleInstalments3col);
Handlebars.registerPartial("paymentDataMultipleInstalmentsP1", paymentDataMultipleInstalmentsP1);
Handlebars.registerPartial("paymentDataMultipleInstalmentsP2", paymentDataMultipleInstalmentsP2);

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
const template = Handlebars.compile(templateFile);

// Load the JSON data for the template
const data = require(`./json/${dataFilePath}`);

// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
