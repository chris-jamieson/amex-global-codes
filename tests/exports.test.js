/* global describe:false, it:false */
const chai = require("chai");
const _ = require("underscore");

const lib = require("../index");

const expect = chai.expect;
chai.config.includeStack = true;

describe("# Library exports", () => {
  it("should export a single object", () => {
    // top level
    expect(lib).to.be.an("object");
    expect(lib).to.have.property("regions");

    // regions
    expect(lib.regions).to.be.an("object");
    expect(lib.regions).to.have.property("all");
    expect(lib.regions.all).to.be.a("function");
    expect(lib.regions).to.have.property("byCountryISONumber");
    expect(lib.regions.byCountryISONumber).to.be.a("function");
    expect(lib.regions).to.have.property("formatRegionCode");
    expect(lib.regions.formatRegionCode).to.be.a("function");
  });
});
