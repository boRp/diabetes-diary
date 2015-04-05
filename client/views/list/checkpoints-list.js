
listHelper = function () {
  var sessionKeys = {
    listStyle: {
        key: 'listStyle',
        options: {
            list: 'list',
            csv: 'csv'
        }
    }
  };

  Session.setDefault(sessionKeys.listStyle.key, sessionKeys.listStyle.options.list);

  this.isListStyleCsv = function () {
      return Session.get(sessionKeys.listStyle.key) == sessionKeys.listStyle.options.csv;
  };

  this.toggleListStyle = function () {
      if (Session.get(sessionKeys.listStyle.key) == sessionKeys.listStyle.options.csv) {
          Session.set(sessionKeys.listStyle.key, sessionKeys.listStyle.options.list);
      } else {
          Session.set(sessionKeys.listStyle.key, sessionKeys.listStyle.options.csv);
      }
  };


  return this;
}();

Template.checkpointsList.helpers({

    checkpoints: function () {
        return CheckpointsHelper.getList();
    },

    isListStyleCsv: function () {
        return listHelper.isListStyleCsv();
    },

    checkpointCsvHeader: function () {
        return Csv.getCheckpointCsvHeader();
    }

});

Template.checkpointsList.events({
  'click #toggleListView': function () {
    listHelper.toggleListStyle();
  }
});





