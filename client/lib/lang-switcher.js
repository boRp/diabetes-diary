languageSwitcher = {
  
  'getLanguage': function () {
    return settingsHelper.get(CONST.SETTINGS.LANGUAGE) || "en";
  },
  'setLanguage': function (lang) {
    settingsHelper.set(CONST.SETTINGS.LANGUAGE, lang);

    TAPi18n.setLanguage(lang)
      .done(function () {
        // Session.set("showLoadingIndicator", false);
        console.log('Language switched to: ' + lang);
      })
      .fail(function (error_message) {
        alert(error_message);
      });
  },

}
