const i18next = require("i18next");

function languageHandler(i18n_key, options) {
  /* Get language parameters from JSON file */
  const languageInfo = options.data.root.metadata;
  const isBilingual = languageInfo?.bilingual;
  const mainLanguage = languageInfo?.language;
  const secondaryLanguage = languageInfo?.secondaryLanguage;

  /* Get localized text using i18n key */
  const mainLocalizedText = i18next.t(i18n_key, { lng: mainLanguage ?? "it" });

  /* If there are no hash parameters, only the main localised text
  will be returned. This could be used to render
  the document title, for example */
  if (!options.hash) {
    return mainLocalizedText;
  }

  /* Create the mainHTML element with default language text */
  const mainHTMLElem = '<p class="' + options.hash.classPrimaryLanguage + '">' + mainLocalizedText + "</p>";

  /* Create the secondaryHTML element, using the secondary language */
  if (mainLanguage && secondaryLanguage) {
    const secondaryLocalizedText = i18next.t(i18n_key, { lng: languageInfo.secondaryLanguage });
    const secondaryElementClassname = isBilingual ? options.hash.classBilingual : options.hash.classSecondaryLang;
    const secondaryHTMLElem = `<p class="${secondaryElementClassname}">${secondaryLocalizedText}</p>`;

    const flexDirection = options.hash.align === "horizontal" ? "horizontal" : "vertical";
    return `<div class="container_flex_${flexDirection}">${mainHTMLElem}${secondaryHTMLElem}</div>`;

  } else {
    return mainHTMLElem;
  }
}

module.exports = languageHandler;
