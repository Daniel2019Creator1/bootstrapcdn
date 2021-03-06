'use strict';

const assert = require('assert').strict;
const { redirects } = require('../config').app;
const helpers = require('./test_helpers');

describe('redirects', () => {
    for (const redirect in redirects) {
        if (Object.prototype.hasOwnProperty.call(redirects, redirect)) {
            const redirectFrom = redirects[redirect].from;
            const redirectTo = redirects[redirect].to;
            let uri = '';
            let response = {};

            before((done) => {
                uri = helpers.getURI(redirectFrom);

                helpers.prefetch(uri, (res) => {
                    response = res;
                    done();
                });
            });

            it(`"${redirectFrom}" redirects to "${redirectTo}"`, (done) => {
                assert.equal(response.statusCode, 301);
                assert.equal(response.headers.location, redirectTo);
                done();
            });
        }
    }
});
