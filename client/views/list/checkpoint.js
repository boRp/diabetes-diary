
Template.checkpoint.helpers({

    dateLocal: function () {
        return moment(this.date).format('DD.MM.YYYY, HH:mm');
    }


});

Template.checkpoint.events({
    'click .list-group-item': function () {
        if (confirm('Messpunkt löschen?')) {
            CheckpointsHelper.remove(this);
            //Meteor.call('removeDate', this);
        }
    }
});





