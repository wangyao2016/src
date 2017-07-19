angular.module('mainAppCtrls') //instance.user页面控制器
    .controller('userCtrl', ['$scope', '$http', '$timeout', '$uibModal', 'dataService', 'httpService',
        function($scope, $http, $timeout, $uibModal, dataService, httpService) {
            var vm = $scope.vm = {};
            vm.user = [];
            vm.user_add = [];
            var id = dataService.getData();
            vm.pagination = {
                totalItems: 1,
                currentPage: 1,
                setPage: function(pageNo) {
                    this.currentPage = pageNo;
                },
                pageChanged: function() {
                    // $log.log('Page changed to: ' + this.currentPage);
                    // console.log('pageChanged:' + vm.configsList);
                    vm.userList();
                    // vm.configs = data.splice((vm.pagination.currentPage - 1) * 10, vm.pagination.currentPage * 10);

                },
                maxSize: 10,
                bigTotalItems: 10,
                bigCurrentPage: 10
            };

            vm.ipRegx = /^(%)$/ || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/ || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(%)$/;

            /*触发添加用户modal 开始*/
            vm.openAddUserModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var addUserModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'addUserModal-title',
                    ariaDescribedBy: 'addUserModal-body',
                    templateUrl: 'addUserModal.html',
                    controller: 'addUserModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                addUserModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data.data.status !== '') {
                        vm.addAlert("alert_error", "创建用户错误--数据传输错误");
                    } else if (result.data.status == 200) {
                        console.log("创建用户成功");
                        //重新加载用户list
                        vm.userList();
                        //添加警示框
                        vm.addAlert("alert_success", "创建用户成功");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },
                            6000);
                    } else {
                        console.log("创建用户失败,原因为：" + result.data.status);
                        vm.addAlert("alert_fail", "创建用户失败,原因为：" + result.data.status);
                    }
                    // getService.getServiceResult("data/user.json")
                    //     .then(function(data, status, headers, config) {
                    //         //创建用户成功后，重新加载用户list
                    //         if (data.status == 200) {
                    //             console.log("创建用户成功");
                    //             //重新加载用户list
                    //             vm.userList();
                    //             //添加警示框
                    //             vm.addAlert("alert_success", "创建用户成功");
                    //             //删除警示框
                    //             $timeout(function() {
                    //                     vm.closeAllAlert(vm.alerts.length)
                    //                 },
                    //                 6000);
                    //         } else {
                    //             console.log("创建用户失败,原因为：" + data.status);
                    //             vm.addAlert("alert_fail", "创建用户失败,原因为：" + data.status);
                    //         }
                    //     }).catch(function(data, status, headers, config) {
                    //         vm.addAlert("alert_error", "创建用户错误");
                    //     });

                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发添加用户modal 结束*/
            /*触发删除用户modal 开始*/
            vm.openDeleteUserModal = function(username, host, size, parentSelector) {
                console.log(username);
                vm.selection = {};
                vm.selection.username = username;
                vm.selection.host = host;
                console.log(vm.selection);
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                // console.log(username);
                // vm.selection = {};
                // vm.selection.username = username;
                // console.log(vm.selection);
                var deleteUserModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'deleteUserModal-title',
                    ariaDescribedBy: 'deleteUserModal-body',
                    templateUrl: 'deleteUserModal.html',
                    controller: 'deleteUserModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                deleteUserModalInstance.result.then(function(result) {

                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data.status == 200 && result.data.data.status !== '') {
                        vm.addAlert("alert_error", "删除用户错误，原因为： " + result.data.data.status);
                    } else if (result.data.status == 200) {
                        console.log("删除用户成功");
                        //重新加载用户list
                        vm.userList();
                        //添加警示框
                        vm.addAlert("alert_success", "删除用户成功");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },
                            6000);
                    } else {
                        console.log("删除用户失败，原因为： " + result.data.status);
                        vm.addAlert("alert_fail", "删除用户失败，原因为： " + result.data.statusText);
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发删除用户modal 结束*/

            /*触发更改密码modal 开始*/
            vm.openUserPasswordModal = function(username, host, size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                vm.selection = {};
                vm.selection.username = username;
                vm.selection.host = host;
                var userPasswordModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'userPasswordModal-title',
                    ariaDescribedBy: 'userPasswordModal-body',
                    templateUrl: 'userPasswordModal.html',
                    controller: 'userPasswordModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                userPasswordModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。
                    //把data值回传回来
                    if (result.data.data.status !== '' && result.data.status == 200) {
                        console.log("重置用户密码失败，原因为： " + result.data.data.status);
                        vm.addAlert("alert_fail", "重置用户密码失败，原因为： " + result.data.data.status);
                    } else if (result.data.status == 200 && result.data.data.status === '') {
                        console.log("重置用户密码成功");
                        //添加警示框
                        vm.addAlert("alert_success", "重置用户密码成功");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },
                            6000);
                    } else {
                        console.log("重置用户密码失败，原因为： " + result.data.status);
                        vm.addAlert("alert_fail", "重置用户密码失败，原因为： " + result.data.status);
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发更改密码modal 结束*/

            /*触发更改IPmodal 开始*/
            vm.openResetIPModal = function(username, host, size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                vm.selection = {};
                vm.selection.username = username;
                vm.selection.host = host;
                var ResetIPModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'userResetIPModal-title',
                    ariaDescribedBy: 'userResetIPModal-body',
                    templateUrl: 'userResetIPModal.html',
                    controller: 'userResetIPModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                ResetIPModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。
                    //把data值回传回来
                    if (result.data.data.status != '') {
                        console.log("重置用户IP失败，原因为： " + result.data.status);
                        vm.addAlert("alert_error", "重置用户IP失败，原因为： " + result.data.data.status);
                    } else if (result.data.status == 200) {
                        console.log("重置用户IP成功");
                        vm.userList();
                        //添加警示框
                        vm.addAlert("alert_success", "重置用户IP成功");
                        //删除警示框
                        $timeout(function() {
                                vm.closeAllAlert(vm.alerts.length)
                            },
                            6000);
                    } else {
                        console.log("重置用户IP失败，原因为： " + result.data.status);
                        vm.addAlert("alert_fail", "重置用户IP失败，原因为： " + result.data.status);
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发更改IPmodal 结束*/
            /*触发更改数据库的授权 */
            vm.openGrantDBModel = function(username, host, size, parentSelector) {

                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                vm.selection = {};
                vm.selection.username = username;

                vm.selection.host = host;
                console.log(vm.selection);
                var GrantDBModelInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'grantDBModal-title',
                    ariaDescribedBy: 'grantDBModal-body',
                    templateUrl: 'grantDBModal.html',
                    controller: 'grantDBModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });

                GrantDBModelInstance.result.then(function(result) {
                    if (result.data.data.jsonString != '' && result.data.status == 200) {
                        console.log('授权数据库失败，原因为：' + result.data.status);
                        vm.addAlert('alert_error', '授权数据库出错，原因为： ' + result.data.data.jsonString);
                    } else if (result.data.status == 200) {
                        console.log("数据库授权成功！");
                        vm.userList();
                        vm.addAlert('alert_success', '授权数据库成功');
                        $timeout(function() {
                            vm.closeAllAlert(vm.alerts.length);
                        }, 6000);
                    } else {
                        console.log('授权数据库失败，原因为：' + result.data.status);
                        vm.addAlert('alert_fail', '授权数据库失败，原因为： ' + result.data.statusText);
                    }
                }, function(reason) {
                    console.log(reason);
                });
            };


            /*出发数据库授权结束 */



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

            //get方法，展示用户列表
            vm.userList = function() {
                var id = dataService.getData();
                var data = { "id": id };
                httpService.getServiceResult("get", "rds/v1/mysql/clusters/" + id + "/users")
                    .then(function(data, status, headers, config) {
                        console.log(typeof angular.fromJson(data.data).userdisplay);
                        var datas = angular.fromJson(angular.fromJson(data.data).userdisplay).users;
                        //如果接口返回值有users信息，而不是badRequest或者error信息
                        if (angular.fromJson(data.data).userdisplay != undefined) {

                            console.log(datas);

                            datas.map(function(currentValue, index, arr) {
                                // currentValue.databasesList = "";
                                if (currentValue.databases.length > 0) {
                                    currentValue.databasesList = currentValue.databases.reduce(function(previousValue, currentValue, index, array) {
                                        return ',' + currentValue.name;
                                    }, "");
                                    currentValue.databasesList = currentValue.databasesList.slice(1);
                                }
                                //console.log(currentValue.databasesList);
                            });


                            var start = (vm.pagination.currentPage - 1) * 10;
                            var end = (datas.length - 10 <= (vm.pagination.currentPage - 1) * 10) ? datas.length : vm.pagination.currentPage * 10;
                            vm.pagination.totalItems = datas.length;
                            vm.users = datas.slice(start, end);

                        } else {
                            console.log("get instance user list error");
                        }
                    }).catch(function(data, status, headers, config) {
                        console.log("connect error get instance user list");
                    });
            };
            vm.userList();
        }
    ]);