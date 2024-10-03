function getOnlinePaymentMethodLocaleKey(website, app) {
  const baseKey = 'whereToPay.italy.online.description';

  if (website && app) {
    return `${baseKey}.websiteAndApp`;
  } else if (website && !app) {
    return `${baseKey}.websiteOnly`;
  } else if (!website && app) {
    return `${baseKey}.appOnly`;
  } else {
    return `${baseKey}.default`;
  }
}

module.exports = getOnlinePaymentMethodLocaleKey;
