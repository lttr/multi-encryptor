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


var Pipe = function(number, ciphers) {
  this.number = number || 1;
  this.chosenCiphers = ciphers;
  this.searchText = null;
  this.selectedCipher = null;
  this.getNumber = function() {
    return this.number;
  };
}

var CiphersList = [];