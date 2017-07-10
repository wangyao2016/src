angular.module('mainAppServices') //获取当前的实例id
    .service('dataService', function() {
        var dataService = {}; //定义一个Object对象'
        dataService.name = "dataService";
        var instanceid; //定义一个私有化的变量
        //对私有属性写getter和setter方法
        dataService.setData = function(id) {
            instanceid = id;
        };
        dataService.getData = function() {
            return instanceid;
        };
        return dataService; //返回这个Object对象
    });