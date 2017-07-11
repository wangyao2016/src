/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls') //backup detail控制器
    .controller('backupCtrl_detail', ['$scope', '$http', 'getService',
        function($scope, $http, getService) {
            var vm = $scope.vm = {};
            vm.getBackupDetail = [];
            getService.getServiceResult("data/backup_detail.json")
                .then(function(data, status, headers, config) {
                    if (angular.fromJson(data.data.getBackupDetail) != undefined) {
                        vm.getBackupDetail = angular.fromJson(data.data.getBackupDetail);
                    } else {
                        console.log("get getBackupDetail  error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("error load backupDetail.json");
                });
        }
    ]);