# American Express Global Codes

This is a helper package which provides access to American Express Global Codes and information for Browsers and Node.js. It is useful for validation and in frontend code (e.g. to provide lists of valid codes).

All information is based on that provided in American Express Global Codes & Information Guide, using data from the October 2017 guide.

## Installation

```bash
# npm
npm install --save amex-global-codes

# yarn
yarn add amex-global-codes
```

Require the module as normal e.g.

`const amexGlobalCodes = require('amex-global-codes');`

## Currently included

### Region codes

Exposes region codes and helpers corresponding to information contained in
American Express Global Codes & Information Guide pp. 107-224

#### Usage examples

##### List all regions

`amexGlobalCodes.regions.all(excludeCountries);`

```javascript
// get all regions - most useful for validation purposes
const allRegions = amexGlobalCodes.regions.all();
/**
 * output example:
 *
 * [ { countryCode: '004',
 *   name: 'AFGHANISTAN',
 *   regionCode: 'AF',
 *   isCountry: true },
 * { countryCode: '004',
 *   name: 'BADAKHSHAN',
 *   regionCode: 'BDS',
 *   isCountry: false },
 * { countryCode: '004',
 *   name: 'BADGHIS',
 *   regionCode: 'BDG',
 *   isCountry: false },
 *   ... etc.
 * ]
 **/

// get all regions, exluding countries
// beware: some countries have no sub-regions so by calling this function
// you will exclude them e.g. American Samoa (AS), Isle of Man (IM) etc.
const allRegions = amexGlobalCodes.regions.all(true);

/**
 * output example:
 *
 * [{ countryCode: '004',
 *   name: 'BADAKHSHAN',
 *   regionCode: 'BDS',
 *   isCountry: false },
 * { countryCode: '004',
 *   name: 'BADGHIS',
 *   regionCode: 'BDG',
 *   isCountry: false },
 * { countryCode: '004',
 *   name: 'BAGHLAN',
 *   regionCode: 'BGL',
 *   isCountry: false },
 *   ... etc.
 * ]
 **/
```

##### List all regions which a point falls within

NOTE: currently GeoJSON definitions are _only_ provided for the United Kingdom.

```javascript
// Falmouth
const lat = '50.156010';
const lon = '-5.071080';

const regions = await lib.regions.findRegionsForGeoPoint(lat, lon, 'GB');

// regions[0].name === 'CORNWALL'
```

##### List all regions for a single country

`amexGlobalCodes.regions.byCountryIsoCode(countryNumber, excludeCountries);`

```javascript
// Use ISO Country Numbers, ISO alpha2 codes or ISO alpha3 codes (case insensitive). The examples below are for United Kingdom
amexGlobalCodes.regions.byCountryIsoCode('826'); // ISO number
amexGlobalCodes.regions.byCountryIsoCode('gb'); // ISO alpha 2
amexGlobalCodes.regions.byCountryIsoCode('GB'); // ISO alpha 2 (uppercase)
amexGlobalCodes.regions.byCountryIsoCode('gbr'); // ISO alpha 3
amexGlobalCodes.regions.byCountryIsoCode('GBR'); // // ISO alpha 3 (uppercase)

/**
 * output example:
 * [ { countryCode: '826',
 *   name: 'UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN IRELAND (THE)',
 *   regionCode: 'GB',
 *   isCountry: true },
 * { countryCode: '826',
 *   name: 'ABERDEEN CITY',
 *   regionCode: 'ABE',
 *   isCountry: false },
 * { countryCode: '826',
 *   name: 'ABERDEENSHIRE',
 *   regionCode: 'ABD',
 *   isCountry: false },
 * { countryCode: '826',
 *   name: 'ANGUS',
 *   regionCode: 'ANS',
 *   isCountry: false },
 * ...etc.
 * ]
 **/

// if you don't want to include the country itself, you can exclude countries
// beware - countries with no subregions will return no results if this flag is used
// e.g. American Samoa, Isle of Man etc.
amexGlobalCodes.regions.byCountryIsoCode('826', true);
/**
 * output example:
 * [ { countryCode: '826',
 *   name: 'ABERDEEN CITY',
 *   regionCode: 'ABE',
 *   isCountry: false },
 * { countryCode: '826',
 *   name: 'ABERDEENSHIRE',
 *   regionCode: 'ABD',
 *   isCountry: false },
 * { countryCode: '826',
 *   name: 'ANGUS',
 *   regionCode: 'ANS',
 *   isCountry: false },
 * { countryCode: '826',
 *   name: 'ANTRIM',
 *   regionCode: 'ANT',
 *   isCountry: false },
 * ...etc.
 * ]
 **/
```

##### Format region codes

As the American Express Global Codes & Information Guide states:

> Region Code field entries are defined as three-byte alphanumeric values. All one- and two-byte codes must be left justified and character space filled. For example, code “01” must be entered as “01~”, where a tilde (~) represents a character space. Similarly, code “1” would be entered as “1~~”; and code “AB” would be entered as “AB~”.

This function is essentially just to save you from including [right-pad](https://www.npmjs.com/package/right-pad). It will also convert lowercase strings to uppercase.

`amexGlobalCodes.regions.formatRegionCode("V"); // RHONE-ALPES`

```javascript
// RHONE-ALPES
amexGlobalCodes.regions.formatRegionCode('V');
// output: "V  "

// BOUENZA
amexGlobalCodes.regions.formatRegionCode('11');
// output: "11 "

// MOSKVA
amexGlobalCodes.regions.formatRegionCode('MOW');
// output: "MOW"
```

## Scripts

GeoJSON files can be very detailed and therefore large filesizes. This introduces performance penalties and balloons the size of the library. It is recommended to run the `scripts/simplify-geojson.js` script after adding or modifying GeoJSON files.

Note that the TOLERANCE variable in the script file can be specified as needed.

## Not yet included (TODO)

### Country Codes

### MCC Codes

### Currency Codes

## Contributing

Pull Requests are welcome!

Please ensure a test is included (see `tests` directory for examples). These can be run using `yarn test` or `yarn test:watch`.

## Notes

GeoJSON definitions adapted from [findthatpostcode](https://findthatpostcode.uk/) and [martinjc's GeoJSON collection](https://github.com/martinjc/UK-GeoJSON).
