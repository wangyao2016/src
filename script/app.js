//依赖注入ui.router。注入指令和控制器模块
var mainApp = angular.module('mainApp', ['ui.router', 'ui.bootstrap', 'mainAppDirectives', 'mainAppCtrls', 'mainAppServices']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}

 mainApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    console.log("$state: "+$state);
    console.log("$stateParams: "+$stateParams);
  });
 */

//前端路由架构
mainApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');
    $stateProvider
        .state('list', {
            url: '/list',
            templateUrl: 'tpls/list.html',
            controller: 'LoadDataCtrl'
        })
        .state('cluster', {
            //params:{"instanceId":null},//uirouter传参
            url: '/cluster?clusterId&clusterName',
            //abstract: true,
            //defaultChild:'instance.basicInfo',
            templateUrl: 'tpls/cluster.html',
            controller: 'clusterCtrl'
        })
        .state('cluster.basicInfo', {
            url: '/basicInfo',
            templateUrl: 'tpls/cluster_tpls/basicInfo.html',
            controller: 'basicInfoCtrl'
        })
        .state('cluster.user', {
            url: '/user',
            templateUrl: 'tpls/cluster_tpls/user.html',
            controller: 'userCtrl'
        })
        .state('cluster.db', {
            url: '/db',
            templateUrl: 'tpls/cluster_tpls/db.html',
            controller: 'dbCtrl'
        }).state('cluster.backup', {
            url: '/backup',
            templateUrl: 'tpls/cluster_tpls/backup_nav.html',
            controller: 'backupCtrl_nav'
        }).state('cluster.backup.backup', {
            url: '/backlist',
            templateUrl: 'tpls/cluster_tpls/backup_list.html',
            controller: 'backupCtrl_backup'
        }).state('cluster.backup.detail', {
            url: '/detail?backupId',
            templateUrl: 'tpls/cluster_tpls/backup_detail.html',
            controller: 'backupCtrl_detail'
        }).state('cluster.backup.auto', {
            url: '/auto',
            templateUrl: 'tpls/cluster_tpls/backup_auto.html',
            controller: 'backupCtrl_auto'
        }).state('cluster.backup.autoBackupSet', {
            url: '/autoBackupSet',
            templateUrl: 'tpls/cluster_tpls/backup_autoBackupSet.html',
            controller: 'backupCtrl_autoBackupSet'
        }).state('cluster.monitor', {
            url: '/monitor',
            templateUrl: 'tpls/cluster_tpls/monitor.html',
            controller: 'monitorCtrl'
        })
        // .state('cluster.configs', {
        //     utl: '/configs',
        //     templateUrl: 'tpls/cluster_tpls/config_nav.html',
        //     controller: 'configsNavCtrl'
        // }).state('cluster.configs.configAction', {
        //     utl: '/configAction',
        //     templateUrl: 'tpls/cluster_tpls/configAction.html',
        //     controller: 'configActionCtrl'
        // })
        .state('cluster.configs', {
            url: '/configs',
            templateUrl: 'tpls/cluster_tpls/configs.html',
            controller: 'configsCtrl'
        })
        .state('cluster.configInfo', {
            url: '/configInfo?configId',
            templateUrl: 'tpls/cluster_tpls/configInfo.html',
            controller: 'configInfoCtrl'
        });
});