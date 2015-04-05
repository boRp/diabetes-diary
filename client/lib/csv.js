Csv = function () {

    this.getCheckpointCsvHeader = function () {
        return 'Datum;Blutzucker;Kommentar;' + "\n";
    };

    this.checkpointToCsvLine = function (checkpoint) {
        var date = checkpoint.date ? checkpoint.date.toLocaleString() : '';
        var bloodSugar = checkpoint.measurement.bloodSugar
            ? checkpoint.measurement.bloodSugar.value
            : '';

        return date
            + ';' + bloodSugar
            + ';' + (checkpoint.comment || '')
            + ';'
            + "\n"
        ;
    };

    return this;
}();