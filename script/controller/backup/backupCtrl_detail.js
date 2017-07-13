/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls') //backup detail控制器
    .controller('backupCtrl_detail', ['$scope', '$stateParams', '$http', 'getService',
        function($scope, $stateParams, $http, getService) {
            var vm = $scope.vm = {};
            vm.getBackupDetail = [];
            getService.getServiceResult("rds/v1/mysql/clusters/"+$stateParams.clusterId+"/backups/"+$stateParams.backupId)
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