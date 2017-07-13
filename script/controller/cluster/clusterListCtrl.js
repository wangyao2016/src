angular.module('mainAppCtrls')
    //list页面控制器
    .controller('LoadDataCtrl', ['$window', '$scope', '$http', 'getService',
        function($window, $scope, $http, getService) {
            var vm = $scope.vm = {};
            vm.clusters = [];
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

        }
    ]);