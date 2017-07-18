angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('restartInstanceModalCtrl', ['$scope', '$uibModalInstance', '$stateParams', 'dataService', 'httpService',
        function($scope, $uibModalInstance, $stateParams, dataService, httpService) {
            var vm = $scope.vm = {};

            //ok方法，点击确认触发
            vm.restartInstanceOK = function() {
                var id = dataService.getData();


                httpService.getServiceResult('post', "rds/v1/mysql/clusters/" + id + "/action", angular.fromJson({ "action": "restart" }))
                    .then(function(data, status, headers, config) {
                        console.log(data);
                        $uibModalInstance.close({ data: data });

                    })
                    .catch(function(data, status, headers, config) {
                        console.log(data);
                        $uibModalInstance.close({ data: data });
                    });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);