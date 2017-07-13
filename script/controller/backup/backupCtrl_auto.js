/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls') //自动备份控制器
    .controller('backupCtrl_auto',  ['$scope', '$stateParams', '$http', 'getService',
        function($scope, $stateParams, $http, getService) {
            var vm = $scope.vm = {};
            vm.autoBackupSet = [];
            vm.autobackups = [];
            getService.getServiceResult("rds/v1/mysql/clusters/"+$stateParams.clusterId+"/autobackup")
                .then(function(data, status, headers, config) {
                    if (data.data.autobackups != undefined) {
                        if(data.data.autobackups=="unset"){
                            vm.autoBackupSet.period="暂未设置";
                            vm.autoBackupSet.time="暂未设置";
                            vm.autoBackupSet.action="暂未设置";
                            vm.autoBackupSet.storingTime="暂未设置";
                        }else{
                            vm.autobackups = angular.fromJson(data.data.autobackups);
                            vm.autoBackupSet.period=vm.autobackups.list[0].week;
                            var tmpNum = vm.autobackups.list[0].hour+1;
                            vm.autoBackupSet.time=vm.autobackups.list[0].hour+":00-"+tmpNum+":00";
                            vm.autoBackupSet.action=vm.autobackups.list[0].action;
                            vm.autoBackupSet.storingTime=vm.autobackups.list[0].storing_time;
                        }
                    } else {
                        console.log("get autoBackupSet  error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("error load autoBackupSet");
                    console.log(data);
                });
        }
    ]);