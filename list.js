//数组list定义名字，即显示结果名
var list = ["张三","李四","王二","汪峰","夏可","秦沐风","王春燕","邱二","易璞惠","天天","路玛","Ryde","路易·维斯","Hello world","蔡钤","天龘","亓才子","星","穹","荧","空","蔡徐","嘉禾","喧舟","晴栀","嘉懿","朱静","王俊","赵铁牛","方建军","王建国","黄轩","kdxiaoyi"];
//数组star定义星级，仅支持3/4/5星，不在范围内取最近
//若超出星级则取最近值，数组长度不等报错
var star = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5];

console.log("list长度="+list.length);console.log("star长度="+star.length);console.log("Copyright (C) 2024 kdxiaoyi. All right reserved.");
document.getElementById('main-loadedList').innerHTML="共计"+list.length+"名幸运儿，抽取概率均等";if (star.length != list.length) {document.getElementById('main-loadedList').innerHTML="部署错误。配置文件长度不等。";};//todo:加按钮禁用//