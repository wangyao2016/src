angular.module('mainAppCtrls') //instance页面控制器
    .controller('clusterCtrl', ['$scope', '$http', '$state', '$stateParams', 'dataService',
        function($scope, $http, $state, $stateParams, dataService) {
            dataService.getData();
            dataService.setData($stateParams.clusterId);
            dataService.getData();

            var vm = $scope.vm = {};
            //进入到实例子页面之后，强制跳转到basicInfo子页面，打开基本信息tab页面
            $state.go('cluster.basicInfo');

            //传入实例id
            vm.activeTab = 0; //默认路由进入，active标签不存在，但是需要加载出实例详情信息
            vm.setActiveTab = function(num) {
                vm.activeTab = num;
            };
            vm.clusterId = $stateParams.clusterId;
            vm.clusterName = $stateParams.clusterName;
            //调用接口获得实例详情信息
            vm.clusterInfo = [];
        }
    ]);