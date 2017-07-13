angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('addUserModalCtrl', ['$scope', '$uibModalInstance', 'dataService', 'httpService',
        function($scope, $uibModalInstance, dataService, httpService) {
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            vm.addUserOk = function() {
                var id = dataService.getData();
                var data = {
                    "id": id,
                    "name": vm.user_add.name,
                    "password": vm.user_add.password,
                    "host": vm.user_add.host
                };
                console.log(data);
                httpService.getServiceResult("post", "rds/v1/mysql/clusters/" + id + "/users", angular.fromJson(data))
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