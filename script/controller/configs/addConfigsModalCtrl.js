angular.module('mainAppCtrls') //添加参数组modal的控制器
    .controller('addConfigsModalCtrl', ['$scope', '$uibModalInstance',
        function($scope, $uibModalInstance) {
            var vm = $scope.vm = {};
            //数据库类型和版本，写死，待修改
            vm.dbtypes = ['oracle', 'mysql'];
            vm.mysqlVersions = ['5.5', '5.6'];
            vm.oracleVersions = ['12.1.0'];
            //ok方法，点击确认触发
            vm.addConfigsOk = function() {
                var data = {
                    label_mingcheng: vm.addConfig.name,
                    rds_DBtype: vm.addConfig.dbtype,
                    rds_DBversion: vm.addConfig.dbversion,
                    label_des: vm.addConfig.des
                };
                console.log("data: " + data);
                $uibModalInstance.close({ data: data });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);