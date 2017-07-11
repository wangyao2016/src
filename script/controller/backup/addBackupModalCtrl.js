/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('addBackupModalCtrl', ['$scope', '$stateParams', '$uibModalInstance', 'dataService', 'getService',
        function($scope, $stateParams, $uibModalInstance, dataService, getService) {
            var vm = $scope.vm = {};
            vm.backupList = [];
            vm.activeBackupList = [];
            getService.getServiceResult("data/backup_list.json")
                .then(function(data, status, headers, config) {
                    if (angular.fromJson(data.data.backupList) != undefined) {
                        vm.backupList = angular.fromJson(data.data.backupList);
                        for(var i=0;i<vm.backupList.backups.length;i++){
                            if(vm.backupList.backups[i].status=="COMPLETED"){
                                vm.activeBackupList.push(vm.backupList.backups[i]);
                            }
                        }
                    } else {
                        console.log("get backupList  error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("error load backupList.json");
                    console.log(data);
                });
            //ok方法，点击确认触发
            vm.addBackupOk = function() {
                var id = dataService.getData();
                var data = {
                    "id": id,
                    "instance_id": $stateParams.clusterId,
                    "fatherBackup_id": $scope.selectValue,
                    "discription": vm.backup_add.desc,
                    "backup_Name": vm.backup_add.name,
                    "storing_time": vm.backup_add.timePeriod
                };
                $uibModalInstance.close({ data: data });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);