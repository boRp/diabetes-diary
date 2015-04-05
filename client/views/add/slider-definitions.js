
sliderDefinitions = [

    {
        name: 'sliderBloodSugar',
        label: 'GLOBAL.BLOOD_SUGAR',
        collapsed: '',
        ranges: {
            default: {min: 0, max: 350},
            high: {min: 351, max: 500}
        },
        noUiSlider: {
            start: 150,
            step: 1,
            range: {},
            format: wNumb({
                decimals: 0,
                postfix: ' mg/dl'
            }),
            connect: true
        }
    },

    {
        name: 'sliderFood',
        label: 'GLOBAL.FOOD',
        collapsed: 'collapsed',
        ranges: {
            default: {min: 0, max: 40},
            high: {min: 41, max: 100}
        },
        noUiSlider: {
            start: 15,
            step: 0.5,
            range: {},
            format: wNumb({
                decimals: 1,
                postfix: ' BE'
            }),
            connect: true
        }
    },

    {
        name: 'sliderDosage',
        label: 'GLOBAL.DOSAGE',
        collapsed: 'collapsed',
        ranges: {
            default: {min: 0, max: 25},
            high: {min: 26, max: 100}
        },
        noUiSlider: {
            start: 13,
            step: 0.5,
            range: {},
            format: wNumb({
                decimals: 1,
                postfix: ' IE'
            }),
            connect: true
        }
    }

];
