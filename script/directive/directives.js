//定义指令模块，需要app.js中依赖注入指令模块
var mainAppDirectives = angular.module('mainAppDirectives', []);
mainAppDirectives.directive('dialog', [function () {
  return {
    restrict: 'AE',
    scope: {
      loadData: '='//数据源 可以是对象和url
    },
    templateUrl: 'app/tpls/temp.html',
    replace: true,
    link: function (scope, element, attr) {
      scope.data = scope.loadData.interface;
      scope.close = function () {
        scope.loadData.isShow = false;
      };
    }
  }
}]);
mainAppDirectives.directive('alert', [function () {
  return {
    restrict: 'AE',
    scope: {
      loadData: '='//数据源 可以是对象和url
    },
    templateUrl: 'app/tpls/alert.html',
    replace: true,
    link: function (scope, element, attr) {
      scope.type = scope.loadData.type;
      scope.msg = scope.loadData.msg;
      var vm = scope.vm = {};
      //警告类型
      vm.types = [
        'alert-success',
        'alert-info',
        'alert-warning',
        'alert-danger'
      ];
      vm.alerts = [
        /*{type:'alert-success',msg:'操作成功,请继续下一步!'},
        {type:'alert-danger',msg:'提交失败,修改内容并尝试重新提交!'}*/
      ];
      //删除单条警告
      vm.closeAlert = function (index) {
        vm.alerts.splice(index, 1);
      };
      //添加新警告
      vm.addAlert = function (type, msg) {
        if (type === undefined || msg === undefined) {
          vm.alerts.push({
            type:'alert-warning',
            msg:'类型和内容不能为空.'
          });
        } else {
          vm.alerts.push({
            type:type,
            msg:msg
          });
        }
      };
      vm.addAlert(scope.type,scope.msg);
      console.log(scope.type);
      console.log(scope.msg);
    }
  };
}]);
//"确认密码"功能--判定密码是否重复
mainAppDirectives.directive("repeat", [function () {
  return {
    restrict: 'A',
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      if (ctrl) {
        var otherInput = element.inheritedData("$formController")[attrs.repeat];

        var repeatValidator = function (value) {
          var validity = value === otherInput.$viewValue;
          ctrl.$setValidity("repeat", validity);
          return validity ? value : undefined;
        };

        ctrl.$parsers.push(repeatValidator);
        ctrl.$formatters.push(repeatValidator);

        otherInput.$parsers.push(function (value) {
          ctrl.$setValidity("repeat", value === ctrl.$viewValue);
          return value;
        });
      }
    }
  };
}]);

//config页面directive指令--指令功能：在ng-repeat加载完成之后执行指令dosomething
mainAppDirectives.directive('repeatDone', function () {
  return {
    link: function (scope, element, attrs) {
      if (scope.$last) {                   // 这个判断意味着最后一个加载完毕
        scope.$eval(attrs.repeatDone);    // 执行绑定的表达式
      }
    }
  }
});