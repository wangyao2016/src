/**
 * Created by wangyao on 2017/7/13.
 */
angular.module('mainAppCtrls') //删除备份modal的控制器
    .controller('deleteBackupModalCtrl',
    function($scope, $stateParams, $uibModalInstance, httpService, selection) {
        //selection是父级controller通过resolve方法传过来的
        // vm.selection = selection;后才可以在子级controller获得父级选中的用户对象
        var vm = $scope.vm = {};
        //ok方法，点击确认触发
        vm.selection = selection;
        vm.deleteBackupOk = function(backupId) {
            var clusterId = $stateParams.clusterId;
            httpService.getServiceResult("delete", "rds/v1/mysql/clusters/" + clusterId + "/backups/"+backupId)
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
    });