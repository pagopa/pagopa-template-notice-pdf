# 🧾 pagopa-template-notice-pdf

All PDF templates of the notice designed by pagoPA

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [How to generate the PDF notice](#how-to-generate-the-pdf-notice)
- [Python Script](#python-script)
- [Related PDF templates](#related-PDF-templates)

## Requirements

- Node JS (see `.node-version` file), _optional_ see [nvm](https://github.com/nvm-sh/nvm)
- [yarn](https://yarnpkg.com/)

## Dependencies

- [Handlebars](https://handlebarsjs.com/)
- [Puppeteer](https://www.npmjs.com/package/puppeteer)
  to [generate a PDF of the page](https://pptr.dev/api/puppeteer.page.pdf)

## How to generate the PDF notice

1. Go to the `src` folder and run `yarn` to install all the required packages
2. Based on your needs, you can run one of the following commands:
   - **Single instalment**
     - w/o Poste notice: `$ yarn generate-single-instalment`
     - w/ Poste notice: `$ yarn generate-single-instalment-poste`
   - **Multiple instalments**: you can configure the number of instalments by changing the values contained in the `notice.instalments.items` array from the `notice-many-instalments.json` file
     - w/o Poste notice: `$ yarn generate-instalments`
     - w/ Poste notice: `$ yarn generate-instalments-poste`
   - **Many instalments** (more than nine): `$ yarn generate-many-instalments`
   - **Road traffic offence**
     - w/o Poste notice: `$ yarn generate-cds-infraction`
     - w/ Poste notice: `$ yarn generate-cds-infraction-poste`
     - for thermal printing: `$ yarn generate-cds-infraction-thermal` and `$ yarn generate-cds-infraction-thermal-immediate-notification`
3. If everything is okay, you will see a PDF file with the relative PDF template name in the `output_template` folder (starting from the root folder). For example, if you generate the most basic PDF template, you will see a PDF file named `TemplateSingleInstalment.pdf` in the same folder.

---

## Python Script

> [!note]
> The python script is used for Stampa Avvisi

The `create_templates_zip.py` file is a Python script that creates a `*.zip` file for each template, containing the template itself and its associated CSS and asset files. All zip files will be created in the `./output_zip` folder.

**Note**: In the ZIP archive, the `hbs` template is renamed to `template.html`.

### How to run

Use this command, from the root folder:

```bash
$ python3 ./create_templates_zip.py
```

---

## Related PDF templates

- Template for the PDF receipt: [`pagopa-template-receipt-pdf`](https://github.com/pagopa/pagopa-template-receipt-pdf)
