/* global describe:false, it:false */
const chai = require('chai');
const _ = require('underscore');

const lib = require('../index');

const expect = chai.expect;
chai.config.includeStack = true;

describe('## Regions', () => {
  it('should list all regions', () => {
    const regions = lib.regions.all();

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(4582);

    const afghanistan = _.findWhere(regions, { regionCode: 'AF' });
    expect(afghanistan).to.be.an('object');
    expect(afghanistan.isCountry).to.equal(true);
    expect(afghanistan.countryCode).to.equal('004');
  });

  it('should list all regions, excluding countries', () => {
    const regions = lib.regions.all(true);

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(4345);
    const afghanistan = _.findWhere(regions, {
      regionCode: 'AF',
      counrtyCode: '004',
    });
    expect(afghanistan).not.to.be.an('object');
    expect(afghanistan).to.be.undefined;
  });

  it("should list regions filtered by country's ISO number", () => {
    const regions = lib.regions.byCountryIsoCode('826');

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(217);

    const greatBritain = _.findWhere(regions, { regionCode: 'GB' });
    expect(greatBritain).to.be.an('object');
    expect(greatBritain.isCountry).to.equal(true);
    expect(greatBritain.countryCode).to.equal('826');
  });

  it('should handle Jersey', () => {
    const regions = lib.regions.byCountryIsoCode('JE');

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(1);

    const jersey = _.findWhere(regions, { regionCode: 'JE' });
    expect(jersey).to.be.an('object');
    expect(jersey.isCountry).to.equal(true);
    expect(jersey.countryCode).to.equal('832');
  });

  it("should list regions filtered by country's ISO number, excluding countries", () => {
    const regions = lib.regions.byCountryIsoCode('826', true);

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(216);

    const greatBritain = _.findWhere(regions, { regionCode: 'GB' });
    expect(greatBritain).not.to.be.an('object');
    expect(greatBritain).to.be.undefined;
  });

  it("should list regions filtered by country's ISO alpha 2 code", () => {
    const regions = lib.regions.byCountryIsoCode('gb');

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(217);

    const greatBritain = _.findWhere(regions, { regionCode: 'GB' });
    expect(greatBritain).to.be.an('object');
    expect(greatBritain.isCountry).to.equal(true);
    expect(greatBritain.countryCode).to.equal('826');
  });

  it("should list regions filtered by country's ISO alpha 3 code", () => {
    const regions = lib.regions.byCountryIsoCode('gbr');

    expect(regions).to.be.an('array');
    expect(regions.length).to.equal(217);

    const greatBritain = _.findWhere(regions, { regionCode: 'GB' });
    expect(greatBritain).to.be.an('object');
    expect(greatBritain.isCountry).to.equal(true);
    expect(greatBritain.countryCode).to.equal('826');
  });

  it('should format one byte region codes with appropriate padding', () => {
    const test = lib.regions.formatRegionCode('V'); // RHONE-ALPES
    expect(test).to.equal('V  ');
  });

  it('should format two byte region codes with appropriate padding', () => {
    const test = lib.regions.formatRegionCode('11'); // BOUENZA
    expect(test).to.equal('11 ');
  });

  it('should format three byte region codes with appropriate padding', () => {
    const test = lib.regions.formatRegionCode('MOW'); // MOSKVA
    expect(test).to.equal('MOW');
  });

  it('should ensure region codes are uppercased', () => {
    const test = lib.regions.formatRegionCode('v'); // RHONE-ALPES
    expect(test).to.equal('V  ');
  });
});
