const fs = require("fs");
const Handlebars = require("handlebars");

// Import helpers
const eq = require("./helpers/eq.js");
const not = require("./helpers/not.js");
const splitAndSpace = require("./helpers/splitAndSpace.js");
const lowercase = require("./helpers/lowercase.js");
// Register helpers
Handlebars.registerHelper("eq", eq);
Handlebars.registerHelper("not", not);
Handlebars.registerHelper("splitAndSpace", splitAndSpace);
Handlebars.registerHelper("lowercase", lowercase);

// Import partials
const partialPath = `./partials`;
const header = fs.readFileSync(`${partialPath}/header.hbs`, "utf8");
const noticeMainInfo = fs.readFileSync(
  `${partialPath}/notice-main-info.hbs`,
  "utf8"
);
const noticePaymentInfo = fs.readFileSync(
  `${partialPath}/notice-payment-info.hbs`,
  "utf8"
);
const noticePaymentMethods = fs.readFileSync(
  `${partialPath}/notice-payment-methods.hbs`,
  "utf8"
);
const noticePaymentData = fs.readFileSync(
  `${partialPath}/notice-payment-data.hbs`,
  "utf8"
);
const noticePaymentPoste = fs.readFileSync(
  `${partialPath}/notice-payment-poste.hbs`,
  "utf8"
);
// Common partials
const noticePaymentQR = fs.readFileSync(
  `${partialPath}/notice-payment-qrcode.hbs`,
  "utf8"
);
const noticePaymentQRCol = fs.readFileSync(
  `${partialPath}/notice-payment-qrcode-col.hbs`,
  "utf8"
);
const noticePaymentQRColCompact = fs.readFileSync(
  `${partialPath}/notice-payment-qrcode-col-compact.hbs`,
  "utf8"
);
const noticePaymentBollettino = fs.readFileSync(
  `${partialPath}/notice-payment-bollettino.hbs`,
  "utf8"
);
// Codice della Strada's infraction
const noticePaymentInfoInfraction = fs.readFileSync(
  `${partialPath}/notice-payment-info-infraction.hbs`,
  "utf8"
);
// Multiple instalments
const noticePaymentMultipleInstalments2col = fs.readFileSync(
  `${partialPath}/notice-payment-multiple-instalments-2col.hbs`,
  "utf8"
);
const noticePaymentMultipleInstalments3col = fs.readFileSync(
  `${partialPath}/notice-payment-multiple-instalments-3col.hbs`,
  "utf8"
);

// Register partials
Handlebars.registerPartial("header", header);
Handlebars.registerPartial("noticeMainInfo", noticeMainInfo);
Handlebars.registerPartial("noticePaymentInfo", noticePaymentInfo);
Handlebars.registerPartial("noticePaymentMethods", noticePaymentMethods);
Handlebars.registerPartial("noticePaymentData", noticePaymentData);
Handlebars.registerPartial("noticePaymentPoste", noticePaymentPoste);

//-- Commons
Handlebars.registerPartial("noticePaymentQR", noticePaymentQR);
Handlebars.registerPartial("noticePaymentQRCol", noticePaymentQRCol);
Handlebars.registerPartial(
  "noticePaymentQRColCompact",
  noticePaymentQRColCompact
);
Handlebars.registerPartial("noticePaymentBollettino", noticePaymentBollettino);
//-- Infractions
Handlebars.registerPartial(
  "noticePaymentInfoInfraction",
  noticePaymentInfoInfraction
);
// Multiple instalments
Handlebars.registerPartial(
  "noticePaymentMultipleInstalments2col",
  noticePaymentMultipleInstalments2col
);
Handlebars.registerPartial(
  "noticePaymentMultipleInstalments3col",
  noticePaymentMultipleInstalments3col
);

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
