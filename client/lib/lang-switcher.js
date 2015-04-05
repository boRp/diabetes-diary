languageSwitcher = {
  'session': {
    'key' : 'language'
  },

  'getLanguage': function () {
    return Session.get(languageSwitcher.session.key);
  },
  'setLanguage': function (lang) {
    Session.set(languageSwitcher.session.key, lang);

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
