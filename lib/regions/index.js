const _ = require('underscore');
const rightPad = require('right-pad');

const regions = require('./data.json');

function all(excludeCountries) {
  let result = regions;

  if (excludeCountries) {
    result = _.filter(regions, (item) => {
      return item.isCountry !== 'TRUE';
    });
  }

  return result;
}

function byCountryISONumber(countryCode) {
  const result = _.where(regions, { countryCode: countryCode.toString() });
  return result;
}

function formatRegionCode(regionCode) {
  const outputCode = rightPad(regionCode, 3, ' ');
  return outputCode;
}

module.exports = {
  all,
  byCountryISONumber,
  formatRegionCode,
};
