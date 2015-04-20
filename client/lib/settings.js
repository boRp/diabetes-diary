Settings = new Ground.Collection('settings', { connection: null }); // client-side ONLY


function SettingsHelper() {

  this.get = function (key) {
    var result = Settings.findOne({name: key});
    if (result) {
      console.log('GET (found): ', result.value);
      return result.value;
    }
    return null;
  };

  this.set = function (key, value) {
    Settings.upsert(
      {name: key},
      {$set: {value: value}}
    );
  };

}

settingsHelper = new SettingsHelper();
settingsHelper.set(CONST.SETTINGS.LANGUAGE, 'de');
