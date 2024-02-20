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
const noticePaymentBollettino = fs.readFileSync(
  `${partialPath}/notice-payment-bollettino.hbs`,
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
Handlebars.registerPartial("noticePaymentBollettino", noticePaymentBollettino);

const templateFile = fs.readFileSync("template.hbs", "utf8");
const template = Handlebars.compile(templateFile);

// Load the data for the template
const data = require("./json/notice-single-payment.json");

// Generate the HTML
const html = template(data);

// Save the HTML to a file
fs.writeFileSync("template.html", html);
