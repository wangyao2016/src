angular.module('mainAppCtrls')
    //list页面控制器
    .controller('LoadDataCtrl', ['$window', '$scope', '$uibModal', '$http', 'getService',
        function($window, $scope, $uibModal, $http, getService) {
            var vm = $scope.vm = {};
            vm.clusters = [];
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

            var flavor = {
                '310': 'rds.tiny',
                '311': 'rds.small',
                '312': 'rds.middle',
                '313': 'rds.large',
                '315': 'rds .2 xlarge',
                '316': 'rds .3 xlarge',
                '317': 'rds .4 xlarge'
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
            vm.reloadPage = function() {
                $window.location.reload();
            };
            vm.clusterList = function() {
                getService.getServiceResult("rds/v1/mysql/clusters")
                    .then(function(data, status, headers, config) {
                        console.log(data.data.clusters);
                        vm.selection = [];
                        var datas = angular.fromJson(data.data.clusters).clusters;

                        if (data.data.clusters) {
                            console.log(datas);
                            // datas.map(function(currentValue, index, arr) {
                            //     currentValue.flavor = flavor[currentValue.instances[0].flavor.id];
                            // });
                            var start = (vm.pagination.currentPage - 1) * 10;
                            var end = (datas.length - 10 <= (vm.pagination.currentPage - 1) * 10) ? datas.length : vm.pagination.currentPage * 10;
                            console.log("参数组列表：" + datas.slice((vm.pagination.currentPage - 1) * 10, end));
                            vm.clusters = datas.slice(start, end);
                            vm.pagination.totalItems = datas.length;
                            console.log(vm.clusters);

                        } else {
                            console.log("can't get json data form clusters list clusters");
                        }
                    }).catch(function(data, status, headers, config) {
                        console.log("connect error to get clusters list");
                    });
            };
            vm.clusterList();

            /*触发分配用户modal 开始*/
            vm.openDesignModal = function(size, parentSelector) {
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var deSignModalUser = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'deSignModal-title',
                    ariaDescribedBy: 'deSignModal-body',
                    templateUrl: 'deSignModal.html',
                    controller: 'deSignModalCtrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        selection: function() {
                            return vm.selection;
                        }
                    }
                });
                console.log("vm.selection:"+vm.selection);
                deSignModalUser.result.then(function(result) {
                    //result 就是CLOSE回传的值。把data值回传回来
                    if (result.data.data.status != undefined) {

                        vm.addAlert("alert_success", "授权成功！");
                        //删除警示框
                        $timeout(function() {
                            vm.closeAllAlert(vm.alerts.length)
                        },6000);
                        console.log("授权资源成功");
                    } else {
                        console.log("授权失败,原因为：" );
                        console.log(result);
                        vm.addAlert("alert_fail", "授权失败！");
                    }
                }, function(reason) {
                    //reason 就是dismiss回传的值。
                    console.log(reason);
                });
            };
            /*触发分配用户modal 结束*/

        }
    ]);