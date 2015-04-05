
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});


Router.route('/', function () {
    this.render('add');
});



Router.route('/graph', function () {
    this.render('graph');
});

Router.route('/list', function () {
    this.render('checkpointsList');
});

Router.route('/add', function () {
    this.render('add');
});

Router.route('/export', function () {
    this.render('export');
});



if (!Meteor.isCordova) {
    Router.route('/info', function () {
        this.render('info');
    });
}