const fs = require("fs");
const Handlebars = require("handlebars");

// Import helpers
const eq = require("./helpers/eq.js");
const add = require("./helpers/add.js");
const slice = require("./helpers/slice.js");
const not = require("./helpers/not.js");
const splitAndSpace = require("./helpers/splitAndSpace.js");
const lowercase = require("./helpers/lowercase.js");
const times = require("./helpers/times.js");
const arrayLength = require("./helpers/arrayLength.js");
const navigateMatrix = require("./helpers/navigateMatrix.js");
const paginator = require("./helpers/paginator.js");
const getRowIndex = require("./helpers/getRowIndex.js");
const genQrCode = require("./helpers/genQrCode.js");
const genDataMatrix = require("./helpers/genDataMatrix.js");
const getOnlinePaymentMethodContent = require("./helpers/getOnlinePaymentMethodContent.js");
const getPhysicalPaymentMethodContent = require("./helpers/getPhysicalPaymentMethodContent.js");
// Register helpers
Handlebars.registerHelper("eq", eq);
Handlebars.registerHelper("add", add);
Handlebars.registerHelper("slice", slice);
Handlebars.registerHelper("not", not);
Handlebars.registerHelper("splitAndSpace", splitAndSpace);
Handlebars.registerHelper("lowercase", lowercase);
Handlebars.registerHelper("arrayLength", arrayLength);
Handlebars.registerHelper("times", times);
Handlebars.registerHelper("navigateMatrix", navigateMatrix);
Handlebars.registerHelper("paginator", paginator);
Handlebars.registerHelper("getRowIndex", getRowIndex);
Handlebars.registerHelper("genQrCode", genQrCode);
Handlebars.registerHelper("genDataMatrix", genDataMatrix);
Handlebars.registerHelper("getOnlinePaymentMethodContent", getOnlinePaymentMethodContent);
Handlebars.registerHelper("getPhysicalPaymentMethodContent", getPhysicalPaymentMethodContent);
// Import partials
const partialPath = `./partials`;
const importPartial = (fileName) => fs.readFileSync(`${partialPath}/${fileName}.hbs`, "utf8");

const header = importPartial(`header`);
const mainInfo = importPartial(`main-info`);
const paymentInfo = importPartial(`payment-info`);
const paymentMethods = importPartial(`payment-methods`);
const paymentData = importPartial(`payment-data`);
const paymentPoste = importPartial(`payment-poste`);
// Thermal version
const thermalHeader = importPartial(`thermal-header`);
const thermalPaymentMethods = importPartial(`thermal-payment-methods`);
const thermalPaymentData = importPartial(`thermal-payment-data`);
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
// --Thermal version
const thermalPaymentInfoInfraction = importPartial(`thermal-payment-info-infraction`);
const thermalPaymentInfoInfractionImmediate = importPartial(`thermal-payment-info-infraction-immediate`);
// Multiple instalments
const paymentInfoMultipleInstalments = importPartial(`payment-info-multiple-instalments`);
const paymentMultipleInstalments2col = importPartial(`payment-multiple-instalments-2col`);
const paymentMultipleInstalments3col = importPartial(`payment-multiple-instalments-3col`);
const paymentMultipleInstalments3colDense = importPartial(`payment-multiple-instalments-3col-dense`);
const paymentDataMultipleInstalmentsP1 = importPartial(`payment-data-multiple-instalments-p1`);
const paymentDataMultipleInstalmentsP2 = importPartial(`payment-data-multiple-instalments-p2`);
const paymentInstalments = importPartial(`payment-instalments`);

// Register partials
Handlebars.registerPartial("header", header);
Handlebars.registerPartial("mainInfo", mainInfo);
Handlebars.registerPartial("paymentInfo", paymentInfo);
Handlebars.registerPartial("paymentMethods", paymentMethods);
Handlebars.registerPartial("paymentData", paymentData);
Handlebars.registerPartial("paymentPoste", paymentPoste);
// Thermal version
Handlebars.registerPartial("thermalHeader", thermalHeader);
Handlebars.registerPartial("thermalPaymentMethods", thermalPaymentMethods);
Handlebars.registerPartial("thermalPaymentData", thermalPaymentData);
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
Handlebars.registerPartial("thermalPaymentInfoInfraction", thermalPaymentInfoInfraction);
Handlebars.registerPartial("thermalPaymentInfoInfractionImmediate", thermalPaymentInfoInfractionImmediate);

// Multiple instalments
Handlebars.registerPartial("paymentInfoMultipleInstalments", paymentInfoMultipleInstalments);
Handlebars.registerPartial("paymentMultipleInstalments2col", paymentMultipleInstalments2col);
Handlebars.registerPartial("paymentMultipleInstalments3col", paymentMultipleInstalments3col);
Handlebars.registerPartial("paymentMultipleInstalments3colDense", paymentMultipleInstalments3colDense);
Handlebars.registerPartial("paymentDataMultipleInstalmentsP1", paymentDataMultipleInstalmentsP1);
Handlebars.registerPartial("paymentDataMultipleInstalmentsP2", paymentDataMultipleInstalmentsP2);
Handlebars.registerPartial("paymentInstalments", paymentInstalments);

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
data.tempPath = ".temp";
fs.mkdirSync(".temp", {recursive: true});
// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
