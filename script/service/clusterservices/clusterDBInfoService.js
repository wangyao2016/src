angular.module('mainAppServices')
    .service('clusterDBInfoService', function() {
        var clusteDB = {};
        clusteDB.name = 'clusterDBInfoService';
        var version = '';
        var db = '';
        var configid = '';
        var configname = '';
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
        clusteDB.setId = function(id) {
            configid = id;
        };
        clusteDB.getId = function() {
            return configid;
        };
        clusteDB.setConfigname = function(name) {
            configname = name;
        };
        clusteDB.getConfigname = function() {
            return configname;
        };

        return clusteDB;
    });