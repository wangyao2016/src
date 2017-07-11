/**
 * Created by wangyao on 2017/7/11.
 */
angular.module('mainAppCtrls') //backup导航栏控制器
    .controller('backupCtrl_nav', ['$scope', '$state', '$stateParams',
        function($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            //进入到实例子页面之后，强制跳转到basicInfo子页面，打开基本信息tab页面
            $state.go('cluster.backup.backup');

            //传入实例id
            vm.activeTab = 0; //默认路由进入，active标签不存在，但是需要加载出实例详情信息
            vm.setActiveTab = function(num) {
                vm.activeTab = num;
            };
        }
    ]);