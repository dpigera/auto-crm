'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'player-basic',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
      },
    },

    APP: {
      PROMPT_API_URL: environment === 'production' 
        ? 'https://autocrm-prompt-server-project2.fly.dev'
        : 'http://localhost:8080'
    },
  };

  ENV['ember-cli-mirage'] = {
    enabled: false
  };

  if (environment === 'development') {
    ENV.APP.API_HOST = 'http://127.0.0.1:8090';
  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://gauntlet-autocrm-mvp.fly.dev/';
  }

  return ENV;
};
