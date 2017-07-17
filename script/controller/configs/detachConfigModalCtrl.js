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
                httpService.getServiceResult('put', 'rds/v1/mysql/configurations/' + vm.selection.id + '/detach', angular.fromJson({ "configID": vm.selection.configId }))
                    .then(function(data, status, headers, config) {
                        datas = data;
                        console.log(data);
                        if (datas.data.jsonstring && data.status == 200) {
                            vm.configStatus.text = "解绑定失败，失败原因： " + datas.data.jsonstring;
                        } else {
                            vm.configStatus.text = "解绑成功，该实例正在重启..."
                        }

                    })
                    .catch(function(data, status, headers, config) {
                        datas = data;
                        vm.configStatus.text = "解绑定失败，失败原因： " + datas.statusText;
                        console.log(datas);
                    });
                if (vm.configStatus.status) {
                    $uibModalInstance.close({ data: datas });
                }

                vm.configStatus.status = !vm.configStatus.status;

            }
            console.log("data: " + datas);
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);