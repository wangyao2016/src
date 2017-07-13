angular.module('mainAppCtrls')
    //instance.db页面控制器
    .controller('dbCtrl', ['$scope', '$http', '$stateParams', '$timeout', '$uibModal', 'dataService', 'getService',
        function($scope, $http, $stateParams, $timeout, $uibModal, dataService, getService) {
            var vm = $scope.vm = {};
            vm.db = [];
            // console.log($stateParams.clusterId);
            // console.log($stateParams.clusterName);
            //get方法，展示数据库列表
            var id = dataService.getData();

            var data = { "id": id };
            vm.pagination = {
                totalItems: 1,
                currentPage: 1,
                setPage: function(pageNo) {
                    this.currentPage = pageNo;
                },
                pageChanged: function() {
                    // $log.log('Page changed to: ' + this.currentPage);
                    // console.log('pageChanged:' + vm.configsList);
                    vm.dblist();
                    // vm.configs = data.splice((vm.pagination.currentPage - 1) * 10, vm.pagination.currentPage * 10);

                },
                maxSize: 10,
                bigTotalItems: 10,
                bigCurrentPage: 10
            };




            vm.dblist = function() {
                getService.getServiceResult("rds/v1/mysql/clusters/" + id + "/databases")
                    .then(function(data, status, headers, config) {
                        // console.log(id);
                        // console.log($stateParams.clusterId);
                        var datas = angular.fromJson(data.data.dbdisplay).databases;
                        console.log(angular.fromJson(data.data.dbdisplay).databases);
                        if (angular.fromJson(data.data.dbdisplay).databases != undefined) {
                            vm.db = angular.fromJson(data.data.dbdisplay).databases;
                            var start = (vm.pagination.currentPage - 1) * 10;
                            var end = (datas.length - 10 <= (vm.pagination.currentPage - 1) * 10) ? datas.length : vm.pagination.currentPage * 10;
                            vm.pagination.totalItems = datas.length;
                            vm.db = datas.slice(start, end);
                        } else {
                            console.log("get db list error");
                        }
                    }).catch(function(data, status, headers, config) {
                        console.log("connect error get db list:" + data.status);
                    });
            };
            vm.dblist();
            console.log(vm.selection);
            /*触发删除数据库modal 开始*/
            vm.openDeleteDBModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                console.log(parentElem);
                var deleteDbModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'deleteDbModal-title',
                    ariaDescribedBy: 'deleteDbModal-body',
                    templateUrl: 'deleteDbModal.html',
                    controller: 'deleteDBModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                deleteDbModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data.name == '' || result.data.name == undefined) {
                        vm.addAlert("alert_error", "删除数据库错误--数据result传输错误");
                    } else {
                        getService.getServiceResult("data/db_list.json")
                            .success(function(data, status, headers, config) {
                                if (data.status == '' || data.status == 'undefined') {
                                    console.log("删除数据库成功");
                                    //重新加载用户list
                                    vm.db();
                                    //添加警示框
                                    vm.addAlert("alert_success", "删除数据库成功");
                                    //删除警示框
                                    $timeout(function() {
                                            vm.closeAllAlert(vm.alerts.length)
                                        },
                                        6000);
                                } else {
                                    console.log("删除数据库失败，原因为： " + data.status);
                                    vm.addAlert("alert_fail", "删除数据库失败，原因为： " + data.status);
                                }
                            })
                            .error(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "删除数据库错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发删除数据库modal 结束*/



            /*触发添加数据库modal 开始*/
            vm.openAddDbModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var addDbModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'addDbModal-title',
                    ariaDescribedBy: 'addDbModal-body',
                    templateUrl: 'addDbModal.html',
                    controller: 'addDbModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                addDbModalInstance.result.then(function(result) {
                    console.log(result);
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data == '' || result.data == undefined) {
                        vm.addAlert("alert_error", "创建用户错误--数据传输错误");
                    } else if (result.data.status == 200) {

                        //重新加载用户list
                        vm.dblist();
                        //添加警示框
                        vm.addAlert("alert_success", "创建数据库成功");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },
                            6000);
                        console.log("创建数据库成功");
                    } else {
                        console.log("创建数据库失败,原因为：" + result.data.status);
                        vm.addAlert("alert_fail", "创建数据库失败,原因为：" + result.data.status);
                    }

                    /**
                     *  else {
                        getService.getServiceResult("rds/v1/mysql/clusters/" + id + "/databases")
                            .then(function(data, status, headers, config) {
                                //创建用户成功后，重新加载用户list
                                if (data.status == 200) {

                                    //重新加载用户list
                                    vm.dbList();
                                    //添加警示框
                                    vm.addAlert("alert_success", "创建数据库成功");
                                    //删除警示框
                                    // $timeout(function() {
                                    //         vm.closeAllAlert(vm.alerts.length)
                                    //     },
                                    //     6000);
                                    console.log("创建数据库成功");
                                } else {
                                    console.log("创建数据库失败,原因为：" + data.status);
                                    vm.addAlert("alert_fail", "创建数据库失败,原因为：" + data.status);
                                }
                            }).catch(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "创建数据库错误");
                            });
                    }
                     */
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发添加数据库modal 结束*/
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
        }

    ]);