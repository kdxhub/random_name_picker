function range(min,max) {return Math.round(Math.random()*(max-min)+min);};function getQueryString(name) {let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");let r = window.location.search.substr(1).match(reg);if (r != null) {return unescape(r[2]);};return null;};
function hide(id) {document.getElementById(id).className=(document.getElementById(id).className+'Disabled')};
function unhide(id) {document.getElementById(id).className=id};
function start() {//「祈愿10次」按钮点击
  console.log('start wishing')
  //生成抽卡结果
  for (i = 0; i < 10; i++) { 
    step = range(0,name.length - 1);
    if ( output.indexOf('${name[step]}') != -1 ) {console.log(string(i--) + '重复随机值' + step);continue;};
    output.push (name[step]);outputStar.push (star[step])
    if ( output.length == 10 ) {break;};
  };
  console.log('output='+output.toString());console.log('outputStar='+outputStar.toString());
  
  //播放抽卡动画
  if ( outputStar.indexOf(4) != -1 ) {document.getElementById("cg").src = './res/cg4.mp4';console.log("存在星级4");};
  if ( outputStar.indexOf(5) != -1 ) {document.getElementById("cg").src = './res/cg5.mp4';console.log("存在星级5");};
  document.getElementById("cg").loop = false;
  hide('main');unhide('cgFrame');
  document.getElementById("cg").play();
};
function cgEnded() {//cg播放完成回调
  document.getElementById("cg").pause();
  next();
  hide('cgFrame');unhide('result');
  document.getElementById('result').setAttribute("onclick", "next()");
};
function next() {//抽卡结果逐个展示-下一个
  now++;
  if ( now >= 10 ) {total();return;};
  document.getElementById('nowNameDiv').setAttribute("class","hiding");
  document.getElementById('nowName').innerHTML=output[now];
};
function total() {//抽卡结果顺序展示完毕，展示全部
  hide('result');unhide('total');
};
function total_back() {//返回抽卡界面
  hide('total');unhide('main');
};

//声明变量
var output = [];var outputStar = [];var now = -1;
// 监听ended事件并注册回调
document.getElementById("cg").addEventListener("ended", (event) => {cgEnded();});
console.log('主函数加载成功');console.log("Copyright (C) 2024 kdxiaoyi. All right reserved.");