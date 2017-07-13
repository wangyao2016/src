angular.module('mainAppCtrls') //backup list页面控制器
    .controller('backupCtrl_backup', ['$scope', '$stateParams', '$timeout', '$uibModal', '$http', 'getService',
        function($scope, $stateParams, $timeout, $uibModal, $http, getService) {
            var vm = $scope.vm = {};
            vm.backupList = [];
            vm.activeBackupList = [];
            vm.selection = [];

            /*警告框相关开始*/
            vm.alerts = [];
            //删除单条警告
            vm.closeAlert = function(index) {
                vm.alerts.splice(index, 1);
            };
            //逐个删除警告
            vm.closeAllAlert = function(length) {
                for (var i = length; i > 0; i--) {
                    vm.alerts.splice(i - 1, 1);
                }
            };
            //添加新警告
            vm.addAlert = function(type, msg) {
                if (type === undefined || msg === undefined) {
                    vm.alerts.push({
                        type: 'alert-warning',
                        msg: '类型和内容不能为空.'
                    });
                } else {
                    vm.alerts.push({
                        type: type,
                        msg: msg
                    });
                }
            };
            /*警告框相关结束*/

            /**
             * 分页开始
             */
            vm.pagination = {
                totalItems: 1,
                currentPage: 1,
                setPage: function(pageNo) {
                    this.currentPage = pageNo;
                },
                pageChanged: function() {
                    // $log.log('Page changed to: ' + this.currentPage);
                    // console.log('pageChanged:' + vm.configsList);
                    vm.clusterList();
                    // vm.configs = data.splice((vm.pagination.currentPage - 1) * 10, vm.pagination.currentPage * 10);

                },
                maxSize: 10,
                bigTotalItems: 10,
                bigCurrentPage: 10
            };
            /**
             * 分页结束
             */
            vm.backuplist = function() {
                vm.selection = [];
                getService.getServiceResult("rds/v1/mysql/clusters/"+$stateParams.clusterId+"/backups")
                    .then(function(data, status, headers, config) {
                        if (angular.fromJson(data.data.backupList) != undefined) {
                            vm.backupList = angular.fromJson(data.data.backupList);
                            for (var i = 0; i < vm.backupList.backups.length; i++) {
                                if (vm.backupList.backups[i].status == "COMPLETED") {
                                    vm.activeBackupList.push(vm.backupList.backups[i]);
                                }
                            }
                            //$scope.$broadcast('call', $scope.name);//传值
                            //分页
                            var start = (vm.pagination.currentPage - 1) * 10;
                            var end = (vm.backupList.backups.length - 10 <= (vm.pagination.currentPage - 1) * 10) ? vm.backupList.backups.length : vm.pagination.currentPage * 10;
                            // console.log("参数组列表：" + datas.slice((vm.pagination.currentPage - 1) * 10, end));
                            vm.pagination.totalItems = vm.backupList.backups.length;
                            vm.backupList.backups = vm.backupList.backups.slice(start, end);

                        } else {
                            console.log("get backupList  error");
                        }
                    }).catch(function(data, status, headers, config) {
                        console.log("error load backupList.json");
                        console.log(data);
                    });
            };
            vm.backuplist();

            /*触发备份modal 开始*/
            vm.openAddBackupModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var addBackupModal = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'addBackupModal-title',
                    ariaDescribedBy: 'addBackupModal-body',
                    templateUrl: 'addBackupModal.html',
                    controller: 'addBackupModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                addBackupModal.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data == '' || result.data == undefined) {
                        vm.addAlert("alert_error", "创建备份错误--数据传输错误");
                    }  else if (result.data.status == 200) {
                        //重新加载用户list
                        vm.backuplist();
                        //添加警示框
                        vm.addAlert("alert_success", "备份进行中");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },
                            6000);
                        console.log("创建备份成功");
                    } else {
                        console.log("创建备份失败,原因为：" );
                        console.log(result);
                        vm.addAlert("alert_fail", "创建备份失败");
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发备份modal 结束*/


            /*触发删除备份modal 开始*/
            vm.openDeleteBackupModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var deleteBackupModalCluster = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'deleteBackupModal-title',
                    ariaDescribedBy: 'deleteBackupModal-body',
                    templateUrl: 'deleteBackupModal.html',
                    controller: 'deleteBackupModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                deleteBackupModalCluster.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data.data.delBackup != '' || result.data.data.delBackup == undefined) {
                        vm.addAlert("alert_error", "删除备份错误--数据传输错误");
                    } else if (result.data.status == 200) {
                        //重新加载用户list
                        vm.backuplist();
                        //添加警示框
                        vm.addAlert("alert_success", "备份删除成功");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },6000);
                        console.log("删除备份成功");
                    } else {
                        console.log("删除备份失败,原因为：" );
                        console.log(result);
                        vm.addAlert("alert_fail", "删除备份失败");
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发删除备份modal 结束*/
        }
    ]);