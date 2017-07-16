angular.module('mainAppServices')
    .service('dbVersionService', function() {
        var dbVersion = {};
        dbVersion.name = 'dbVersionService';
        var version = '';
        dbVersion.getData = function() {
            return version;
        };
        dbVersion.setData = function(id) {
            version = id;
        };
        return dbVersion;
    });