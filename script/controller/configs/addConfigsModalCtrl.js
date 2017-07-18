angular.module('mainAppCtrls') //添加参数组modal的控制器
    .controller('addConfigsModalCtrl', ['$scope', '$uibModalInstance', 'selection',
        function($scope, $uibModalInstance, selection) {
            var vm = $scope.vm = {};
            vm.selection = selection;

            //ok方法，点击确认触发
            vm.addConfigsOk = function(db, dbversion) {
                var data = {
                    label_mingcheng: vm.addConfig.name,
                    rds_DBtype: vm.selection.db,
                    rds_DBversion: vm.selection.version,
                    label_des: vm.addConfig.des
                };
                console.log(data);
                $uibModalInstance.close({ data: data });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);