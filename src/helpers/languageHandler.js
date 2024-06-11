const i18next = require("i18next");

function languageHandler(i18n_key, options) {

    let languageInfo = options.data.root.metadata;
    const str1 = i18next.t(i18n_key, {lng: languageInfo ? languageInfo.language : 'it'});

    const main_html_elem = '<p class="' + options.hash.classPrimaryLanguage + '">' + str1 + '</p>'

    if (languageInfo && languageInfo.bilingual !== null && languageInfo.bilingual !== undefined) {
        const str2 = i18next.t(i18n_key, {lng: languageInfo.bilingual});
        const bilingual_html_elem = '<p class="' + options.hash.classBilingual + '">' + str2 + '</p>';

        if ("horizontal" === options.hash.align) {
            return '<div class="container_flex_horizontal">' + main_html_elem + bilingual_html_elem + '</div>'
        } else {
            return '<div class="container_flex_vertical">' + main_html_elem + bilingual_html_elem + '</div>'
        }
    }

    if (languageInfo && languageInfo.secondaryLanguage !== null && languageInfo.secondaryLanguage !== undefined) {
        const str2 = i18next.t(i18n_key, {lng: languageInfo.secondaryLanguage});
        const secondary_html_elem = '<p class="' + options.hash.classSecondaryLanguage + '">' + str2 + '</p>';

        if ("horizontal" === options.hash.align) {
            return '<div class="container_flex_horizontal">' + main_html_elem + secondary_html_elem + '</div>'
        } else {
            return '<div class="container_flex_vertical">' + main_html_elem + secondary_html_elem + '</div>'
        }
    }


    return main_html_elem;

}

module.exports = languageHandler;
