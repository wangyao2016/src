angular.module('mainAppCtrls')
    //instance.db页面控制器
    .controller('dbCtrl', ['$scope', '$http', '$timeout', '$uibModal', 'dataService', 'getService',
        function($scope, $http, $timeout, $uibModal, dataService, getService) {
            var vm = $scope.vm = {};

            vm.db = [];
            vm.dbs = [
                    { "charater": "utf8", "rule": "utf8_general_ci" },
                    { "charater": "gbk", "rule": "gbk_chinese_ci" },
                    { "charater": "big5", "rule": "big5_chinese_ci" }
                    // gbk: ["gbk_chinese_ci"],
                    // big5: ["big5_chinese_ci"],
                    // dec8: ["dec8_swedish_ci"],
                    // cp850: ["cp850_general_ci"],
                    // hp8: ["hp8_english_ci"],
                    // koi8r: ["koi8r_general_ci"],
                    // latin1: ["latin1_swedish_ci"],
                    // latin2: ["latin2_general_ci"],
                    // swe7: ["swe7_swedish_ci"],
                    // ascii: ["ascii_general_ci"],
                    // ujis: ["ujis_japanese_ci"],
                    // sjis: ["sjis_japanese_ci"],
                    // hebrew: ["hebrew_general_ci"],
                    // tis620: ["tis620_thai_ci"],
                    // euckr: ["euckr_korean_ci"],
                    // koi8u: ["koi8u_general_ci"],
                    // gb2312: ["gb2312_chinese_ci"],
                    // greek: ["greek_general_ci"],
                    // cp1250: ["cp1250_general_ci"],
                    // latin5: ["latin5_turkish_ci"],
                    // armscii8: ["armscii8_general_ci"],
                    // cp866: ["cp866_general_ci"],
                    // keybcs2: ["keybcs2_general_ci"],
                    // macce: ["macce_general_ci"],
                    // macroman: ["macroman_general_ci"],
                    // cp852: ["cp852_general_ci"],
                    // latin7: ["latin7_general_ci"],
                    // cp1251: ["cp1251_general_ci"],
                    // cp1256: ["cp1256_general_ci"],
                    // cp1257: ["cp1257_general_ci"],
                    // binary: ["binary"],
                    // geostd8: ["geostd8_general_ci"],
                    // cp932: ["cp932_japanese_ci"],
                    // eucjpms: ["eucjpms_japanese_ci"]
                ]
                //get方法，展示数据库列表
            var id = dataService.getData();
            var data = { "id": id };
            getService.getServiceResult("data/db_list.json")
                .then(function(data, status, headers, config) {
                    console.log(angular.fromJson(data.data.Db_display).databases);
                    if (angular.fromJson(data.data.Db_display).databases != undefined) {
                        vm.db = angular.fromJson(data.data.Db_display).databases;
                    } else {
                        console.log("get db list error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("connect error get db list");
                });

            /*触发删除数据库modal 开始*/
            vm.openDeleteDBModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
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
                                    vm.userList();
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
                var addUserModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'addDbModal-title',
                    ariaDescribedBy: 'addDbModal-body',
                    templateUrl: 'addDbModal.html',
                    controller: 'addDbModalCtrl',
                    size: size,
                    appendTo: parentElem
                });
                addUserModalInstance.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data == '' || result.data == undefined) {
                        vm.addAlert("alert_error", "创建用户错误--数据传输错误");
                    } else {
                        getService.getServiceResult("data/db_list.json")
                            .then(function(data, status, headers, config) {
                                //创建用户成功后，重新加载用户list
                                if (data.status == '' || data.status == undefined) {
                                    console.log("创建数据库成功");
                                    //重新加载用户list
                                    vm.userList();
                                    //添加警示框
                                    vm.addAlert("alert_success", "创建数据库成功");
                                    //删除警示框
                                    $timeout(function() {
                                            vm.closeAllAlert(vm.alerts.length)
                                        },
                                        6000);
                                } else {
                                    console.log("创建数据库失败,原因为：" + data.status);
                                    vm.addAlert("alert_fail", "创建数据库失败,原因为：" + data.status);
                                }
                            }).catch(function(data, status, headers, config) {
                                vm.addAlert("alert_error", "创建数据库错误");
                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发添加数据库modal 结束*/
        }
    ]);