angular.module('mainAppCtrls') //更改密码modal的控制器
    .controller('userPasswordModalCtrl', ['$scope', '$uibModalInstance', 'dataService', 'selection', 'httpService',
        function($scope, $uibModalInstance, dataService, selection, httpService) {
            //selection是父级controller通过resolve方法传过来的 选中的用户对象
            // vm.selection = selection;后才可以在子级controller获得父级选中的用户对象
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            //把父级selection的值传给vm.selection，弹出框就可以判断是否用户被选中
            vm.selection = selection;
            var host = vm.selection.host;
            if (host == "%") {
                host += '25';
            }
            vm.changePsdOk = function(username, password) {
                var id = dataService.getData();
                var data = {
                    "password": password
                };
                console.log("username: " + username);

                httpService.getServiceResult("put", "rds/v1/mysql/clusters/" + id + "/users/" + username + "@" + host + "/password", angular.fromJson(data))
                    .then(function(data, status, headers, config) {
                        console.log('反馈信息');
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