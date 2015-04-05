
Template.langSwitch.events({

  'click .lang-switch': function (ev) {
    var $el = $(ev.target);
    var lang = $el.data('lang');
    
    languageSwitcher.setLanguage(lang);
  }

});
