/**
 * Created by wangyao on 2017/7/14.
 */
angular.module('mainAppCtrls') //monitor控制器
    .controller('monitorCtrl', ['$scope', '$state', '$stateParams',
        function($scope, $state, $stateParams) {
            var vm = $scope.vm = {};
            vm.clusterId = $stateParams.clusterId;
            vm.clusterName = $stateParams.clusterName;

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

            createCharts(vm.clusterName+"-member-1_");

            //<!-- ECharts单文件引入 -->
            function createCharts(clusterName){
            //    require.config({
            //        paths: {
            //            echarts:'vender/echarts/dist'
            //        }
            //    });
                // Step:4 require echarts and use it in the callback.
                // Step:4 动态加载echarts然后在回调函数中开始使用，注意保持按需加载结构定义图表路径
                //require(
                //    [
                //        'echarts',
                //        'echarts/chart/bar',
                //        'echarts/chart/line',
                //        'echarts/chart/map',
                //        'echarts/chart/pie',
                //        'echarts/chart/funnel',
                //    ],
                //    function(ec) {
                        //--- 折柱 ---
                        var myChart = echarts.init(document.getElementById('mainn'));
                        var myChart2 = echarts.init(document.getElementById('mainn2'));
                        var myChart3 = echarts.init(document.getElementById('mainn3'));
                        var myChart4 = echarts.init(document.getElementById('mainn4'));
                        var myChart5 = echarts.init(document.getElementById('mainn5'));
                        var myChart6 = echarts.init(document.getElementById('mainn6'));
                        var myChart7 = echarts.init(document.getElementById('mainn7'));
                        var myChart8 = echarts.init(document.getElementById('mainn8'));
                        var myChart9 = echarts.init(document.getElementById('mainn9'));
                        var myChart10 = echarts.init(document.getElementById('mainn10'));

                        myChart.showLoading({
                            text: '图二正在努力加载中...'
                        });
                        myChart2.showLoading({
                            text: '图一正在努力加载中...'
                        });
                        myChart3.showLoading({
                            text: '图三正在努力加载中...'
                        });
                        myChart4.showLoading({
                            text: '图四正在努力加载中...'
                        });
                        myChart5.showLoading({
                            text: '图五正在努力加载中...'
                        });
                        myChart6.showLoading({
                            text: '图六正在努力加载中...'
                        });
                        myChart7.showLoading({
                            text: '图七正在努力加载中...'
                        });
                        myChart8.showLoading({
                            text: '图八正在努力加载中...'
                        });
                        myChart9.showLoading({
                            text: '图九正在努力加载中...'
                        });
                        myChart10.showLoading({
                            text: '图十正在努力加载中...'
                        });
                        //定义装着time和value的数组
                        var cpuLoadtimes = [];
                        var cpuLoadvalues = [];

                        var utilizationTimes = [];
                        var utilizationValues = [];

                        var memoryTimes = [];
                        var memoryValues = [];

                        var networkTimes = [];
                        var networkValues = [];

                        var iostatUtilTimes = [];
                        var iostatUtilValues = [];

                        var iostatByteTimes = [];
                        var iostatByteValues = [];

                        var Times7 = [];
                        var Values7 = [];

                        var Times8 = [];
                        var Values8 = [];

                        var Times9 = [];
                        var Values9 = [];

                        var Times10 = [];
                        var Values10 = [];

                        //向后台发送请求，并获得数据
                        $.ajax({
                            url: "rds/v1/mysql/clusters/"+vm.clusterId+"/monitor/"+clusterName,
                            //url: "rds/v1/mysql/instances/"+vm.clusterId+"/monitor/zgcl-10-member-2_98c7d434-6e69-44c5-a898-b7c0f7414e64",
                            type: "get",
                            dataType: "json",
                            async :"false",
                            data: {
                                "dataNum":100
                            },
                            success: function (returndata) {
                                var original = returndata.data;
                                console.log($.parseJSON(original));
                                if($.parseJSON(original).host.graph==null){
                                    //alert("暂无监控数据！");
                                    vm.addAlert("alert_fail", "暂无监控数据！");
                                }else{

                                    $.each($.parseJSON(original).host.graph, function (i, item)
                                        {
                                            //图一
                                            if(item.graphname=="CPU load"){
                                                $.each((item.item), function (i_1, item_1)
                                                {
                                                    $.each((item_1.historydata), function (i_1_1, item_1_1)
                                                    {
                                                        cpuLoadvalues.push(item_1_1.value);
                                                        var time = new Date(item_1_1.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        cpuLoadtimes.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                });
                                            }//end If CPU load

                                            //图二
                                            if(item.graphname=="CPU utilization"){
                                                $.each((item.item), function (i_2, item_2)
                                                {
                                                    $.each((item_2.historydata), function (i_2_2, item_2_2)
                                                    {
                                                        utilizationValues.push(item_2_2.value);
                                                        var time = new Date(item_2_2.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        utilizationTimes.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If CPU utilization

                                            //图三
                                            if(item.graphname=="Memory usage"){
                                                $.each((item.item), function (i_3, item_3)
                                                {
                                                    $.each((item_3.historydata), function (i_3_3, item_3_3)
                                                    {
                                                        memoryValues.push(item_3_3.value);
                                                        var time = new Date(item_3_3.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        memoryTimes.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                });
                                                /*console.log("utilizationValues长度: "+utilizationValues.length);
                                                 console.log("memoryTimes长度: "+memoryTimes.length);
                                                 console.log("memoryValues长度: "+memoryValues.length);
                                                 console.log("memoryValues: "+memoryValues);*/
                                            }//end If Memory usage

                                            //图四
                                            if(item.graphname=="Network traffic on eth0"){
                                                $.each((item.item), function (i_4, item_4)
                                                {
                                                    $.each((item_4.historydata), function (i_4_4, item_4_4)
                                                    {
                                                        networkValues.push(item_4_4.value);
                                                        var time = new Date(item_4_4.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        networkTimes.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If Network traffic

                                            //图五
                                            if(item.graphname=="iostat - vdb - Utilisation"){
                                                $.each((item.item), function (i_5, item_5)
                                                {
                                                    $.each((item_5.historydata), function (i_5_5, item_5_5)
                                                    {
                                                        iostatUtilValues.push(item_5_5.value);
                                                        var time = new Date(item_5_5.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        iostatUtilTimes.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If Network traffic

                                            //图六
                                            if(item.graphname=="iostat - vdb - Bytessec"){
                                                $.each((item.item), function (i_6, item_6)
                                                {
                                                    $.each((item_6.historydata), function (i_6_6, item_6_6)
                                                    {
                                                        iostatByteValues.push(item_6_6.value);
                                                        var time = new Date(item_6_6.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        iostatByteTimes.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If Network traffic

                                            //图七
                                            if(item.graphname=="Disk space usage varlibmysql"){
                                                $.each((item.item), function (i_7, item_7)
                                                {
                                                    $.each((item_7.historydata), function (i_7_7, item_7_7)
                                                    {
                                                        Values7.push(item_7_7.value);
                                                    })
                                                })
                                            }//end If Disk space usage varlibmysql

                                            //图八
                                            if(item.graphname=="iostat - vdb - Requestssec"){
                                                $.each((item.item), function (i_8, item_8)
                                                {
                                                    $.each((item_8.historydata), function (i_8_8, item_8_8)
                                                    {
                                                        Values8.push(item_8_8.value);
                                                        var time = new Date(item_8_8.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        Times8.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If iostat - vdb - Requestssec

                                            //图九
                                            if(item.graphname=="Mysql connections"){
                                                $.each((item.item), function (i_9, item_9)
                                                {
                                                    $.each((item_9.historydata), function (i_9_9, item_9_9)
                                                    {
                                                        Values9.push(item_9_9.value);
                                                        var time = new Date(item_9_9.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        Times9.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If Mysql connections

                                            //图十
                                            if(item.graphname=="MySQL operations"){
                                                $.each((item.item), function (i_10, item_10)
                                                {
                                                    $.each((item_10.historydata), function (i_10_10, item_10_10)
                                                    {
                                                        Values10.push(item_10_10.value);
                                                        var time = new Date(item_10_10.clock * 1000);
                                                        var hours=time.getHours();
                                                        var minutes=time.getMinutes();
                                                        var seconds=time.getSeconds();
                                                        Times10.push(hours+":"+minutes+":"+seconds);
                                                    })
                                                })
                                            }//end If Mysql connections
                                        }
                                    );

                                    //第一张表的数据处理，拿出每一条线的time和value
                                    if(cpuLoadtimes.length == 0)
                                    {
                                        cpuLoadtimes1 = [0];
                                    }
                                    else
                                    {
                                        cpuLoadtimes1 = cpuLoadtimes.splice(0,100);
                                    }
                                    if(cpuLoadvalues.length == 0)
                                    {
                                        cpuLoadvalues1 = [0];
                                        cpuLoadvalues2 = [0];
                                        cpuLoadvalues3 = [0];
                                    }
                                    else
                                    {
                                        cpuLoadvalues1 = cpuLoadvalues.splice(0,100);
                                        cpuLoadvalues2 = cpuLoadvalues.splice(0,100);
                                        cpuLoadvalues3 = cpuLoadvalues.splice(0,100);
                                    }

                                    //第二张表的数据处理，拿出每一条线的time和value
                                    if(utilizationTimes.length == 0)
                                    {
                                        utilizationTimes1 = [0];
                                    }
                                    else
                                    {
                                        utilizationTimes1 = utilizationTimes.splice(0,100);
                                    }
                                    if(utilizationValues.length == 0)
                                    {
                                        utilizationValues1 = [0];
                                        utilizationValues2 = [0];
                                        utilizationValues3 = [0];
                                        utilizationValues4 = [0];
                                        utilizationValues5 = [0];
                                        utilizationValues6 = [0];
                                        utilizationValues7 = [0];
                                        utilizationValues8 = [0];
                                    }
                                    else
                                    {
                                        utilizationValues1 = utilizationValues.splice(0,100);
                                        utilizationValues2 = utilizationValues.splice(0,100);
                                        utilizationValues3 = utilizationValues.splice(0,100);
                                        utilizationValues4 = utilizationValues.splice(0,100);
                                        utilizationValues5 = utilizationValues.splice(0,100);
                                        utilizationValues6 = utilizationValues.splice(0,100);
                                        utilizationValues7 = utilizationValues.splice(0,100);
                                        utilizationValues8 = utilizationValues.splice(0,100);
                                    }


                                    //第三张表暂时为空， 数据处理，拿出每一条线的time和value
                                    //*****如果第三张表为空，给数组赋值0，起码要有数据，才会画出表的基本框架。
                                    if(memoryTimes.length == 0)
                                    {
                                        memoryTimes1=[0];
                                    }
                                    else
                                    {
                                        memoryTimes1 = memoryTimes.splice(0,100);
                                    }
                                    if(memoryValues.length == 0)
                                    {
                                        memoryValues1=[0];
                                        memoryValues2=[0];
                                    }
                                    else
                                    {
                                        memoryValues1 = memoryValues.splice(0,100);
                                        memoryValues2 = [];
                                        for(var i=0;i<100;i++){
                                            memoryValues2.push(memoryValues[0]);
                                        }
                                    }

                                    //第四张表暂时为空， 数据处理，拿出每一条线的time和value
                                    //*****如果第四张表为空，给数组赋值0，起码要有数据，才会画出表的基本框架。
                                    if(networkTimes.length == 0)
                                    {
                                        networkTimes1 = [0];
                                    }
                                    else
                                    {
                                        networkTimes1 = networkTimes.splice(0,100);
                                    }
                                    if(networkValues.length == 0)
                                    {
                                        networkValues1 = [0];
                                        networkValues2 = [0];
                                    }
                                    else
                                    {
                                        networkValues1 = networkValues.splice(0,100);
                                        networkValues2 = networkValues.splice(0,100);
                                    }

                                    //第五张表的数据处理，拿出每一条线的time和value
                                    if(iostatUtilTimes.length == 0)
                                    {
                                        iostatUtilTimes1 = [0];
                                    }
                                    else
                                    {
                                        iostatUtilTimes1 = iostatUtilTimes.splice(0,100);
                                    }
                                    if(iostatUtilValues.length == 0)
                                    {
                                        iostatUtilValues1 = [0];
                                    }
                                    else
                                    {
                                        iostatUtilValues1 = iostatUtilValues.splice(0,100);
                                    }

                                    //第六张表的数据处理，拿出每一条线的time和value
                                    if(iostatByteTimes.length == 0)
                                    {
                                        iostatByteTimes1 = [0];
                                    }
                                    else
                                    {
                                        iostatByteTimes1 = iostatByteTimes.splice(0,100);
                                    }
                                    if(iostatByteValues.length == 0)
                                    {
                                        iostatByteValues1 = [0];
                                        iostatByteValues2 = [0];
                                    }
                                    else
                                    {
                                        iostatByteValues1 = iostatByteValues.splice(0,100);
                                        iostatByteValues2 = iostatByteValues.splice(0,100);
                                    }

                                    //第七张表的数据处理，拿出每一条线的time和value
                                    if(Values7.length == 0)
                                    {
                                        Values71 = [0];
                                        Values72 = [0];
                                    }
                                    else
                                    {
                                        Values71 = Values7[0];
                                        Values72 = Values7[Values7.length-1];
                                    }

                                    //第八张表的数据处理，拿出每一条线的time和value
                                    if(Times8.length == 0)
                                    {
                                        Times81 = [0];
                                    }
                                    else
                                    {
                                        Times81 = Times8.splice(0,100);
                                    }
                                    if(Values8.length == 0)
                                    {
                                        Values81 = [0];
                                        Values82 = [0];
                                        Values83 = [0];
                                        Values84 = [0];
                                    }
                                    else
                                    {
                                        Values81 = Values8.splice(0,100);
                                        Values82 = Values8.splice(0,100);
                                        Values83 = Values8.splice(0,100);
                                        Values84 = Values8.splice(0,100);
                                    }

                                    //第九张表的数据处理，拿出每一条线的time和value
                                    if(Times9.length == 0)
                                    {
                                        Times91 = [0];
                                    }
                                    else
                                    {
                                        Times91 = Times9.splice(0,100);
                                    }
                                    if(Values9.length == 0)
                                    {
                                        Values91 = [0];
                                        Values92 = [0];
                                    }
                                    else
                                    {
                                        Values91 = Values9.splice(0,100);
                                        Values92 = Values9.splice(0,100);
                                    }

                                    //第十张表的数据处理，拿出每一条线的time和value
                                    if(Times10.length == 0)
                                    {
                                        Times101 = [0];
                                    }
                                    else
                                    {
                                        Times101 = Times10.splice(0,100);
                                    }
                                    if(Values10.length == 0)
                                    {
                                        Values101 = [0];
                                        Values102 = [0];
                                        Values103 = [0];
                                        Values104 = [0];
                                        Values105 = [0];
                                        Values106 = [0];
                                        Values107 = [0];
                                    }
                                    else
                                    {
                                        Values101 = Values10.splice(0,100);
                                        Values102 = Values10.splice(0,100);
                                        Values103 = Values10.splice(0,100);
                                        Values104 = Values10.splice(0,100);
                                        Values105 = Values10.splice(0,100);
                                        Values106 = Values10.splice(0,100);
                                        Values107 = Values10.splice(0,100);
                                    }



                                    //第一张图的option开始
                                    var cpuLoadoption = {
                                        title : {
                                            text: 'CPU load',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            x:150,
                                            data:['processor load(1 min average per core)','processor load(5 min average per core)','processor load(15 min average per core)']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : cpuLoadtimes1.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'processor load(1 min average per core)',
                                                type:'line',
                                                symbol:'none',
                                                data:cpuLoadvalues1.reverse(),
                                                markLine : {
                                                    data : [
                                                        {type : 'average', name: '平均值'}
                                                    ]
                                                }
                                            },
                                            {
                                                name:'processor load(5 min average per core)',
                                                type:'line',
                                                symbol:'none',
                                                data:cpuLoadvalues2.reverse(),
                                                markLine : {
                                                    data : [
                                                        {type : 'average', name : '平均值'}
                                                    ]
                                                }
                                            },
                                            {
                                                name:'processor load(15 min average per core)',
                                                type:'line',
                                                symbol:'none',
                                                data:cpuLoadvalues3.reverse(),
                                                markLine : {
                                                    data : [
                                                        {type : 'average', name : '平均值'}
                                                    ]
                                                }
                                            }
                                        ]
                                    };
                                    //第一张图的option结束

                                    //第二张图的option开始
                                    var utilizationOption = {
                                        title : {
                                            text: 'CPU utilization',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            x: 150,
                                            data:['CPU idle time','CPU user time','CPU system time','CPU iowait time','CPU nice time','CPU interrupt time','CPU softirq time','CPU steal time']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : utilizationTimes1.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                axisLabel : {
                                                    formatter: '{value} %'
                                                }
                                            }
                                        ],
                                        series : [

                                            {
                                                name:'CPU user time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues7.reverse()
                                            },
                                            {
                                                name:'CPU system time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues6.reverse()
                                            },
                                            {
                                                name:'CPU iowait time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues5.reverse()
                                            },
                                            {
                                                name:'CPU nice time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues4.reverse()
                                            },
                                            {
                                                name:'CPU interrupt time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues3.reverse()
                                            },
                                            {
                                                name:'CPU softirq time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues2.reverse()
                                            },
                                            {
                                                name:'CPU steal time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues1.reverse()
                                            },
                                            {
                                                name:'CPU idle time',
                                                type:'line',
                                                symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:utilizationValues8.reverse()
                                            }
                                        ]
                                    };

                                    //第二张图的option结束

                                    //第三张图option开始
                                    var memoryOption = {
                                        title : {
                                            text: 'Memory Usage',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:['available memory','total memory']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : memoryTimes1.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                type : 'value'
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'available memory',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:memoryValues1.reverse()
                                            },
                                            {
                                                name:'total memory',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:memoryValues2
                                            }
                                        ]
                                    };

                                    //第三张图option结束

                                    //第四张图option开始
                                    var networkOption = {
                                        title : {
                                            text: 'Network traffic on eth0',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            x:250,
                                            data:['Incoming Network traffic on eth0','Outgoing Network traffic on eth0']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : networkTimes1.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'Incoming Network traffic on eth0',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:networkValues1.reverse()
                                            },
                                            {
                                                name:'Outgoing Network traffic on eth0',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:networkValues2.reverse()
                                            }
                                        ]
                                    };
                                    //第四张图option结束

                                    //第五张图option开始
                                    var iostatUtilOption = {
                                        title : {
                                            text: 'iostat - vdb - Utilisation',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:['vdb %util']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : iostatUtilTimes1.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'vdb %util',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:iostatUtilValues1.reverse()
                                            }
                                        ]
                                    };
                                    //第五张图option结束

                                    //第六张图option开始
                                    var iostatByteOption = {
                                        title : {
                                            text: 'iostat - vdb - Bytes/sec',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:['vdb%util(line1)','vdb%util(line2)']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : iostatByteTimes1.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'vdb%util(line1)',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:iostatByteValues1.reverse()
                                            },
                                            {
                                                name:'vdb%util(line2)',
                                                type:'line',symbol:'none',
                                                smooth:true,
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:iostatByteValues2.reverse()
                                            }
                                        ]
                                    };
                                    //第六张图option结束

                                    //第七张图option开始
                                    var Option7 = {
                                        title : {
                                            text: 'Disk space usage /var/lib/mysql',
                                            subtext: 'rds-monitor',
                                            x:'left'
                                        },
                                        tooltip : {
                                            trigger: 'item',
                                            formatter: "{a} <br/>{b} : {c} MB"
                                        },
                                        legend: {
                                            data:['Used disk space on /var/lib/mysql','Free disk space on /var/lib/mysql']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {
                                                    show: false,
                                                    type: ['pie']
                                                },
                                                restore : {show: true},
                                                saveAsImage : {show: true}
                                            }
                                        },
                                        calculable : true,
                                        /* xAxis : [
                                         {
                                         type : 'category',
                                         }
                                         ],
                                         yAxis : [
                                         {
                                         type : 'value'
                                         }
                                         ],*/
                                        series : [
                                            {
                                                name:'Disk space usage /var/lib/mysql',
                                                type:'pie',
                                                radius : '55%',
                                                center: ['50%', '60%'],
                                                data:[
                                                    {value:Values71-Values72, name:'Used disk space on /var/lib/mysql'},
                                                    {value:Values72, name:'Free disk space on /var/lib/mysql'}
                                                ]
                                            }
                                        ]
                                    };
                                    //第七张图option结束

                                    //第八张图的option开始
                                    var Option8 = {
                                        title : {
                                            text: 'iostat - vdb - Requests/sec',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:['vdb r/s','vdb w/s','vdb rrqm/s','vdb wrqm/s']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : Times81.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                                /* axisLabel : {
                                                 formatter: '{value} %'
                                                 }*/
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'vdb r/s',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values81.reverse()
                                            },
                                            {
                                                name:'vdb w/s',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values82.reverse()
                                            },
                                            {
                                                name:'vdb rrqm/s',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values83.reverse()
                                            },
                                            {
                                                name:'vdb wrqm/s',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values84.reverse()
                                            }
                                        ]
                                    };
                                    //第八张图的option结束

                                    //第九张图的option开始
                                    var Option9 = {
                                        title : {
                                            text: 'Mysql connections',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            data:['Mysql status','Mysql connections']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : Times91.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                                /* axisLabel : {
                                                 formatter: '{value} %'
                                                 }*/
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'Mysql status',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values91.reverse()
                                            },
                                            {
                                                name:'Mysql connections',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values92.reverse()
                                            }
                                        ]
                                    };
                                    //第九张图的option结束

                                    //第十张图的option开始
                                    var Option10 = {
                                        title : {
                                            text: 'Mysql operations(per second)',
                                            subtext: 'rds-monitor'
                                        },
                                        tooltip : {
                                            trigger: 'axis'
                                        },
                                        legend: {
                                            x:300,
                                            data:['Mysql begin operations',
                                                'Mysql commit operations',
                                                'Mysql delete operations',
                                                'Mysql insert operations',
                                                'Mysql rollback operations',
                                                'Mysql select operations',
                                                'Mysql update operations']
                                        },
                                        toolbox: {
                                            show : true,
                                            feature : {
                                                mark : {show: false},
                                                dataView : {show: true, readOnly: false},
                                                magicType : {show: true, type: ['line', 'bar']},
                                                restore : {show: false},
                                                saveAsImage : {show: false}
                                            }
                                        },
                                        calculable : true,
                                        xAxis : [
                                            {
                                                type : 'category',
                                                boundaryGap : false,
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }},
                                                data : Times101.reverse()
                                            }
                                        ],
                                        yAxis : [
                                            {
                                                type : 'value',
                                                splitLine:{
                                                    lineStyle:{
                                                        type:'dashed'
                                                    }}
                                                /* axisLabel : {
                                                 formatter: '{value} %'
                                                 }*/
                                            }
                                        ],
                                        series : [
                                            {
                                                name:'Mysql begin operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values101.reverse()
                                            },
                                            {
                                                name:'Mysql commit operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values102.reverse()
                                            },
                                            {
                                                name:'Mysql delete operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values103.reverse()
                                            },
                                            {
                                                name:'Mysql insert operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values104.reverse()
                                            },
                                            {
                                                name:'Mysql rollback operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values105.reverse()
                                            },
                                            {
                                                name:'Mysql select operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values106.reverse()
                                            },
                                            {
                                                name:'Mysql update operations',
                                                type:'line',symbol:'none',
                                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                                data:Values107.reverse()
                                            }

                                        ]
                                    };
                                    //第九张图的option结束

                                    //载入图的option开始
                                    myChart.setOption(cpuLoadoption);
                                    myChart.hideLoading();

                                    myChart2.setOption(utilizationOption);
                                    myChart2.hideLoading();

                                    myChart3.setOption(memoryOption);
                                    myChart3.hideLoading();

                                    myChart4.setOption(networkOption);
                                    myChart4.hideLoading();

                                    myChart5.setOption(iostatUtilOption);
                                    myChart5.hideLoading();

                                    myChart6.setOption(iostatByteOption);
                                    myChart6.hideLoading();

                                    myChart7.setOption(Option7);
                                    myChart7.hideLoading();

                                    myChart8.setOption(Option8);
                                    myChart8.hideLoading();

                                    myChart9.setOption(Option9);
                                    myChart9.hideLoading();

                                    myChart10.setOption(Option10);
                                    myChart10.hideLoading();
                                }//载入图的option开始
                            }//success
                        })//ajax
                    //}//function ec
                //);
            }




        }
    ]);
