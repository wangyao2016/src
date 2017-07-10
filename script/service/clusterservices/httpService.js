  /**
   * http调用接口，三个参数
   * @param  GET/POST/DELETE/PUT
   * @param  调用url
   * @param  调用参数param
   */
  angular.module('mainAppServices')
      .service('httpService', ['$http', function($http) {
          var doRequest = function(method, path, param) {
              return $http({
                  method: method,
                  url: path,
                  params: param
              })
          };
          return {
              getServiceResult: function(method, path, param) {
                  console.log("service path:" + path);
                  return doRequest(method, path, param);
              }
          }
      }]);