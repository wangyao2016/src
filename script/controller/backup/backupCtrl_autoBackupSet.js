/**
 * Created by wangyao on 2017/7/13.
 */
angular.module('mainAppCtrls') //backup导航栏控制器
    .controller('backupCtrl_autoBackupSet', ['$scope', '$state', '$stateParams', 'httpService',
        function($scope, $state, $stateParams, httpService) {
            var vm = $scope.vm = {};
            //进入到实例子页面之后，强制跳转到basicInfo子页面，打开基本信息tab页面
            $state.go('cluster.backup.autoBackupSet');

            //传入实例id
            vm.activeTab = 0; //默认路由进入，active标签不存在，但是需要加载出实例详情信息
            vm.setActiveTab = function(num) {
                vm.activeTab = num;
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


            //自动维护窗口 保存编辑
            vm.autoBackupSetOk = function() {
                var storing_time =$("#autoaction_input").val();
                if(storing_time==null||storing_time==""){
                    storing_time=1095;
                }else{
                    storing_time=parseInt(storing_time);
                }
                if(!isNaN(storing_time)&&6<parseInt(storing_time)&&parseInt(storing_time)<1096){
                    $("#autoprotect-save").attr("disabled", true);
                    var inputs = document.getElementsByName("week");
                    var j=-1;
                    var options=$("#autoprotect-select option:selected");  //获取选中时间的项
                    var hour = options.val();
                    var options_action=$("#autoaction-select option:selected");  //获取选中事件的项
                    var action_event = options_action.val();
                    var value="";
                    var flag=true;
                    if(inputs.length!=0){
                        for(var i=0; i< inputs.length; i++)
                        {
                            if(inputs[i].checked){
                                value=value+inputs[i].value+",";//根据checkbox的val
                                flag=false;
                            }else{
                                if(flag&&(i==inputs.length-1)){
                                    value="unset";
                                }else{
                                    continue;
                                }
                            }
                        }
                        if(value!="unset"&&value!=""){
                            value=value.substring(0,value.lastIndexOf(","));
                        }
                        console.log("设置状态："+value);
                        console.log("执行时间："+hour);
                        console.log("事件类型："+action_event);
                        console.log("存储天数："+storing_time);
                        //执行请求设置自动备份任务请求
                        var autobackup_id=$stateParams.clusterId+"_autobackups";
                        var data = {
                            "autobackup_id":autobackup_id,
                            "week":value,
                            "hour":hour,
                            "action_event":action_event,
                            "storing_time":storing_time
                        };
                        httpService.getServiceResult("post", "rds/v1/mysql/clusters/" + $stateParams.clusterId + "/autobackup", angular.fromJson(data))
                            .then(function(data, status, headers, config) {
                                var result=data.result;
                                if(result=="Success"){
                                    vm.addAlert("alert_success", "设置成功！");
                                }else{
                                    vm.addAlert("alert_fail", "设置失败");
                                }
                                $state.go('cluster.backup.auto');
                            }).catch(function(data, status, headers, config) {
                                console.log(data);
                        });
                    }
                }else{
                    vm.addAlert("alert_error", "存储天数填写有误，请重新填写！");
                }

            };


        }
    ]);