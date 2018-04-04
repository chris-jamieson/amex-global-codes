const _ = require('underscore');
const rightPad = require('right-pad');

const regions = require('./data.json');

function all(excludeCountries) {
  let result = regions;

  if (excludeCountries) {
    result = _.filter(regions, (item) => {
      return item.isCountry !== true;
    });
  }

  return result;
}

function byCountryISONumber(countryCode, excludeCountries) {
  const query = { countryCode: countryCode.toString() };

  if (excludeCountries) {
    query.isCountry = false;
  }

  const result = _.where(regions, query);
  return result;
}

function formatRegionCode(regionCode) {
  const outputCode = rightPad(regionCode, 3, ' ').toUpperCase();
  return outputCode;
}

module.exports = {
  all,
  byCountryISONumber,
  formatRegionCode,
};
