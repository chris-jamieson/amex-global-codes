const { isBrowser, isNode } = require('browser-or-node');
const _ = require('underscore');
const rightPad = require('right-pad');
const lookup = require('country-code-lookup');
const path = require('path');
const inside = require('point-in-geopolygon');

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

function byCountryIsoCode(countryCode, excludeCountries) {
  const country = lookup.byIso(countryCode.toString().toUpperCase());
  if (!country) {
    return [];
  }

  const query = { countryCode: country.isoNo };

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

let findRegionsForGeoPoint;
if (isNode) {
  const { readFile } = require('fs/promises');
  const { existsSync } = require('fs');

  findRegionsForGeoPoint = async function (
    latitidue,
    longitude,
    countryIsoCode
  ) {
    let matchingRegions = [];
    if (!latitidue || !longitude) {
      throw new Error('Latitude and longitude must be provided');
    }

    let regions;
    if (countryIsoCode) {
      regions = byCountryIsoCode(countryIsoCode, true);
    } else {
      regions = all(true);
    }

    try {
      for (const region of regions) {
        if (region.regionCode === 'CAN') {
          console.log('CAN!');
        }
        // try to find GeoJSON definition for region
        const p = path.join(
          __dirname,
          'geojson',
          region.countryCode,
          `${region.regionCode}.geojson`
        );
        const geoDefExists = existsSync(p);
        if (geoDefExists) {
          const geoDef = await readFile(p);
          const map = JSON.parse(geoDef);

          // check if point is within this one
          const isInside = inside.feature(map, [longitude, latitidue]);
          if (isInside !== -1) {
            matchingRegions.push(region);
          }
        }
      }
    } catch (error) {
      throw error;
    }

    return matchingRegions;
  };
} else {
  findRegionsForGeoPoint = function () {
    const err =
      'Function findRegionsForGeoPoint() is not available in browser environment';
    throw new Error(err);
  };
}

module.exports = {
  all,
  byCountryIsoCode,
  formatRegionCode,
  findRegionsForGeoPoint,
};
