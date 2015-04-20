
Meteor.startup(function () {

  var lang = settingsHelper.get(CONST.SETTINGS.LANGUAGE);
  console.log('setting language to: ', lang);

  languageSwitcher.setLanguage(lang);

});
