angular.module('mainAppCtrls')
    .controller('detachConfigModalCtrl', ['$scope', '$uibModalInstance', 'selection', 'httpService',
        function($scope, $uibModalInstance, selection, httpService) {
            var vm = $scope.vm = {};
            vm.configStatus = {};
            vm.configStatus.statusText = '';
            vm.configStatus.status = false;
            vm.selection = selection;
            console.log(selection);
            var datas = {};
            //ok方法，点击确认触发
            vm.detachConfigOk = function() {

                    vm.configStatus.statusText = "detach";
                    // vm.configStatus.statusText = "success";

                    if (vm.configStatus.status) {
                        $uibModalInstance.close({ data: vm.configStatus.text });
                    } else {
                        httpService.getServiceResult('post', "rds/v1/mysql/clusters/" + vm.selection.id + "/action", angular.fromJson({ "action": "configuration_detach" }))
                            .then(function(data, status, headers, config) {
                                datas = data;
                                console.log(datas);
                                if (angular.fromJson(datas.data.status).cluster && datas.status == 200) {
                                    vm.configStatus.text = "解绑成功，该实例正在重启..."
                                } else {
                                    vm.configStatus.text = "解绑定失败，失败原因： " + datas.data.status;

                                }

                            })
                            .catch(function(data, status, headers, config) {
                                datas = data;
                                vm.configStatus.text = "解绑定失败，失败原因： " + datas.statusText;
                                console.log(datas);
                            });
                    }

                    vm.configStatus.status = !vm.configStatus.status;

                }
                // console.log("data: " + datas);
                //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);