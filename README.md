# 🧾 pagopa-template-notice-pdf

All PDF templates of the notice designed by pagoPA

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [How to generate the PDF notice](#how-to-generate-the-pdf-notice)
- [Internationalization (`I18n`)](#internationalization-i18n)
- [Breakdown of pages by number of instalments](#breakdown-of-pages-by-number-of-instalments)
- [Python Script](#python-script)
- [Related PDF templates](#related-pdf-templates)

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
   - **All of the above**: `$ yarn run-all-generate`
3. If everything is okay, you will see a PDF file with the relative PDF template name in the `output_template` folder (starting from the root folder). For example, if you generate the most basic PDF template, you will see a PDF file named `TemplateSingleInstalment.pdf` in the same folder.

## Internationalization (`I18n`)

Payment notices can be generated in multiple languages. You can configure `i18n` by changing the `metadata.language` value at the end of the appropriate JSON file:

```json
"metadata": {
    "language": "it",
    "secondaryLanguage": "en",
    "trueBilingualism": true
  }
```

By changing this configuration, you can manage the different cases described below. If you need to learn more, you can refer to the [official pagoPA documentation](https://docs.pagopa.it/avviso-pagamento/allegato-1/varianti/traduzioni).

### Default (Italian)

If no configuration is specified, the notice will be generated in Italian.

### Main language only

If you change the `language` to a value other than `it`, the notice will be generated in the specified language. For example, the following configuration will generate a notice in English:

```json
"metadata": {
    "language": "en",
  }
```

### Main language, secondary language

If you also set the `secondaryLanguage` field, the notice will be generated in both languages, but the secondary language will be rendered with a different visual hierarchy. For example, the following configuration will generate a notice in Italian with English as the secondary language:

```json
"metadata": {
    "language": "it",
    "secondaryLanguage": "en",
  }
```

### True bilingualism

If you enable the `trueBilingualism` field, the notice will be generated in both languages, but both languages will be visually treated equally. For example, the following configuration will generate a notice in both Italian and German:

```json
"metadata": {
    "language": "it",
    "secondaryLanguage": "de",
    "trueBilingualism": true
  }
```

> [!important] > **Trying to understand how to edit the i18n template logic?** You can find it in the [`languageHandler.js` helper file](./src/helpers/languageHandler.js).

## Breakdown of pages by number of instalments

### without Poste paying-in slip (_bollettino postale_)¹

<table>
  <tr>
    <th rowspan="2">Total instalments²</th>
    <th colspan="1">First page³</th>
    <th colspan="2">Second page</th>
  </tr>
  <tr>
    <th>№ cols</th>
    <th>№ cols</th>
    <th>№ rows</th>
  </tr>
  <tr>
    <td>2</td>
    <td>2</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>3</td>
    <td>3</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>4</td>
    <td>2</td>
    <td>2</td>
    <td>1</td>
  </tr>
  <tr>
    <td>5</td>
    <td>2</td>
    <td>3</td>
    <td>1</td>
  </tr>
  <tr>
    <td>6</td>
    <td>2</td>
    <td>2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>7</td>
    <td>3</td>
    <td>2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>8</td>
    <td>2</td>
    <td>3</td>
    <td>2</td>
  </tr>
  <tr>
    <td>9</td>
    <td>3</td>
    <td>3</td>
    <td>2</td>
  </tr>
</table>

¹ `getPaginationData` function in the `paginator.js` helper file translates this breakdown into code <br />
² For more than nine instalments please use the **many instalments** template <br />
³ The first page always has a maximum of one row, as it contains all the main information

### with pre-filled Poste paying-in slip (_bollettino postale_)¹ ²

<table>
  <tr>
    <th rowspan="2">Total instalments³</th>
    <th colspan="3">№ instalments</th>
  </tr>
  <tr>
    <th>2ⁿᵈ page</th>
    <th>3ʳᵈ page</th>
    <th>4ᵗʰ page</th>
  </tr>
  <tr>
    <td>2</td>
    <td>2</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>3</td>
    <td>3</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>4</td>
    <td>2</td>
    <td>2</td>
    <td>-</td>
  </tr>
  <tr>
    <td>5</td>
    <td>2</td>
    <td>3</td>
    <td>-</td>
  </tr>
  <tr>
    <td>6</td>
    <td>3</td>
    <td>3</td>
    <td>-</td>
  </tr>
  <tr>
    <td>7</td>
    <td>3</td>
    <td>2</td>
    <td>2</td>
  </tr>
  <tr>
    <td>8</td>
    <td>2</td>
    <td>3</td>
    <td>3</td>
  </tr>
  <tr>
    <td>9</td>
    <td>3</td>
    <td>3</td>
    <td>3</td>
  </tr>
</table>

¹ `getPaginationDataPoste` function in the `paginator.js` helper file translates this breakdown into code <br />
² The first page is omitted because it always shows only the single instalment. Other pages can show **a maximum of three instalments per page**, as payment slips take up space<br />
³ There's no current template that supports the case with more than nine instalments <br />

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
