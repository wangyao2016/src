 angular.module('mainAppServices')
     //调用接口，get方法 不传参数---以后把path改成真实的path，param是传进来的参数
     .service('getService', ['$http', function($http) {
         var doRequest = function(path, param) {
             return $http({
                 method: 'get',
                 url: path,
                 params: param
             })
         };
         return {
             getServiceResult: function(path, param) {
                 console.log("service path:" + path);
                 return doRequest(path, param);
             }
         }
     }]);