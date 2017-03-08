'use strict';

var angular = require('angular');

var encrypterController = require('./encrypterController');
var languages = require('./languages');

require('angular-messages');
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-translate');
require('angular-clipboard');
require('v-accordion');

var app = angular.module('encrypter', [
  'angular-clipboard',
  'ngAnimate',
  'ngMaterial',
  'ngMessages',
  'pascalprecht.translate',
  'vAccordion'
]);

app.controller('EncrypterController', encrypterController);

app.config(function($mdThemingProvider) {
  $mdThemingProvider
    .theme('default')
    .primaryPalette('brown')
    .accentPalette('amber')
    .warnPalette('deep-orange');
});

app.config(function($translateProvider) {
  $translateProvider
    .translations('en', languages.en)
    .translations('cs', languages.cs)
    .determinePreferredLanguage()
    .useSanitizeValueStrategy('escape');
});
