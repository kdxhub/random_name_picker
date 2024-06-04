//数组name定义名字，即显示结果名
const name = ["张三","李四","王二","汪峰","夏可","秦沐风","王春燕","邱二","易璞惠","天天","路玛","Ryde","路易·维斯","Hello world","蔡钤","天龘","亓才子","星","穹","荧","空","蔡徐","嘉禾","喧舟","晴栀","嘉懿","朱静","王俊","赵铁牛","方建军","王建国","黄轩","kdxiaoyi"];
//数组star定义星级，仅支持3/4/5星，不在范围内取最近
//若超出星级则取最近值，数组长度不等报错
const star = [3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5];

function DisableStart(Reazon){document.getElementById('main-loadedList').innerHTML=Reazon;document.getElementById('start').disabled=true;document.getElementById('startButtonTips').innerHTML="引擎故障…";document.getElementById('startGuidancePrompt').innerHTML="请联系管理员/电教委以获取支持"};console.log("name长度="+name.length);console.log("star长度="+star.length);document.getElementById('main-loadedList').innerHTML="共计"+name.length+"名幸运儿，抽取概率均等";if(star.length!=name.length){DisableStart("部署错误。数组「name」与「star」长度不等。")};if(star.length<=10){DisableStart("部署错误。待选项太少（"+star.length+"项）<br>至少需要11项。")};