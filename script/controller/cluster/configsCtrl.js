angular.module('mainAppCtrls')
    //instance.configs页面控制器
    .controller('configsCtrl', ['$scope', '$http', '$uibModal', '$timeout', 'dataService', 'dbVersionService', 'httpService',
        function($scope, $http, $uibModal, $timeout, dataService, dbVersionService, httpService) {
            //通过service获取实例id
            var id = dataService.getData();
            var dbversion = dbVersionService.getData();
            console.log('dbversion: ' + dbversion);
            var vm = $scope.vm = {};
            //设置tooltip展示方向
            vm.placement = {
                selected: 'right'
            };
            vm.configs = [];
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
                    vm.configsList();
                    // vm.configs = data.splice((vm.pagination.currentPage - 1) * 10, vm.pagination.currentPage * 10);

                },
                maxSize: 10,
                bigTotalItems: 10,
                bigCurrentPage: 10
            };
            /**
             * 分页结束
             */
            //参数组列表展示

            vm.configsList = function() {
                httpService.getServiceResult('get', "rds/v1/mysql/configurations/" + dbversion + "/listByVersion")
                    .then(function(data, status, headers, config) {
                        console.log(data);
                        var datas = angular.fromJson(data.data.configs).configurations;

                        if (datas != undefined) {
                            // angular.copy(datas, vm.configs);
                            var start = (vm.pagination.currentPage - 1) * 10;
                            var end = (datas.length - 10 <= (vm.pagination.currentPage - 1) * 10) ? datas.length : vm.pagination.currentPage * 10;
                            // console.log("参数组列表：" + datas.slice((vm.pagination.currentPage - 1) * 10, end));
                            vm.configs = datas.slice(start, end);
                            vm.pagination.totalItems = datas.length;
                            // console.log(datas);
                        } else {
                            console.log("get configs list error");
                        }
                    }).catch(function(data, status, headers, config) {
                        console.log("connect error,fail to get configs list");
                    });
            };

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

            /*触发添加参数组modal 开始*/
            vm.openAddConfigsModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var addConfigsModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'addConfigsModal-title',
                    ariaDescribedBy: 'addConfigsModal-body',
                    templateUrl: 'addConfigsModal.html',
                    controller: 'addConfigsModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                addConfigsModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data == '' || result.data == undefined) {
                        vm.addAlert("alert_error", "创建参数组错误--数据传输错误");
                    } else {
                        //post方法，创建参数组
                        httpService.getServiceResult("post", "v1/oracle/configurations", result.data)
                            .success(function(data, status, headers, config) {
                                console.log("data: " + data);
                                console.log("data.jsonstring: " + data.jsonString);
                                console.log("data.jsonstring.configuration: " + data.jsonString.configuration);
                                if (data.jsonString.badRequest) {
                                    //若返回为空，则创建失败
                                    console.log("创建参数组失败,原因为：" + data.jsonString);
                                    vm.addAlert("alert_fail", "创建用户失败,原因为：" + data.jsonString);
                                } else {
                                    console.log("创建参数组成功");
                                    //创建参数组成功后，重新加载参数组list
                                    vm.configsList();
                                    //添加警示框
                                    vm.addAlert("alert_success", "创建参数组成功");
                                    //删除警示框
                                    $timeout(function() {
                                            vm.closeAllAlert(vm.alerts.length)
                                        },
                                        6000);
                                }
                            }).error(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "创建参数组错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发添加参数组modal 结束*/

            /*触发删除参数组modal 开始*/
            vm.openDeleteConfigModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var deleteConfigModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'deleteConfigModal-title',
                    ariaDescribedBy: 'deleteConfigModal-body',
                    templateUrl: 'deleteConfigModal.html',
                    controller: 'deleteConfigModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                deleteConfigModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data.id == '' || result.data.id == undefined) {
                        vm.addAlert("alert_error", "删除参数组错误--数据result传输错误");
                    } else {
                        httpService.getServiceResult("delete", "v1/oracle/configurations/" + result.data.id + "", result)
                            .success(function(data, status, headers, config) {
                                if (data.jsonString == '' || data.jsonString == 'undefined') {
                                    console.log("删除参数组成功");
                                    //重新加载用户list
                                    vm.configsList();
                                    //添加警示框
                                    vm.addAlert("alert_success", "删除参数组成功");
                                    //删除警示框
                                    $timeout(function() {
                                            vm.closeAllAlert(vm.alerts.length)
                                        },
                                        6000);
                                } else {
                                    console.log("删除参数组失败，原因为： " + data.jsonString);
                                    vm.addAlert("alert_fail", "删除参数组失败，原因为： " + data.jsonString);
                                }
                            })
                            .error(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "删除参数组错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发删除用户modal 结束*/

            /*//点击确定触发deleteCofig方法，传入参数组id
             vm.deleteConfig = function (id) {
             var data = {
             id: id
             };
             if (id == '' || id == undefined) {
             alert("删除的参数组id为：" + id);
             }
             else {
             //点击提交删除按钮，隐藏模态框
             $('#deleteConfigsModal').modal('hide');
             //get方法，删除参数组
             httpService.getServiceResult("delete", "v1/oracle/configurations/" + id + "", data)
             .success(function (data, status, headers, config) {
             if (data.jsonString == '' || data.jsonString == 'undefined') {
             //若返回为空，则删除成功，调接口list config列表
             vm.configsList();
             }
             else {
             console.log("删除参数组失败，原因为： " + data.jsonString);
             alert("删除参数组失败，原因为： " + data.jsonString);
             }
             }).error(function (data, status, headers, config) {
             console.log("connect error,fail to delete a config");
             });
             }
             };*/
            /*//提交表单，创建参数组
             vm.submit = function (addConfig_form) {
             addConfig_form.$setDirty();
             //点击提交按钮，隐藏模态框
             $('#newConfigsModal').modal('hide');
             if (addConfig_form.$valid) {
             //传输的参数组数据
             var data = {
             label_mingcheng: vm.addConfig.name,
             rds_DBtype: vm.addConfig.dbtype,
             rds_DBversion: vm.addConfig.dbversion,
             label_des: vm.addConfig.des
             };
             //post方法，创建参数组
             httpService.getServiceResult("post", "v1/oracle/configurations", data)
             .success(function (data, status, headers, config) {
             if (data.jsonString == '' || data.jsonString == 'undefined') {
             //若返回为空，则创建成功，创建参数组成功后，重新加载参数组list
             vm.configsList();
             }
             else {
             console.log("创建参数组失败，原因为： " + data.jsonString);
             alert("创建参数组失败，原因为： " + data.jsonString);
             }
             }).error(function (data, status, headers, config) {
             console.log("connect error,fail to add configs");
             });
             }
            };*/

            /**
             *  vm.pagination = {
                totalItems: 1,
                currentPage: 1,
                setPage: function(pageNo) {
                    this.currentPage = pageNo;
                },
                pageChanged: function() {
                    $log.log('Page changed to: ' + $scope.currentPage);
                },
                maxSize:10,
                bigTotalItems:100,
                bigCurrentPage:100
            };
             */

            //第一次加载configs页面，加载参数组列表
            vm.configsList();

            //         $scope.$watch(function () 
            //             return $scope.vm.pagination.currentPage;
            // 　　　　},configsList);

            // $scope.$watch(function() {
            //     console.log('当前页面：' + $scope.vm.pagination.currentPage);
            //     return $scope.vm.pagination.currentPage;
            // }, vm.configsList);
        }
    ]);