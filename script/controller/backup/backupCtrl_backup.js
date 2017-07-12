angular.module('mainAppCtrls') //backup list页面控制器
    .controller('backupCtrl_backup', ['$scope', '$timeout', '$uibModal', '$http', 'getService',
        function($scope, $timeout, $uibModal, $http, getService) {
            var vm = $scope.vm = {};
            vm.backupList = [];
            vm.activeBackupList = [];
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
            vm.backupList = function() {
                getService.getServiceResult("data/backup_list.json")
                    .then(function(data, status, headers, config) {
                        if (angular.fromJson(data.data.backupList) != undefined) {
                            vm.backupList = angular.fromJson(data.data.backupList);
                            for (var i = 0; i < vm.backupList.backups.length; i++) {
                                if (vm.backupList.backups[i].status == "COMPLETED") {
                                    vm.activeBackupList.push(vm.backupList.backups[i]);
                                }
                            }
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
            vm.backupList();

            /*触发添加数据库modal 开始*/
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
                    } else {
                        console.log("result.data:" + result.data);
                        console.log("发送创建备份信息");
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发添加数据库modal 结束*/
        }
    ]);