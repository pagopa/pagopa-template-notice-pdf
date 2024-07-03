# 🧾 pagopa-template-notice-pdf

All PDF templates of the notice designed by pagoPA

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [How to generate the PDF notice](#how-to-generate-the-pdf-notice)
- [Related PDF templates](#related-PDF-templates)

## Requirements

- Node JS (see `.node-version` file), _optional_ see [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/)

## Dependencies

- [Handlebars](https://handlebarsjs.com/)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
  to [generate a PDF of the page](https://pptr.dev/api/puppeteer.page.pdf)

## How to generate the PDF notice

1. Go to the `src` folder and run `yarn` to install all the packages
2. To generate the PDF notice, run `yarn generate`
3. If everything is okay, you will see a PDF file named `pagopa-notice-<UUID>.pdf` in the same folder

## Related PDF templates

- Template for the PDF receipt: [`pagopa-template-receipt-pdf`](https://github.com/pagopa/pagopa-template-receipt-pdf)

---

## Python Script

> ℹ️ The python script is used for Stampa Avvisi

The `create_templates_zip.py` file is a python script to create for each template a zip that contains the template, the
css file and the
asssets files.
All the zip files are created in the `./output_zip` folder.

_Note: in the zip file the hbs template are renamed into template.html_

### How to run

Use this command from the root:

```bash
python3 ./create_templates_zip.py
```
