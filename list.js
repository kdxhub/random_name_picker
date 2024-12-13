const name = ["罗逸群","李四","王二","汪峰","夏可","秦沐风","王春燕","邱二","易璞惠","天天","路玛","Ryde","路易·维斯","Hello world","蔡钤","天龘","亓才孑","星","穹","荧","空","蔡徐","嘉禾","喧舟","晴栀","嘉懿","朱静","王俊","赵铁牛","方建军","王建国","黄轩","kdxiaoyi"];
const star = [3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5];
const maxHistory = 15;
const version = 3;
//配置文件编辑器：
// https://kdxhub.github.io/random_name_picker/comfig-spawn.html
// 根目录下config-spawn.html
function DisableStart(Reazon){document.getElementById('main-loadedList').innerHTML=Reazon;document.getElementById('start').disabled=true;document.getElementById('startButtonTips').innerHTML="引擎故障…";document.getElementById('startGuidancePrompt').innerHTML="请联系管理员/电教委以获取支持"};console.log("name长度="+name.length);console.log("star长度="+star.length);document.getElementById('main-loadedList').innerHTML="共计"+name.length+"名幸运儿，抽取概率均等";if(star.length!=name.length){DisableStart("E04.部署错误。数组「name」与「star」长度不等。")};if(star.length<=10){DisableStart("E05.部署错误。待选项太少（"+star.length+"项）<br>至少需要11项。")};configLoaded();
