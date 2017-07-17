angular.module('mainAppCtrls') //instance.configs.configInfo页面控制器
    .controller('configInfoCtrl', ['$scope', '$http', '$uibModal', '$timeout', '$stateParams', 'httpService',
        function($scope, $http, $uibModal, $timeout, $stateParams, httpService) {
            var vm = $scope.vm = {};
            //设置tooltip展示方向
            vm.placement = {
                selected: 'right'
            };
            vm.defaultConfigs = [];
            vm.submitConfigs = []; //用户编辑修改后用来提交的的对象，有key和value子数组
            vm.submitConfigs.keys = []; //["connect_timeout","local_infile","max_allowed_packet"]
            vm.submitConfigs.values = []; //用户编辑修改后用来提交的的新参数组，结构为[null,"2345","4324","523",null,"123"]
            vm.addInputShow = false;
            //只是关闭编辑输入框，不需要清空submitConfig的值
            vm.addInput = function() {
                vm.addInputShow = !vm.addInputShow;
            };
            vm.addDefalut = function(addDefalut) {
                alert(addDefalut);
            };
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
                    //vm.configInfo();
                    // vm.configs = data.splice((vm.pagination.currentPage - 1) * 10, vm.pagination.currentPage * 10);

                },
                maxSize: 10,
                bigTotalItems: 10,
                bigCurrentPage: 10
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

            //参数组详情列表展示
            vm.configInfo = function() {
                var configId = $stateParams.configId;
                var param = { "id": configId };
                httpService.getServiceResult("get", "rds/v1/mysql/configurations/" + configId + "/selfDetail")
                    .then(function(data, status, headers, config) {
                        console.log(data);
                        if (angular.fromJson(data.data.jsonstring).configuration_parameters) {
                            //每次重新调用清空内容
                            vm.defaultConfigs = [];
                            vm.defaultConfigs = angular.fromJson(data.data.jsonstring).configuration_parameters;
                            //把参数组名称过滤出来，单独存在values里面。
                            var tempValue = "";
                            vm.addInputShow = false;
                            vm.submitConfigs.keys = [];
                            vm.submitConfigs.values = [];
                            for (var i = 0; i < vm.defaultConfigs.length; i++) {
                                console.log("vm.defaultConfigs.length: " + vm.defaultConfigs.length);
                                if (vm.defaultConfigs[i].default_value == null || vm.defaultConfigs[i].default_value == '') {
                                    tempValue = "";
                                } else {
                                    tempValue = vm.defaultConfigs[i].default_value;
                                }
                                var tempKey = vm.defaultConfigs[i].name;
                                vm.submitConfigs.keys.push(tempKey);
                                vm.submitConfigs.values.push(tempValue);
                            }

                            var start = (vm.pagination.currentPage - 1) * 10;
                            var end = (vm.defaultConfigs.length - 10 <= (vm.pagination.currentPage - 1) * 10) ? vm.defaultConfigs.length : vm.pagination.currentPage * 10;
                            console.log("参数组列表：");
                            console.log(vm.defaultConfigs)
                            vm.pagination.totalItems = vm.defaultConfigs.length;
                            // vm.defaultConfigs = vm.defaultConfigs.slice(start, end);


                        } else {
                            vm.addAlert("alert_fail", "参数组列表展示错误，原因为： " + data.jsonstring);
                            console.log("参数组列表展示错误，原因为：" + data.jsonstring);
                        }
                    }).catch(function(data, status, headers, config) {
                        vm.addAlert("alert_error", "网络错误，无法获取参数组列表");
                    });
            };
            //第一次加载页面，调用参数组列表接口
            vm.configInfo();
            //重置参数按钮，重置编辑参数组的状态，通过addInputShow为false关闭input输入框，清空newChonfigs的值
            vm.resetConfig = function() {
                vm.submitConfigs.values = [];
                var tempValue;
                for (var i = 0; i < vm.defaultConfigs.length; i++) {
                    if (vm.defaultConfigs[i].default_value == null || vm.defaultConfigs[i].default_value == '') {
                        tempValue = "";
                    } else {
                        tempValue = vm.defaultConfigs[i].default_value;
                    }
                    vm.submitConfigs.values.push(tempValue);
                }
            };
            //取消编辑按钮，关闭编辑框
            vm.cancelEditConfig = function() {
                vm.addInputShow = false;
                var tempValue;
                vm.submitConfigs.values = [];
                for (var i = 0; i < vm.defaultConfigs.length; i++) {
                    if (vm.defaultConfigs[i].default_value == null || vm.defaultConfigs[i].default_value == '') {
                        tempValue = "";
                    } else {
                        tempValue = vm.defaultConfigs[i].default_value;
                    }
                    vm.submitConfigs.values.push(tempValue);
                }
            };
            //保存编辑按钮，关闭编辑框
            vm.saveEditConfig = function() {
                vm.addInputShow = false;
            };

            /*触发提交参数组modal 开始*/
            vm.openSubmitConfigModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var submitConfigModalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'submitConfigModal-title',
                    ariaDescribedBy: 'submitConfigModal-body',
                    templateUrl: 'submitConfigModal.html',
                    controller: 'submitConfigModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.submitConfigs;
                        }
                    }
                });
                submitConfigModalInstance.result.then(function(result) {
                    console.log(result);
                    if (result.data.id == '' || result.data.id == undefined) {
                        vm.addAlert("alert_error", "保存参数错误--数据result传输错误");
                    } else {
                        //post方法，保存参数组
                        var configId = $stateParams.configId;

                        httpService.getServiceResult("put", "rds/v1/mysql/configurations/" + configId + "", result.data)
                            .then(function(data, status, headers, config) {
                                console.log(data);
                                if (data.data.jsonString == '') {
                                    //保存参数组成功后，重新加载参数组list
                                    vm.configInfo();
                                    vm.addAlert("alert_success", "提交参数成功");
                                    $timeout(function() {
                                            vm.closeAllAlert(vm.alerts.length)
                                        },
                                        6000);
                                } else {
                                    vm.addAlert("alert_fail", "提交参数失败，原因为： " + data.data.jsonString);
                                    console.log("提交参数失败，原因为： " + data.data.jsonString);
                                }
                            }).catch(function(data, status, headers, config) {
                                console.log("connect error,fail to edit configInfo");
                                vm.addAlert("alert_error", "提交参数错误");

                            });
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发提交参数组modal 结束*/

        }
    ]);