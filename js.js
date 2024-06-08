function range(min,max) {return Math.round(Math.random()*(max-min)+min);};function getQueryString(name) {let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");let r = window.location.search.substr(1).match(reg);if (r != null) {return unescape(r[2]);};return null;};function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));};
function hide(id) {document.getElementById(id).className=(document.getElementById(id).className+'Disabled')};
function unhide(id) {document.getElementById(id).className=id};
function r() {start();cgEnded();};// debug:快速生成结果并展示
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
  //播放背景音乐（自动进度归0）
  document.getElementById('resultBgm').currentTime = 0;
  document.getElementById('result').setAttribute("loop", "");
  document.getElementById('resultBgm').play();
};
function next() {//抽卡结果逐个展示-下一个
  now++;
  if ( now >= 10 ) {console.log('展示完毕，进入total');total();return;};console.log('展示下一个 now='+now)
  document.getElementById('result').setAttribute("onclick", "nextBan()");
  document.getElementById('nowName').innerHTML=output[now];
  document.getElementById('nowName').setAttribute("class","p-hiding");
  document.getElementById('ring').currentTime = 0;
  document.getElementById('ring').play();
  sleep(1000).then(() => {
    document.getElementById('nowName').setAttribute("class", "p-showing");
    document.getElementById('result').setAttribute("onclick", "next()");
  });
};
function nextBan() {console.log('E06:动画中不能下一个 now='+now);return;};//抽卡结果下一个（动画中直接返回）
function total() {//抽卡结果顺序展示完毕，展示全部
  hide('result');unhide('total');
};
function total_back() {//返回抽卡界面
  hide('total');unhide('main');
  document.getElementById('resultBgm').pause();
};

//声明变量
var output = [];var outputStar = [];var now = -1;
// 监听ended事件并注册回调
document.getElementById("cg").addEventListener("ended", (event) => {cgEnded();});
//背景音乐单曲循环（Event方法）（事实上loop和Event同时生效了）
document.getElementById("resultBgm").addEventListener("ended", (event) => {document.getElementById('resultBgm').currentTime = 0;document.getElementById('resultBgm').play();});
//加载list.js
if ( getQueryString('list') == null ) {
  let listJsElement=document.createElement("script");
  listJsElement.setAttribute("type","text/javascript");
  listJsElement.setAttribute("src",'./list.js');
  document.body.appendChild(listJsElement);
  console.log('未找到三方list.js');
} else {
  let listJsElement=document.createElement("script");
  listJsElement.setAttribute("type","text/javascript");
  listJsElement.setAttribute("src",getQueryString('list'));
  document.body.appendChild(listJsElement);
  document.getElementById('listJs').setAttribute("src", getQueryString('list'));
  console.log('找到三方list.js  src='+getQueryString('list'));
};
// 禁止选择文本（本来可以换更加隐蔽的写法，但是尊重下用反防止复制插件的人）
function noSelect() {return false;};
// 检查javascript是否启用（未启用则主main不会显示，而是弹出提示）
document.getElementById("main").setAttribute("class","main");document.getElementById("noscript").setAttribute("style","display:none;");

console.log('主函数加载成功');console.log("Copyright (C) 2024 kdxiaoyi. All right reserved.");