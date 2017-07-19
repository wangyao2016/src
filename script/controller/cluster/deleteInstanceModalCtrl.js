angular.module('mainAppCtrls')
    .controller('deleteInstanceModalCtrl', ['$scope', '$uibModalInstance', 'dataService', 'httpService',
        function($scope, $uibModalInstance, dataService, httpService) {
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            vm.addUserOk = function() {
                var id = dataService.getData();

                console.log(data);
                httpService.getServiceResult("delete", "rds/v1/mysql/clusters/" + id)
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