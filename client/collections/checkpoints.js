//Checkpoints = new Meteor.Collection("checkpoints");
Checkpoints = new Ground.Collection('checkpoints', { connection: null }); // client-side ONLY
//Checkpoints = new Ground.Collection('checkpoints'); // grounded



CheckpointsHelper = {

    getList: function () {
        var criteria = {};

        var timestampFilter = {};
        if (Session.get('dateRangeMin')) {
            timestampFilter['$gt'] = Session.get('dateRangeMin') / 1000;
        }
        if (Session.get('dateRangeMax')) {
            timestampFilter['$lt'] = Session.get('dateRangeMax') / 1000;
        }

        if (Object.keys(timestampFilter).length != 0) {
            criteria['timestamp'] = timestampFilter;
        }

        return Checkpoints.find(criteria, {limit: 100, sort: {"date": -1}});
    },

    add: function (bloodSugarValue, foodValue, dosageValue, date, comment) {

        if (!bloodSugarValue && !foodValue && !dosageValue) {
            return false;
        }

        var bloodSugar;
        var food;
        var dosage;

        if (bloodSugarValue) {
            bloodSugar = {
                unit: CONST.BLOOD_SUGAR.UNIT.MG_DL,
                value: bloodSugarValue
            };
        }
        if (foodValue) {
            food = {
                unit: CONST.FOOD.UNIT.BREAD_UNIT,
                value: foodValue
            };
        }
        if (dosageValue) {
            dosage = {
                type: CONST.DOSAGE.TYPE.BOLUS,
                unit: CONST.BLOOD_SUGAR.UNIT.MG_DL,
                value: dosageValue
            };
        }

        if (!date) {
            date = new Date();
        }

        var checkpoint = {
            date: date,
            timestamp: Math.floor(date.getTime() / 1000),
            measurement: {
                bloodSugar: bloodSugar,
                food: food,
                dosage: dosage
            },
            comment: comment
        };

        console.log('Saving new checkpoint ..', checkpoint);
        Checkpoints.insert(checkpoint);

        return true;
    },

    remove: function (checkpoint) {
        Checkpoints.remove({_id: checkpoint._id});
    },



    removeAll: function () {
        console.log('REMOVING ALL checkpoint data!');
        Checkpoints.find().forEach(function (item) {
            CheckpointsHelper.remove(item);
        })
    }

};



sampleCheckpoint = {
    _id: "apiutc243t7wazmcuihc324", // automatisch von MongoDb vergeben

    measurement: {
        // wenn zB keine dosis gegeben wurde, wird kein object angelegt
        // ->  dosis: null      anstelle -> dosis: { ... }

        bloodSugar: {
            unit: '',               // mg/dl, ..
            value: 0                // der eigenetliche wert (float)
        },
        food: {
            unit: '',               // BE; ..?
            value: 0                // der eigenetliche wert (float)
        },
        dosage: {
            type: '',               // basal|bolus
            unit: '',               // IE(?)
            value: 0                // der eigenetliche wert (float)
        },
    },
    time: 131231231                 // unixtimestamp in sek
};