
Template.graph.rendered = function () {

    $.material.init();

};


Template.graph.events({
    'click #debug-test-data': function () {
        console.log('test-data!');

        for (var i = 0; i < 20; i++) {
            var month = Math.round(Math.random() * 11);
            var day = Math.round(Math.random() * 30);
            var hour = Math.round(Math.random() * 24);
            var min = Math.round(Math.random() * 60);

            var bloodSugar = Math.round(Math.random() * 300);

            var date = new Date(2015, month, day, hour, min, 0);

            var checkpoint = {
                date: date,
                timestamp: date.getTime() / 1000,
                measurement: {
                    bloodSugar: { value: bloodSugar },
                    food: null,
                    dosage: null
                }
            };

            Checkpoints.insert(checkpoint);
        }

    }
});
