'use strict';

angular
  .module('encrypter', [
    'angular-clipboard',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'pascalprecht.translate',
    'ui.router',
    'vAccordion'
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
  })
  .config(function($stateProvider) {
    $stateProvider.state('encrypter', {
      abstract: true,
      url: '/{locale}'
    });
  });


var Pipe = function(number, ciphers) {
  this.number = number || 1;
  this.chosenCiphers = ciphers;
  this.searchText = null;
  this.selectedCipher = null;
  this.addCipher = function(cipher) {
    this.chosenCiphers.push(cipher);
  };
  this.getNumber = function() {
    return this.number;
  };
}

var CiphersList = [];
