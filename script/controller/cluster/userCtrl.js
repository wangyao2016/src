angular.module('mainAppCtrls') //instance.user页面控制器
    .controller('userCtrl', ['$scope', '$http', '$timeout', '$uibModal', 'dataService', 'getService',
        function($scope, $http, $timeout, $uibModal, dataService, getService) {
            var vm = $scope.vm = {};
            vm.user = [];
            vm.user_add = [];
            var id = dataService.getData();

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
                    if (result.data == '' || result.data == undefined) {
                        vm.addAlert("alert_error", "创建用户错误--数据传输错误");
                    } else {
                        getService.getServiceResult("data/user.json")
                            .then(function(data, status, headers, config) {
                                //创建用户成功后，重新加载用户list
                                if (data.status == '' || data.status == undefined) {
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
                                    console.log("创建用户失败,原因为：" + data.status);
                                    vm.addAlert("alert_fail", "创建用户失败,原因为：" + data.status);
                                }
                            }).catch(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "创建用户错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发添加用户modal 结束*/

            /*触发删除用户modal 开始*/
            vm.openDeleteUserModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                console.log(parentElem);
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
                    if (result.data.name == '' || result.data.name == undefined) {
                        vm.addAlert("alert_error", "删除用户错误--数据result传输错误");
                    } else {
                        getService.getServiceResult("data/user.json")
                            .success(function(data, status, headers, config) {
                                if (data.status == '' || data.status == 'undefined') {
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
                                    console.log("删除用户失败，原因为： " + data.status);
                                    vm.addAlert("alert_fail", "删除用户失败，原因为： " + data.status);
                                }
                            })
                            .error(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "删除用户错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发删除用户modal 结束*/

            /*触发更改密码modal 开始*/
            vm.openUserPasswordModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
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
                    if (result.data.username == '' || result.data.username == undefined) {
                        vm.addAlert("alert_error", "更改密码错误--数据result传输错误");
                    } else {
                        //修改用户密码
                        getService.getServiceResult("data/user.json")
                            .then(function(data, status, headers, config) {
                                if (data.status == '' || data.status == 'undefined') {
                                    console.log("重置用户密码成功");
                                    //添加警示框
                                    vm.addAlert("alert_success", "重置用户密码成功");
                                    //删除警示框
                                    $timeout(function() {
                                            vm.closeAllAlert(vm.alerts.length)
                                        },
                                        6000);
                                } else {
                                    console.log("重置用户密码失败，原因为： " + data.status);
                                    vm.addAlert("alert_fail", "重置用户密码失败，原因为： " + data.status);
                                }
                            })
                            .catch(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "重置用户密码错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发更改密码modal 结束*/

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
                getService.getServiceResult("data/user_list.json")
                    .then(function(data, status, headers, config) {
                        console.log(angular.fromJson(data.data).userdisplay);
                        //如果接口返回值有users信息，而不是badRequest或者error信息
                        if (angular.fromJson(data.data).userdisplay != undefined) {
                            vm.users = angular.fromJson(data.data).userdisplay.users;
                            console.log(vm.users);
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