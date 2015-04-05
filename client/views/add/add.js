
Template.add.rendered = function () {

    $.material.init();

    $('.clockpicker').clockpicker();
    $('.datepicker').datepicker({
        format: "dd.mm.yyyy",
        weekStart: 1,
        language: "de",
        orientation: "bottom auto",
        autoclose: true,
        todayHighlight: true
    });

    sliderDefinitions.forEach(function (sliderOptions) {
        var $slider = $('#' + sliderOptions.name);

        initOptions = sliderOptions.noUiSlider;
        initOptions.range.min = sliderOptions.ranges.default.min;
        initOptions.range.max = sliderOptions.ranges.default.max;
        initOptions.connect = 'lower';

        $slider.noUiSlider(initOptions);
        $slider.Link('lower').to($('#' + sliderOptions.name + 'Value'));
    });

};


Template.add.helpers({

    sliderFormGroups: function () {
        return sliderDefinitions;
    },

    currentDateFormatted: function () {
        return moment().format('DD.MM.YYYY');
    }

});

Template.add.events({

    /* save form */
    'click #add-save-btn': function (ev) {
        ev.preventDefault();

        var $bloodSugar = $('#sliderBloodSugar');
        var $food = $('#sliderFood');
        var $dosage = $('#sliderDosage');
        var $comment = $('#comment');

        var bloodSugarValue = $bloodSugar.closest('.form-group').hasClass('collapsed')
            ? null
            : $bloodSugar.val();

        var foodValue = $food.closest('.form-group').hasClass('collapsed')
            ? null
            : $food.val();

        var dosageValue = $dosage.closest('.form-group').hasClass('collapsed')
            ? null
            : $dosage.val();


        var $date = $('#date');
        var date = null;
        if (! $date.closest('.form-group').hasClass('collapsed')) {
            var $time = $('#time');

            var dateString = $date.val();
            var timeString = $time.val();

            var dateFormatted = dateString.replace(/(\d{2})\.(\d{2})\.(\d{4})/,'$3-$2-$1');
            var momentDate = moment(dateFormatted + ' ' + timeString);
            if (momentDate.isValid()) {
                date = momentDate.toDate();
            }
        }


        var saved = CheckpointsHelper.add(bloodSugarValue, foodValue, dosageValue, date, $comment.val());

        if (saved) {
            $comment.val('');
            Router.go('/graph');

        } else {
            alert('failure!');
        }
    },

    /* toggle collapse/expand of formGroups */
    'click .form-toggle-header': function (ev) {
        var $el = $(ev.target);
        var $parent = $el.closest('.form-group');
        var $toggleArrow = $parent.find('.form-toggle-btn');

        $parent.toggleClass('collapsed');
        $toggleArrow
            .toggleClass('mdi-navigation-expand-more')
            .toggleClass('mdi-navigation-expand-less');
    }


});







