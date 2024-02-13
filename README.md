# 🧾 pagopa-template-notice-pdf

All PDF templates of the notice designed by pagoPA

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [How to install and run pdf generator](#how-to-install-and-run-pdf-generator)
- [Related PDF templates](#related-PDF-templates)

## Requirements

- Node JS (see `.node-version` file), _optional_ see [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/)

## Dependencies

- [Handlebars](https://handlebarsjs.com/)
- [Puppeteer](https://www.npmjs.com/package/puppeteer) to [generate a PDF of the page](https://pptr.dev/api/puppeteer.page.pdf)

## How to generate the PDF notice

1. Go to the `template` folder and run `yarn` to install all the packages
2. To generate the PDF notice, run `yarn generate`
3. If everything is okay, you will see a PDF file named `pagopa-notice-<UUID>.pdf` in the same folder

## Related PDF templates

- Template for the PDF receipt: [`pagopa-template-receipt-pdf`](https://github.com/pagopa/pagopa-template-receipt-pdf)
