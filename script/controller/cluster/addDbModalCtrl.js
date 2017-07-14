angular.module('mainAppCtrls')
    //添加用户modal的控制器
    .controller('addDbModalCtrl', ['$scope', '$uibModalInstance', '$stateParams', 'dataService', 'httpService',
        function($scope, $uibModalInstance, $stateParams, dataService, httpService) {
            var vm = $scope.vm = {};
            vm.dbs = [
                { "charater": "utf8", "rule": "utf8_general_ci" },
                { "charater": "gbk", "rule": "gbk_chinese_ci" },
                { "charater": "big5", "rule": "big5_chinese_ci" },
                { "charater": "cp850", "rule": "cp850_general_ci" },
                { "charater": "hp8", "rule": "hp8_english_ci" },
                { "charater": "koi8r", "rule": "koi8r_general_ci" },
                { "charater": "latin1", "rule": "latin1_swedish_ci" },
                { "charater": "latin2", "rule": "latin2_general_ci" },
                { "charater": "swe7", "rule": "swe7_swedish_ci" },
                { "charater": "ascii", "rule": "ascii_general_ci" },
                { "charater": "ujis", "rule": "ujis_japanese_ci" },
                { "charater": "sjis", "rule": "sjis_japanese_ci" },
                { "charater": "hebrew", "rule": "hebrew_general_ci" },
                { "charater": "tis620", "rule": "tis620_thai_ci" },
                { "charater": "euckr", "rule": "euckr_korean_ci" },
                { "charater": "koi8u", "rule": "koi8u_general_ci" },
                { "charater": "gb2312", "rule": "gb2312_chinese_ci" },
                { "charater": "cp1250", "rule": "cp1250_general_ci" },
                { "charater": "latin5", "rule": "latin5_turkish_ci" },
                { "charater": "armscii8", "rule": "armscii8_general_ci" },
                { "charater": "cp866", "rule": "cp866_general_ci" },
                { "charater": "keybcs2", "rule": "keybcs2_general_ci" },
                { "charater": "macce", "rule": "macce_general_ci" },
                { "charater": "macroman", "rule": "macroman_general_ci" },
                { "charater": "cp852", "rule": "cp852_general_ci" },
                { "charater": "latin7", "rule": "latin7_general_ci" },
                { "charater": "cp1251", "rule": "cp1251_general_ci" },
                { "charater": "cp1256", "rule": "cp1256_general_ci" },
                { "charater": "cp1257", "rule": "cp1257_general_ci" },
                { "charater": "binary", "rule": "binary" },
                { "charater": "geostd8", "rule": "geostd8_general_ci" },
                { "charater": "cp932", "rule": "cp932_japanese_ci" },
                { "charater": "eucjpms", "rule": "eucjpms_japanese_ci" }
            ];
            // vm.dbs_set = [
            //     { "utf8": "utf8_general_ci" },
            //     { "gbk": "gbk_chinese_ci" },
            //     { "big5": "big5_chinese_ci" },
            //     { "cp850": "cp850_general_ci" },
            //     { "hp8": "hp8_english_ci" },
            //     { "koi8r": "koi8r_general_ci" },
            //     { "latin1": "latin1_swedish_ci" },
            //     { "latin2": "latin2_general_ci" },
            //     { "swe7": "swe7_swedish_ci" },
            //     { "ascii": "ascii_general_ci" },
            //     { "ujis": "ujis_japanese_ci" },
            //     { "sjis": "sjis_japanese_ci" },
            //     { "hebrew": "hebrew_general_ci" },
            //     { "tis620": "tis620_thai_ci" },
            //     { "euckr": "euckr_korean_ci" },
            //     { "koi8u": "koi8u_general_ci" },
            //     { "gb2312": "gb2312_chinese_ci" },
            //     { "cp1250": "cp1250_general_ci" },
            //     { "latin5": "latin5_turkish_ci" },
            //     { "armscii8": "armscii8_general_ci" },
            //     { "cp866": "cp866_general_ci" },
            //     { "keybcs2": "keybcs2_general_ci" },
            //     { "macce": "macce_general_ci" },
            //     { "macroman": "macroman_general_ci" },
            //     { "cp852": "cp852_general_ci" },
            //     { "latin7": "latin7_general_ci" },
            //     { "cp1251": "cp1251_general_ci" },
            //     { "cp1256": "cp1256_general_ci" },
            //     { "cp1257": "cp1257_general_ci" },
            //     { "binary": "binary" },
            //     { "geostd8": "geostd8_general_ci" },
            //     { " cp932": "cp932_japanese_ci" },
            //     { "eucjpms": "eucjpms_japanese_ci" }
            // ];
            //ok方法，点击确认触发
            vm.addUserOk = function() {
                var id = dataService.getData();
                var data = {
                    "id": id,
                    "name": vm.db_add.name,
                    "character_set": vm.character_set.charater,
                    "collate": vm.character_set.rule
                };
                console.log(vm.character_set);
                httpService.getServiceResult("post", "rds/v1/mysql/clusters/" + id + "/databases", angular.fromJson(data))
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