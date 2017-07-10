angular.module('mainAppCtrls') //删除用户modal的控制器
    .controller('deleteDBModalCtrl',
        function($scope, $uibModalInstance, dataService, selection) {
            //selection是父级controller通过resolve方法传过来的
            // vm.selection = selection;后才可以在子级controller获得父级选中的用户对象
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            vm.selection = selection;
            vm.deleteDBOk = function(username) {
                var id = dataService.getData();
                var data = {
                    "id": id,
                    "name": username
                };
                console.log("username: " + username);
                $uibModalInstance.close({ data: data });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });