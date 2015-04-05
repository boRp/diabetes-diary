

Template.diagram.rendered = function () {

    var d3Chart = new D3Chart('diagram');

};



D3Chart = function (elId) {
    var $window = $(window);
    var svgBase, svg, svgBrush;
    var xAxis, yAxis;
    var xScale, yScale;

    var brush;
    var line;
    var lineBrush;

    var xAxisBrush, yAxisBrush;
    var xScaleBrush, yScaleBrush;



    var heightOutside = 500;
    var margin = {top: 20, right: 20, bottom: 100, left: 40};
    var marginBrush = {top: 430, right: 20, bottom: 20, left: 40};

    var widthOutside;
    var width, height, heightBrush;


    var limit = {
        bloodSugar: {min: 80, max: 220}
    };
    var rectangleBackground;
    var rectangleGradient;


    var init = function () {
        setSize();
        initialSetup();

        $window.resize(function () {
            setSize();
        });
    };

    var setSize = function () {
        widthOutside = $window.width() - 25; // ~25px for browser scrollbar

        width = widthOutside - margin.left - margin.right;
        height = heightOutside - margin.top - margin.bottom;
        heightBrush = 50; //heightOutside - height - marginBrush.top - marginBrush.bottom;

        xScale = d3.time.scale().range([0, width]);
        yScale = d3.scale.linear().range([height, 0]);

        xScaleBrush = d3.time.scale().range([0, width]);
        yScaleBrush = d3.scale.linear().range([heightBrush, 0]);

        xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");
        yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        xAxisBrush = d3.svg.axis()
            .scale(xScaleBrush)
            .orient("bottom");
        yAxisBrush = d3.svg.axis()
            .scale(yScaleBrush)
            .orient("left");

        if (svgBase) {
            svgBase.attr("width", widthOutside)
               .attr("height", heightOutside);
            svg.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            dataUpdate();
        }
    };


    var initialSetup = function () {

        svgBase = d3.select("#" + elId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        svg = svgBase.append("g")
            .attr("class", "svg")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        ;

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
        ;

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Blutzucker")
        ;

        rectangleBackground = svg.append("rect").attr('class', 'background-rectangle');

        rectangleGradient = svg
            .append("linearGradient")
            .attr("id", "gradient-rectangle")
            .attr("y1", yScale(120))
            .attr("y2", yScale(150))
            .attr("x1", "0")
            .attr("x2", "0")
            .attr("gradientUnits", "userSpaceOnUse");

        rectangleGradient
            .append("stop")
            .attr("offset", 0.1)
            .attr("stop-color", "#ff0");
        rectangleGradient
            .append("stop")
            .attr("offset", 0.5)
            .attr("stop-color", "#0f0");
        rectangleGradient
            .append("stop")
            .attr("offset", 0.9)
            .attr("stop-color", "#ff0");


        svgBrush = svgBase.append("g")
            .attr("class", "svgBrush")
            .attr("transform", "translate(" + marginBrush.left + "," + marginBrush.top + ")")
        ;

        svgBrush.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + heightBrush + ")")
            .call(xAxisBrush)
        ;

        //svgBrush.append("g")
        //    .attr("class", "y axis")
        //    .call(yAxisBrush)
        //;

        brush = d3.svg.brush()
            .x(xScaleBrush)
            .on("brush", function () {
                xScale.domain(brush.empty() ? xScaleBrush.domain() : brush.extent());
                svg.selectAll('.path-blood-sugar').attr("d", line);
                svg.selectAll(".x.axis").call(xAxis);
            });



        line = d3.svg.line()
            .x(function(d) { return xScale(d.date); })
            .y(function(d) { return yScale(d.y); })
            .interpolate('linear')
        ;

        lineBrush = d3.svg.line()
            .x(function(d) { return xScaleBrush(d.date); })
            .y(function(d) { return yScaleBrush(d.y); })
            .interpolate('linear')
        ;

        svg.append("path")
            .attr('class', 'path-blood-sugar line')
        ;

        svgBrush.append("path")
            .attr('class', 'path-blood-sugar line')
        ;
    };


    var dataUpdate = function () {
        var dataSet = CheckpointsHelper.getList().fetch();

        dataSet.forEach(function(d) {
            if (d.measurement.bloodSugar) {
                d.y = d.measurement.bloodSugar.value;
                d.y = parseFloat(d.y);
            }
        });

        dataSet = dataSet.filter(function(d) {
            return d.y != null;
        });

        if (dataSet.length === 0) {
            console.log('empty data set');
            return;
        }

        //update scale domains and axises
        xScale.domain(d3.extent(dataSet, function(d) { return d.date; }));
        var yMin = d3.min(dataSet, function(d) { return d.y; });
        var yMax = d3.max(dataSet, function(d) { return d.y; });
        yScale.domain([yMin, yMax]);

        svg.selectAll(".x.axis").call(xAxis);
        svg.selectAll(".y.axis").call(yAxis);


        xScaleBrush.domain(xScale.domain());
        yScaleBrush.domain(yScale.domain());

        svgBrush.selectAll(".x.axis").call(xAxisBrush);
        svgBrush.selectAll(".y.axis").call(yAxisBrush);

        svgBrush.append("g")
            .attr("class", "x brush")
            .call(brush)
        .selectAll("rect")
            .attr("y", -6)
            .attr("height", heightBrush + 7);


        var rectangleMin = limit.bloodSugar.min < yMin ? yMin : limit.bloodSugar.min;
        var rectangleMax = limit.bloodSugar.max > yMax ? yMax : limit.bloodSugar.max;
        var rectangleTop = yScale(rectangleMax);
        var rectangleHeight = yScale(rectangleMin) - rectangleTop;

        rectangleBackground
            .attr("x", 0)
            .attr("y", rectangleTop)
            .attr("width", '100%')
            .attr("height", rectangleHeight)
        ;

        rectangleGradient
            .attr("y1", yScale(rectangleMin))
            .attr("y2", yScale(rectangleMax))
            .attr("x1", "0")
            .attr("x2", "0")
        ;


        // update the path/line
        var path = svg.selectAll('.path-blood-sugar');
        path.datum(dataSet);
        path.attr("d", line);

        var pathBrush = svgBrush.selectAll('.path-blood-sugar');
        pathBrush.datum(dataSet);
        pathBrush.attr("d", lineBrush);

        //updatePoints(dataSet);
    };


    var updatePoints = function (dataSet) {

        var points = svg.selectAll(".point")
            .data(dataSet, function(d) {
                return d._id;
            });

        points.enter()
            .append("svg:circle")
            .attr('class', 'point')
            .attr("stroke", "#666666")
            .attr("fill", function(d, i) { return "white" })
            .attr("cx", function(d, i) { return xScale(d.date) })
            .attr("cy", function(d, i) {return yScale(d.y) })
            .attr("r", function(d, i) { return 2 });

        points.transition()
            .attr("cx", function(d, i) { return xScale(d.date) })
            .attr("cy", function(d, i) { return yScale(d.y) });

        points.exit()
            .remove();
    };







    init();

    Deps.autorun(function(){
        dataUpdate();
    });

};
