/* global describe:false, it:false */
const chai = require('chai');
const _ = require('underscore');

const lib = require('../index');

const expect = chai.expect;
chai.config.includeStack = true;

describe('## Geolocation of regions for points', () => {
  it('should identify regions where a point exists - falmouth', (done) => {
    // Falmouth
    const lat = '50.156010';
    const lon = '-5.071080';

    lib.regions
      .findRegionsForGeoPoint(lat, lon, 'GB')
      .then((regions) => {
        expect(regions).to.be.an('array');
        expect(regions.length).to.equal(1);
        expect(regions[0]).to.be.an('object');
        expect(regions[0].name).to.equal('CORNWALL');
        return done();
      })
      .catch(done);
  });

  it('should identify regions where a point exists - PETERBOROUGH', (done) => {
    // PETERBOROUGH
    const lat = '52.555272';
    const lon = '-0.308502';

    lib.regions
      .findRegionsForGeoPoint(lat, lon, 'GB')
      .then((regions) => {
        expect(regions).to.be.an('array');
        expect(regions.length).to.equal(1);
        expect(regions[0]).to.be.an('object');
        expect(regions[0].name).to.equal('PETERBOROUGH');
        return done();
      })
      .catch(done);
  });

  it('should identify regions where a point exists - HIGHLAND', (done) => {
    // HIGHLAND
    const lat = '56.950030';
    const lon = '-4.530069';

    lib.regions
      .findRegionsForGeoPoint(lat, lon, 'GB')
      .then((regions) => {
        expect(regions).to.be.an('array');
        expect(regions.length).to.equal(1);
        expect(regions[0]).to.be.an('object');
        expect(regions[0].name).to.equal('HIGHLAND');
        return done();
      })
      .catch(done);
  });

  it('should identify regions where a point exists - FERMANAGH AND OMAGH', (done) => {
    // FERMANAGH AND OMAGH
    const lat = '54.581116';
    const lon = '-7.463769';

    lib.regions
      .findRegionsForGeoPoint(lat, lon, 'GB')
      .then((regions) => {
        expect(regions).to.be.an('array');
        expect(regions.length).to.equal(1);
        expect(regions[0]).to.be.an('object');
        expect(regions[0].name).to.equal('FERMANAGH AND OMAGH');
        return done();
      })
      .catch(done);
  });

  it('should return empty array when no region exists for the point', (done) => {
    // in France
    const lat = '48.149138';
    const lon = '0.827704';

    lib.regions
      .findRegionsForGeoPoint(lat, lon, 'GB')
      .then((regions) => {
        expect(regions).to.be.an('array');
        expect(regions.length).to.equal(0);
        return done();
      })
      .catch(done);
  });
});
