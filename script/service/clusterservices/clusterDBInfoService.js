angular.module('mainAppServices')
    .service('clusterDBInfoService', function() {
        var clusteDB = {};
        clusteDB.name = 'clusterDBInfoService';
        var version = '';
        var db = '';
        var status = '';
        clusteDB.setVersion = function(ve) {
            version = ve;
            console.log(version);
        };
        clusteDB.getVersion = function() {
            return version;
        };
        clusteDB.setDBType = function(type) {
            db = type;
        };
        clusteDB.getDBType = function() {
            return db;
        };
        clusteDB.setStatus = function(sta) {
            status = sta;
        };
        clusteDB.getStatus = function() {
            return status;
        };
        return clusteDB;
    });