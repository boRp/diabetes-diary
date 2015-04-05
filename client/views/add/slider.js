
Template.slider.rendered = function () {

};


Template.slider.helpers({
});

Template.slider.events({

    'change .sliderRangeToggle': function (ev) {
        //console.log('slider range toggle!', this);
        var $el = $(ev.target);
        var $slider = $('#' + this.name);

        var range = $el.is(":checked") ? this.ranges.high : this.ranges.default;
        $slider.noUiSlider({
            start: (range.min + range.max) / 2,
            range: range
        }, true);
    }


});







