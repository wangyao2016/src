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
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
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

                })
            }
        }
    ]);