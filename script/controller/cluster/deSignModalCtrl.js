/**
 * Created by wangyao on 2017/7/16.
 */
angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('deSignModalCtrl', ['$scope', '$uibModalInstance', 'selection', 'httpService',
        function($scope, $uibModalInstance, selection, httpService) {
            var vm = $scope.vm = {};
            vm.accountNames = [];
            vm.clusterId = selection;
            var zTreeObj;
            //rds/v1/mysql/additional/userInfo/account   data/user_account.json
            httpService.getServiceResult("get", "rds/v1/mysql/additional/userInfo/account")
                .then(function(data, status, headers, config) {
                    //{"accountNames":"[user-a, user-b, user-c]","masterUserName":"wangyao@cmss.chinamobile.com"}
                    console.log(data.data.accountNames);

                    if (data.data.accountNames != undefined) {
                        vm.accountNames = data.data.accountNames.substring(1,data.data.accountNames.length-1).split(",");
                        var lengthName = vm.accountNames.length;
                        console.log("lengthName:"+lengthName);
                        vm.masterUser = data.data.masterUserName;

                        //"rds/v1/mysql/additional/privilege/names/"+vm.clusterId) data/grantUser_list.json
                        httpService.getServiceResult("get" ,"rds/v1/mysql/additional/privilege/names/"+vm.clusterId)
                            .then(function(data, status, headers, config) {
                                if (data.data.names != undefined) {
                                    console.log(data.data.names);
                                    //集群资源已经授权的用户
                                    vm.grantUser = data.data.names;
                                    vm.arrayObj = new Array();
                                    //授权的打勾，未授权的展示
                                    for(var i=0;i<lengthName;i++){
                                        if(vm.grantUser.indexOf(vm.accountNames[i])!=-1){
                                            vm.arrayObj.push({name: vm.accountNames[i],checked:true});
                                        }else{
                                            vm.arrayObj.push({name: vm.accountNames[i]});
                                        }
                                    }
                                    console.log(vm.arrayObj);
                                    // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
                                    var setting = {
                                        check: {
                                            enable: true
                                        },
                                        data: {
                                            simpleData: {
                                                enable: true
                                            }
                                        }
                                    };
                                    // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
                                    var zNodes = [
                                        {name: vm.masterUser, open:true, checked:true, children: vm.arrayObj}
                                    ];
                                    console.log("zNodes");
                                    console.log(zNodes);
                                    $(document).ready(function(){
                                        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                                    });

                                }else {
                                    console.log("can't get json data form grantUser list");
                                    console.log(data);
                                }
                            }).catch(function(data, status, headers, config) {
                                console.log("connect error to get grantUser list");
                                console.log(data);
                            });
                    }else{
                        console.log("get userAccount error");
                    }
                }).catch(function(data, status, headers, config) {
                    console.log(data);
                });

            //ok方法，点击确认触发
            vm.deSignOk = function() {
                //"name", "baomihua02,baomihua03"
                //"clusterId", "028e8fdd-a580-4b95-8903-eae74d37760f"
                console.log(zTreeObj.getCheckedNodes(true));
                var name = "";
                //0为主账户，去除
                for(var i=1;i<zTreeObj.getCheckedNodes(true).length;i++){
                    name = name+","+zTreeObj.getCheckedNodes(true)[i].name;
                }
                console.log("授权用户:"+name.substring(1)+"<<-->>资源Id:"+vm.clusterId);
                var data = {
                    "name": name.substring(1),
                    "clusterId": vm.clusterId
                };
                httpService.getServiceResult("put", "rds/v1/mysql/additional/privilege/grant", angular.fromJson(data))
                    .then(function(data, status, headers, config) {
                        console.log(data);
                        $uibModalInstance.close({ data: data });
                    }).catch(function(data, status, headers, config) {
                        console.log(data);
                        $uibModalInstance.close({ data: data })
                    });
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);