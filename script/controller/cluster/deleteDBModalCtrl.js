angular.module('mainAppCtrls') //删除用户modal的控制器
    .controller('deleteDBModalCtrl', ['$scope', '$uibModalInstance', 'dataService', 'selection', 'httpService',
        function($scope, $uibModalInstance, dataService, selection, httpService) {
            //selection是父级controller通过resolve方法传过来的
            // vm.selection = selection;后才可以在子级controller获得父级选中的用户对象
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            vm.selection = selection;
            vm.deleteDBOk = function(dbname) {
                var id = dataService.getData();
                var data = {
                    "id": 'id',
                    "name": dbname
                };
                console.log("dbname: " + dbname);
                httpService.getServiceResult("delete", "rds/v1/mysql/clusters/" + id + "/databases/" + dbname)
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