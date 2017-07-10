angular.module('mainAppCtrls')
    //list页面控制器
    .controller('LoadDataCtrl', ['$window', '$scope', '$http', 'httpService',
        function($window, $scope, $http, getService) {
            var vm = $scope.vm = {};
            vm.clusters = [];
            var flavor = {
                '310': 'rds.tiny',
                '311': 'rds.small',
                '312': 'rds.middle',
                '313': 'rds.large',
                '315': 'rds .2 xlarge',
                '316': 'rds .3 xlarge',
                '317': 'rds .4 xlarge'
            };
            vm.reloadPage = function() {
                $window.location.reload();
            };
            getService.getServiceResult('get', "data/clusters_list.json")
                .then(function(data, status, headers, config) {

                    if (data.data.clusters) {
                        vm.clusters = angular.fromJson(data.data.clusters).clusters;
                        vm.clusters.map(function(currentValue, index, arr) {
                            currentValue.flavor = flavor[currentValue.instances[0].flavor.id];
                        });
                        console.log(vm.clusters);

                    } else {
                        console.log("can't get json data form clusters list clusters");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("connect error to get clusters list");
                });
        }
    ]);