angular.module('mainAppCtrls') //instance页面控制器
    .controller('clusterCtrl', ['$scope', '$http', '$uibModal', '$state', '$stateParams', 'dataService', 'httpService', '$window',
        function($scope, $http, $uibModal, $state, $stateParams, dataService, httpService, $window) {
            dataService.getData();
            dataService.setData($stateParams.clusterId);
            dataService.getData();

            var vm = $scope.vm = {};
            //进入到实例子页面之后，强制跳转到basicInfo子页面，打开基本信息tab页面
            $state.go('cluster.basicInfo');

            //传入实例id
            vm.activeTab = 0; //默认路由进入，active标签不存在，但是需要加载出实例详情信息
            vm.setActiveTab = function(num) {
                vm.activeTab = num;
            };
            vm.clusterId = $stateParams.clusterId;
            vm.clusterName = $stateParams.clusterName;
            //调用接口获得实例详情信息
            vm.clusterInfo = [];
            /*警告框相关开始*/
            vm.alerts = [];
            //删除单条警告
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };
            //逐个删除警告
            vm.closeAllAlert = function(length) {
                for (var i = length; i > 0; i--) {
                    vm.alerts.splice(i - 1, 1);
                }
            };

            // var id = dataService.getData();
            // httpService.getServiceResult("get", "rds/v1/mysql/clusters/" + id)
            //     .then(function(data, status, headers, config) {

            //         if (angular.fromJson(data.data.clusterDetail) != undefined) {
            //             var basicInfo = angular.fromJson(data.data.clusterDetail);
            //             console.log(basicInfo);
            //             clusterDBInfoService.setVersion(basicInfo.cluster.datastore.version);
            //             clusterDBInfoService.setDBType(basicInfo.cluster.datastore.type);
            //             if (basicInfo.cluster.instances[0].configuration) {
            //                 clusterDBInfoService.setId(basicInfo.cluster.instances[0].configuration.id);
            //                 clusterDBInfoService.setConfigname(basicInfo.cluster.instances[0].configuration.name);
            //             } else {
            //                 clusterDBInfoService.setId('');
            //                 clusterDBInfoService.setConfigname('');
            //             }

            //             console.log(angular.fromJson(basicInfo.cluster));
            //         } else {
            //             console.log("get cluster basicInfo error");
            //         }
            //     }).catch(function(data, status, headers, config) {
            //         console.log("error load basicInfo.json");
            //         console.log(data);
            //     });



            //添加新警告
            vm.addAlert = function(type, msg) {
                if (type === undefined || msg === undefined) {
                    vm.alerts.push({
                        type: 'alert-warning',
                        msg: '类型和内容不能为空.'
                    });
                } else {
                    vm.alerts.push({
                        type: type,
                        msg: msg
                    });
                }
            };
            /*警告框相关结束*/
            //终止实例
            vm.deleteCluster = function(size, parentSelector) {
                // rds/v1/mysql/clusters/"+clusterId+"/action
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var attachConfigModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'deleteInstanceModal-title',
                    ariaDescribedBy: 'deleteInstanceModal-body',
                    templateUrl: 'deleteInstanceModal.html',
                    controller: 'deleteInstanceModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                attachConfigModalInstance.result.then(function(result) {
                    console.log(result);
                    if (angular.fromJson(result.data.data.status).cluster.status === 'REBOOT') {
                        $window.location.reload();
                        // vm.addAlert("alert_success", "重启实例成功");
                        // //删除警示框
                        // $timeout(function() {
                        //         vm.closeAllAlert(vm.alerts.length)
                        //     },
                        //     6000);

                    }

                });
            };
            //备份实例
            vm.backupCluster = function(size, parentSelector) {
                // rds/v1/mysql/clusters/"+clusterId+"/action
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var attachConfigModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'backupInstanceModal-title',
                    ariaDescribedBy: 'backupInstanceModal-body',
                    templateUrl: 'backupInstanceModal.html',
                    controller: 'backupInstanceModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                attachConfigModalInstance.result.then(function(result) {
                    console.log(result);
                    if (angular.fromJson(result.data.data.status).cluster.status === 'REBOOT') {
                        $window.location.reload();
                        // vm.addAlert("alert_success", "重启实例成功");
                        // //删除警示框
                        // $timeout(function() {
                        //         vm.closeAllAlert(vm.alerts.length)
                        //     },
                        //     6000);

                    }

                });
            };
            //重启实例
            vm.resetCluster = function(size, parentSelector) {
                // rds/v1/mysql/clusters/"+clusterId+"/action
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var attachConfigModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'restartInstanceModal-title',
                    ariaDescribedBy: 'restartInstanceModal-body',
                    templateUrl: 'restartInstanceModal.html',
                    controller: 'restartInstanceModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                attachConfigModalInstance.result.then(function(result) {
                    console.log(result);
                    if (angular.fromJson(result.data.data.status).cluster.status === 'REBOOT') {
                        $window.location.reload();
                        // vm.addAlert("alert_success", "重启实例成功");
                        // //删除警示框
                        // $timeout(function() {
                        //         vm.closeAllAlert(vm.alerts.length)
                        //     },
                        //     6000);

                    }

                });
            };
        }
    ]);