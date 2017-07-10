angular.module('mainAppCtrls')
    //instance.db页面控制器
    .controller('dbCtrl', ['$scope', '$http', 'dataService', 'httpService',
        function($scope, $http, dataService, httpService) {
            var vm = $scope.vm = {};
            vm.db = [];
            //get方法，展示数据库列表
            var id = dataService.getData();
            var data = { "id": id };
            httpService.getServiceResult("get", "v1/oracle/instances/" + id + "/databases", data)
                .success(function(data, status, headers, config) {
                    console.log(angular.fromJson(data.Db_display).databases);
                    if (angular.fromJson(data.Db_display).databases != undefined) {
                        vm.db = angular.fromJson(data.Db_display).databases;
                    } else {
                        console.log("get db list error");
                    }
                }).error(function(data, status, headers, config) {
                    console.log("connect error get db list");
                });
        }
    ]);