/* global describe:false, it:false */
const chai = require("chai");
const _ = require("underscore");

const lib = require("../index");

const expect = chai.expect;
chai.config.includeStack = true;

describe("## Regions", () => {
  it("should list all regions", () => {
    const regions = lib.regions.all();

    expect(regions).to.be.an("array");
    expect(regions.length).to.equal(4596);

    const afghanistan = _.findWhere(regions, { regionCode: "AF" });
    expect(afghanistan).to.be.an("object");
    expect(afghanistan.isCountry).to.equal("TRUE");
    expect(afghanistan.countryCode).to.equal("004");
  });

  it("should list all regions, excluding countries", () => {
    const regions = lib.regions.all(true);

    expect(regions).to.be.an("array");
    expect(regions.length).to.equal(4359);
    const afghanistan = _.findWhere(regions, {
      regionCode: "AF",
      counrtyCode: "004"
    });
    expect(afghanistan).not.to.be.an("object");
    expect(afghanistan).to.be.undefined;
  });

  it("should list regions filtered by country's ISO number", () => {
    const gbRegions = lib.regions.byCountryISONumber("826");
    expect(gbRegions).to.be.an("array");
    expect(gbRegions.length).to.equal(231);
  });

  it("should format one byte region codes with appropriate padding", () => {
    const test = lib.regions.formatRegionCode("V"); // RHONE-ALPES
    expect(test).to.equal("V  ");
  });
});
