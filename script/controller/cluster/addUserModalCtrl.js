angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('addUserModalCtrl', ['$scope', '$uibModalInstance', 'dataService',
        function($scope, $uibModalInstance, dataService) {
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            vm.addUserOk = function() {
                var id = dataService.getData();
                var data = {
                    "id": id,
                    "name": vm.user_add.name,
                    "password": vm.user_add.password
                };
                $uibModalInstance.close({ data: data });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);