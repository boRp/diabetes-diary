

Template.export.helpers({
   count: function () {
       return CheckpointsHelper.getList().count();
   }
});

Template.export.events({
    'click #intent-test': function () {

        var csvData = Csv.getCheckpointCsvHeader();
        CheckpointsHelper.getList().forEach(function (checkpoint) {
            csvData += Csv.checkpointToCsvLine(checkpoint);
        });

        var action = "android.intent.action.SEND";
        var extras = {};
        extras["android.intent.extra.TEXT"] = csvData;

        var successFunc = function() {
            console.log('success');
        };

        var failFunc = function(){
            console.log('FAILED!');
            alert('Failed to open URL via Android Intent');
        };

        if (Meteor.isCordova) {
            window.plugins.webintent.startActivity(
                {
                    action: action,
                    type: 'text/plain',
                    extras: extras
                },
                successFunc,
                failFunc
            );

        } else {
            //console.log('cordova mock', action, extras);
            console.log(csvData);
            alert("Hint: Open console (F12) to access the full data.\n\n" + csvData);
        }


    }
});
