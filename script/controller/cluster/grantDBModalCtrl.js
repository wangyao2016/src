angular.module('mainAppCtrls') //删除用户modal的控制器
    .controller('grantDBModalCtrl', ['$scope', '$uibModalInstance', 'dataService', 'selection', 'httpService',
        function($scope, $uibModalInstance, dataService, selection, httpService) {
            //selection是父级controller通过resolve方法传过来的
            // vm.selection = selection;后才可以在子级controller获得父级选中的用户对象

            var vm = $scope.vm = {};
            vm.selection = selection;
            console.log(vm.selection);
            var id = dataService.getData();
            host = vm.selection.host;
            if (vm.selection.host == "%") {
                host += '25';
            }
            // vm.ungrantDBs = [{ "name": "db11" }, { "name": "db12" }, { "name": "db13" }];
            // vm.grantedDBs = [{ "name": "db1" }, { "name": "db2" }, { "name": "db3" }];
            httpService.getServiceResult('get', "rds/v1/mysql/clusters/" + id + "/users/" + vm.selection.username + "@" + host + "/databases")
                .then(function(data, status, headers, config) {
                    vm.ungrantDBs = angular.fromJson(data.data.dbdisplay).databases;
                    //console.log(data.data);
                })
                .catch(function(data, status, headers, config) {
                    console.log(status);
                });
            httpService.getServiceResult('get', "rds/v1/mysql/clusters/" + id + "/users/" + vm.selection.username + "@" + host)
                .then(function(data, status, headers, config) {
                    vm.grantedDBs = angular.fromJson(angular.fromJson(data.data).jsonString).user.databases;
                    //console.log(angular.fromJson(angular.fromJson(data.data).jsonString).user.databases);
                })
                .catch(function(data, status, headers, config) {
                    console.log(status);
                });
            // "rds/v1/mysql/clusters/"+clusterId+"/users/TestClusterUser"
            vm.toggleSelect = function(type, index) {
                    if (type === "ungrant") {
                        vm.ungrantDBs[index].active = !vm.ungrantDBs[index].active;
                    } else if (type === "granted") {
                        vm.grantedDBs[index].active = !vm.grantedDBs[index].active;
                    }
                    // vm.grantedDBs.push({ "name": "db1" });
                    //vm.grantedDBs[0].name = "db100";
                    //console.log(vm.grantedDBs[index]);
                    // console.log(vm.ungrantDBs[index].active);
                    // return vm.grantedDBs[index].active;
                }
                //ok方法，点击确认触发
            vm.granted = function() {
                console.log(vm.ungrantDBs.length);
                for (var i = 0; i < vm.ungrantDBs.length; i++) {
                    if (vm.ungrantDBs[i].active == true) {
                        console.log(vm.ungrantDBs[i].name);
                        var item = vm.ungrantDBs.splice(i, 1)[0];
                        // console.log(item);
                        item.active = false;
                        vm.grantedDBs.push(item);
                        i = -1;
                    }
                    //console.log(vm.ungrantDBs[i].active);
                };


            };
            vm.shift = function() {
                for (var i = 0; i < vm.grantedDBs.length; i++) {
                    if (vm.grantedDBs[i].active == true) {
                        var item = vm.grantedDBs.splice(i, 1)[0];
                        item.active = false;
                        vm.ungrantDBs.push(item);
                        i = -1;
                    }
                }
            };

            vm.grantDBOk = function(username, host) {
                if (host == "%") {
                    host += '25';
                }
                var dbnames = [];
                vm.grantedDBs.forEach(function(item, index) {
                    dbnames.push(item.name);
                });
                var id = dataService.getData();
                var grantdata = {
                    "activeDB": '[' + dbnames + ']'
                };
                console.log(grantdata.activeDB);
                console.log("username: " + username + '@' + host);
                httpService.getServiceResult("delete", "rds/v1/mysql/clusters/" + id + "/users/" + username + "/databases")
                    .then(function(data, status, headers, config) {
                        console.log('反馈信息');
                        console.log(data);
                        httpService.getServiceResult("put", "rds/v1/mysql/clusters/" + id + "/users/" + username + "/databases", angular.fromJson(grantdata))
                            .then(function(data, status, headers, config) {
                                console.log('反馈信息');
                                console.log(data);
                                $uibModalInstance.close({ data: data });
                            }).catch(function(data, status, headers, config) {
                                console.log(data);
                                $uibModalInstance.close({ data: data })
                            });
                        //$uibModalInstance.close({ data: data });
                    }).catch(function(data, status, headers, config) {
                        console.log(data);
                        //$uibModalInstance.close({ data: data })
                    });

            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);