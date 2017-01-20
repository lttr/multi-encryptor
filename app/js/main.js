'use strict';

angular
  .module('encrypter', [
    'ngMessages',
    'ngMaterial',
    'ngAnimate',
    'vAccordion',
    'pascalprecht.translate'
  ])
  .controller('EncrypterController', EncrypterController)
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme('default')
      .primaryPalette('brown')
      .accentPalette('amber')
      .warnPalette('deep-orange');
  })
  .config(function($translateProvider) {
    $translateProvider
      .translations('en', enLang)
      .translations('cs', csLang)
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escape');
  });

