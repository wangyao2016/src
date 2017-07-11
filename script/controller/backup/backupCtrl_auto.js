/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls') //自动备份控制器
    .controller('backupCtrl_auto',  ['$scope', '$http', 'getService',
        function($scope, $http, getService) {
            var vm = $scope.vm = {};
            vm.backupList = [];
            getService.getServiceResult("data/backup_list.json")
                .then(function(data, status, headers, config) {

                    if (angular.fromJson(data.data.backupSize) != undefined) {
                        vm.backupList = angular.fromJson(data.data.backupList);
                    } else {
                        console.log("get backupList  error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("error load backupList.json");
                });
        }
    ]);