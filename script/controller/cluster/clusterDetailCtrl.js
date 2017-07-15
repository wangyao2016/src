angular.module('mainAppCtrls')
    //instance.basicInfo页面控制器
    .controller('basicInfoCtrl', ['$scope', '$http', 'dataService', 'dbVersionService', 'httpService',
        function($scope, $http, dataService, dbVersionService, httpService) {
            var vm = $scope.vm = {};
            var clusterInfo = {
                '310': { name: 'rds.tiny', ram: 240, cpu: 1 },
                '311': { name: 'rds.small', ram: 600, cpu: 2 },
                '312': { name: 'rds.middle', ram: 1200, cpu: 2 },
                '313': { name: 'rds.large', ram: 2400, cpu: 4 },
                '314': { name: 'rds.xlarge', ram: 6000, cpu: 4 },
                '315': { name: 'rds.2xlarge', ram: 12000, cpu: 4 },
                '316': { name: 'rds.3xlarge', ram: 24000, cpu: 8 },
                '317': { name: 'rds.4xlarge', ram: 32000, cpu: 8 }
            };
            vm.basicInfo = [];
            vm.backupList = [];
            //以后把path改成真实的path，param是传进来的参数
            var id = dataService.getData();
            var data = { "id": id };

            httpService.getServiceResult("get", "rds/v1/mysql/clusters/" + id)
                .then(function(data, status, headers, config) {
                    console.log(data.data);
                    if (angular.fromJson(data.data.clusterDetail) != undefined) {
                        vm.basicInfo = angular.fromJson(data.data.clusterDetail);
                        dbVersionService.setData(vm.basicInfo.cluster.datastore.version);
                        console.log(dbVersionService.getData());
                        vm.basicInfo.cluster.instances.map(function(currentValue, index, arr) {
                            currentValue.flavor.addflavor = clusterInfo[currentValue.flavor.id]
                        });
                        console.log(angular.fromJson(data.data.clusterDetail));
                    } else {
                        console.log("get cluster basicInfo error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log("error load basicInfo.json");
                });
            // getService.getServiceResult("data/backup_list.json")
            //     .then(function(data, status, headers, config) {

            //         if (angular.fromJson(data.data.backupList) != undefined) {
            //             vm.backupList = angular.fromJson(data.data.backupList);
            //         } else {
            //             console.log("get backupList  error");
            //         }
            //     }).catch(function(data, status, headers, config) {
            //         console.log("error load backupList.json");
            //     });
        }
    ]);