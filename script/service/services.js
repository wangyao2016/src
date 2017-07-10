//定义服务模块，需要app.js中依赖注入服务模块
angular.module('mainAppServices', []);


/*表单传值开始*/

/*表单传值结束*/

//警告框相关结束

//展示用户列表
/*
mainAppServices.service('userListService', ['$http', function ($http) {
    var doRequest = function (path, param) {
      return $http({
        method: 'get',
        url: path,
        params: param
      }).success
    };
    return {
      getServiceResult: function (path, param) {
        console.log("service path:"+path);
        return doRequest(path,param);
      }
    }
  }]
);
getService.getServiceResult("com.cmss.rds.instance.userNewInterface", data)
  .success(function (data, status, headers, config) {
    console.log(data.status);
    if (data.status) {
      vm.users = angular.fromJson(data.status).users;
    }
    else {
      console.log("get instance user list error");
    }
  }).error(function (data, status, headers, config) {
    console.log("connect error get instance user list");
  });*/