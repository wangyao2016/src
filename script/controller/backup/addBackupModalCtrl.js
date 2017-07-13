/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('addBackupModalCtrl', ['$scope', '$stateParams', '$uibModalInstance', 'dataService', 'getService', 'httpService',
        function($scope, $stateParams, $uibModalInstance, dataService, getService, httpService) {
            var vm = $scope.vm = {};
            vm.backups = [];
            vm.activeBackupList = [];


            //console.log("*******start*****");
            //var scan = $scope.$on('call', function(event,data1){
            //    console.log("************");
            //    vm.activeBackupList =data1;//接受值
            //    console.log(data1);
            //});
            //scan();
            //console.log("*******end*****");

            getService.getServiceResult("rds/v1/mysql/clusters/"+$stateParams.clusterId+"/backups")
                .then(function(data, status, headers, config) {
                    console.log(data);
                    if (angular.fromJson(data.data.backupList) != undefined) {
                        vm.backups = angular.fromJson(data.data.backupList);
                        for(var i=0;i<vm.backups.backups.length;i++){
                            if(vm.backups.backups[i].status=="COMPLETED"){
                                vm.activeBackupList.push(vm.backups.backups[i]);
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
                    "fatherBackup_id": $scope.selectValue==null?"":$scope.selectValue,
                    "discription": vm.backup_add.desc==null?"":vm.backup_add.desc,
                    "backup_name": vm.backup_add.name,
                    "storing_time": vm.backup_add.timePeriod==null?"":"1095"
                };
                httpService.getServiceResult("post", "rds/v1/mysql/clusters/" + id + "/backups", angular.fromJson(data))
                    .then(function(data, status, headers, config) {
                        console.log(data);
                        $uibModalInstance.close({ data: data });
                    }).catch(function(data, status, headers, config) {
                        console.log(data);
                        $uibModalInstance.close({ data: data })
                });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);