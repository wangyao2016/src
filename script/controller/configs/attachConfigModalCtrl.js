angular.module('mainAppCtrls')
    .controller('attachConfigModalCtrl', ['$scope', '$uibModalInstance', 'selection', 'httpService',
        function($scope, $uibModalInstance, selection, httpService) {
            var vm = $scope.vm = {};
            vm.configStatus = {};
            vm.configStatus.statusText = '';
            vm.configStatus.status = false;
            vm.selection = selection;
            console.log(selection);
            var datas = {};
            //ok方法，点击确认触发
            vm.attachConfigOk = function() {
                if (selection.selectconfigid !== '') {
                    vm.configStatus.statusText = "attached";
                    vm.configStatus.text = "该实例已经绑定了一个参数组，请先解绑定";
                    datas.statusText = "attached";
                    console.log(vm.configStatus);
                    if (vm.configStatus.status) {
                        $uibModalInstance.close({ data: datas });
                    }
                    vm.configStatus.status = !vm.configStatus.status;
                } else {
                    // vm.configStatus.statusText = "success";
                    httpService.getServiceResult('post', 'rds/v1/mysql/clusters/' + vm.selection.id + '/action', angular.fromJson({ "action": "configuration_attach", "configuration_id": vm.selection.configId }))
                        .then(function(data, status, headers, config) {
                            datas = data;
                        })
                        .catch(function(data, status, headers, config) {
                            datas = data;
                            // console.log(datas);
                        });
                    $uibModalInstance.close({ data: datas });
                }

                console.log(datas);

            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);