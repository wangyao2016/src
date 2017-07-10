 angular.module('mainAppServices') //警示框相关service
     .service('alertService', function() {
         var alertService = {}; //定义一个Object对象'
         alertService.alerts = []; //alerts对象，装着所有的警示框对象
         //添加新警告
         alertService.addAlert = function(type, msg) {
             console.log("type: " + type);
             if (type === undefined || msg === undefined) {
                 alertService.alerts.push({
                     type: 'alert-warning',
                     msg: '类型和内容不能为空.'
                 });
                 console.log("alertService.alerts: " + alertService.alerts);
                 console.log("alertService.alerts.length: " + alertService.alerts.length);
             } else {
                 alertService.alerts.push({
                     type: type,
                     msg: msg
                 });
             }
         };
         //删除单个警告
         alertService.closeAlert = function(index) {
             alertService.alerts.splice(index, 1);
             console.log("delete index:" + index);
         };
         //逐个删除单条警告
         alertService.closeAllAlert = function(length) {
             for (var i = length; i > 0; i--) {
                 alertService.alerts.splice(i - 1, 1);
             }
         };
         //返回所有警告
         alertService.getAlert = function() {
             return alertService.alerts;
         };
         return alertService; //返回这个Object对象
     });