angular.module('mainAppCtrls') //提交更改参数组modal的控制器
    .controller('submitConfigModalCtrl',
        function($scope, $uibModalInstance, $stateParams, selection) {
            //selection是父级controller通过resolve方法传过来的 选中的用户对象
            // vm.selection = selection;后才可以在子级controller获得父级选中的用户对象
            var vm = $scope.vm = {};
            //ok方法，点击确认触发
            //把父级selection的值传给vm.selection，弹出框就可以判断是否用户被选中
            vm.selection = selection;
            //提交后保存参数组功能
            vm.submit = function() {
                console.log("selection.keys: " + selection.keys);
                console.log("selection.values: " + selection.values);
                //如果收到keys，values数组
                if (selection.keys == '' || selection.keys == undefined) {
                    alert("can't receive edit configs array");
                } else {
                    var configJson = [];
                    configJson = "{";
                    for (var i = 0; i < selection.keys.length; i++) {
                        if (selection.values[i] == '' || selection.values[i] == null) {

                        } else {
                            configJson += "\"" + selection.keys[i] + "\"" + ":" + selection.values[i] + ",";
                        }
                    }
                    if (configJson.indexOf(',') == -1) {} else {
                        configJson = configJson.substring(0, configJson.lastIndexOf(','));
                    }
                    configJson += "}";
                    console.log("configJson: " + configJson);
                    //添加参数组id，拼凑post所需要的data信息
                    var configId = $stateParams.configId;
                    var data = {
                        "id": configId,
                        "configJson": configJson
                    };
                    $uibModalInstance.close({ data: data });
                }
            };
            //cancel方法，点击取消触发
            vm.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });