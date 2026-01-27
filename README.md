# 🧾 pagopa-template-notice-pdf

All PDF templates of the notice designed by pagoPA

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [How to generate the PDF notice](#how-to-generate-the-pdf-notice)
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

## GitHub Actions Workflows

This repository contains automated workflows that trigger on changes to template files.

### Update Templates (`update_template_data.yml`)

**Triggers:** Push to `main` when changes are made to:
- `tableData/src/tableData.json`
- `src/assets/**`
- `src/helpers/**`
- `src/partials/**`
- `src/templates/**`

**Actions:**
- Uploads template ZIP files to Azure blob storage
- Updates template metadata in Azure table storage
- Regenerates PDF examples and commits them

### Sync to PDF Engine (`sync_to_pdf_engine.yml`)

**Triggers:** Push to `main` when changes are made to:
- `src/helpers/**`
- `src/partials/**`

**Actions:**
- Creates a pull request to [pagopa-pdf-engine](https://github.com/pagopa/pagopa-pdf-engine)
- Syncs notice templates and helpers

#### File Mappings

| Source (this repo)       | Destination (pdf-engine)              |
|--------------------------|---------------------------------------|
| `src/partials/*.hbs`     | `node/pdf-generate/partials/notices/` |
| `src/helpers/{selected}` | `node/pdf-generate/helpers/notices/`  |

#### Excluded Helpers

The following helpers are **NOT** automatically synced because they have server-specific modifications in pdf-engine:
- `genQrCode.js` - Uses UUID for unique filename generation
- `genDataMatrix.js` - Uses UUID for unique filename generation

If these files need to be updated, manually apply changes to pdf-engine preserving the UUID logic.

#### After Merging the Auto-Generated PR

1. Review and merge the PR in pagopa-pdf-engine
2. Create a release for pagopa-pdf-engine
3. Deploy the service to apply template changes

---

## Related PDF templates

- Template for the PDF receipt: [`pagopa-template-receipt-pdf`](https://github.com/pagopa/pagopa-template-receipt-pdf)
