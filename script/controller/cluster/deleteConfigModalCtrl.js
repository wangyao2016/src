angular.module('mainAppCtrls') //删除参数组modal的控制器
    .controller('deleteConfigModalCtrl',
        function($scope, $uibModalInstance, selection) {
            var vm = $scope.vm = {};
            //把父级selection的值传给vm.selection，vm.selection.id才能够被取到，并当作参数传值
            vm.selection = selection;
            var data;
            //ok方法，点击确认触发
            vm.deleteConfigOk = function(id) {
                if (id == "" || id == undefined) {
                    data = "";
                } else {
                    data = {
                        id: id
                    };
                }
                console.log("data: " + data);
                $uibModalInstance.close({ data: data });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });