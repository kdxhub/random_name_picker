const CurrentVersion = 2;
function setCookie(cname, cvalue, exdays) { var d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); var expires = "expires=" + d.toGMTString(); document.cookie = cname + "=" + cvalue + "; " + expires }; function getCookie(cname) { var name = cname + "="; var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i].trim(); if (c.indexOf(name) == 0) return c.substring(name.length, c.length) }; return null };//cookies操作模块
function range(min, max) { return Math.round(Math.random() * (max - min) + min); }; function getQueryString(name) { let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); let r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]); }; return null; }; function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; function removeElement(ElementId) { document.getElementById(ElementId).remove(); };//加载一些通用模块
function r() { start(); cgEnded(); };// debug:快速生成结果并展示
function lowUsage() {
  console.log('低特效已启用');
  removeElement('HighQuality-mask_shining');
  removeElement('HighQuality-stars');
  removeElement('HighQuality-triangle');
};
function start() {//「祈愿10次」按钮点击
  console.log('start wishing');
  output = []; outputStar = [];
  //生成抽卡结果
  for (i = 0; i < 10; i++) {
    var step = range(0, name.length - 1);
    if (output.indexOf(name[step]) != -1) { console.log(i-- + '重复随机值' + step); continue; };
    output.push(name[step]);
    if (star[step] <= 3) { outputStar.push(3); };
    if (star[step] == 4) { outputStar.push(4); };
    if (star[step] >= 5) { outputStar.push(5); };
    if (output.length == 10) { break; };
  };
  console.log('output=' + output.toString()); console.log('outputStar=' + outputStar.toString());

  //播放抽卡动画
  if (outputStar.indexOf(4) != -1) { document.getElementById("cg").src = './res/cg4.mp4'; console.log("存在星级4"); };
  if (outputStar.indexOf(5) != -1) { document.getElementById("cg").src = './res/cg5.mp4'; console.log("存在星级5"); };
  document.getElementById("cg").loop = false;
  document.getElementById('main').className = 'mainDisabled';
  document.getElementById('cgFrame').className = 'cgFrame';
  document.getElementById("cg").play();
  if (document.getElementById("skip").checked == true) { cgEnded(); };
  if (document.getElementById("skip").checked == true) { setCookie("skip_enabled", "true"); } else { setCookie("skip_enabled", "false"); };
};
function startSingle() {//「祈愿1次」按钮点击
  console.log('start wishing');
  output = []; outputStar = [];
  //生成抽卡结果
  var step = range(0, name.length - 1);
  output.push(name[step]);
  if (star[step] <= 3) { outputStar.push(3); };
  if (star[step] == 4) { outputStar.push(4); };
  if (star[step] >= 5) { outputStar.push(5); };
  console.log('output=' + output.toString()); console.log('outputStar=' + outputStar.toString());

  //播放抽卡动画
  single = true;
  if (outputStar.indexOf(4) != -1) { document.getElementById("cg").src = './res/cg4.mp4'; console.log("存在星级4"); };
  if (outputStar.indexOf(5) != -1) { document.getElementById("cg").src = './res/cg5.mp4'; console.log("存在星级5"); };
  document.getElementById("cg").loop = false;
  document.getElementById('main').className = 'mainDisabled';
  document.getElementById('cgFrame').className = 'cgFrame';
  document.getElementById("cg").play();
  if (document.getElementById("skip").checked == true) { cgEnded(); };
  if (document.getElementById("skip").checked == true) { setCookie("skip_enabled", "true"); } else { setCookie("skip_enabled", "false"); };
};
function cgEnded() {//cg播放完成回调
  document.getElementById("cg").pause();
  document.getElementById('cgFrame').className = 'cgFrameDisabled';
  if (single == true) {
    document.getElementById('resultSingle').className = 'result';
    nextSingle();
  } else {
    document.getElementById('result').className = 'result';
    document.getElementById('result').setAttribute("onclick", "next()");
    next();
  };
  //播放背景音乐（自动进度归0）
  document.getElementById('resultBgm').currentTime = 0;
  document.getElementById('result').setAttribute("loop", "");
  document.getElementById('resultBgm').play();
};
function nextSingle() {//抽卡结果逐个展示-下一个
  console.log('祈愿1次展示');
  now++;
  if (now >= 1) { console.log('展示完毕，进入total'); total(); return; }; console.log('展示下一个 now=' + now + '  output[now]=' + output[now] + '  outputStar[now]=' + outputStar[now]);
  document.getElementById('resultSingle').setAttribute("onclick", "nextBan()");
  document.getElementById('nowNameSingle').innerHTML = output[now];
  if (outputStar[now] == 3) {
    document.getElementById('fourSingle').setAttribute("style", "display:none;");
    document.getElementById('fiveSingle').setAttribute("style", "display:none;");
    console.log('3 Star Result');
  };
  if (outputStar[now] == 4) {
    document.getElementById('fourSingle').setAttribute("style", "/*DISPLAY NONE DISABLED*/");
    document.getElementById('fiveSingle').setAttribute("style", "display:none;");
    console.log('4 Star Result');
  };
  if (outputStar[now] == 5) {
    document.getElementById('fourSingle').setAttribute("style", "/*DISPLAY NONE DISABLED*/");
    document.getElementById('fiveSingle').setAttribute("style", "/*DISPLAY NONE DISABLED*/");
    console.log('5 Star Result');
  };
  document.getElementById('labelSingle').setAttribute("class", "label");
  document.getElementById('labelSingle').setAttribute("class", "label-frame");
  document.getElementById('starDivSingle').setAttribute("class", "starLevel");
  document.getElementById('starDivSingle').setAttribute("class", "starLevel-frame");
  document.getElementById('nowNameSingle').setAttribute("class", "p-hiding");
  document.getElementById('ringSingle').currentTime = 0;
  document.getElementById('ringSingle').play();
  sleep(1000).then(() => {
    document.getElementById('nowNameSingle').setAttribute("class", "p-showing");
    document.getElementById('resultSingle').setAttribute("onclick", "resultSingleReturn()");
  });
  sleep(1000).then(() => {
    document.getElementById('starDivSingle').setAttribute("class", "starLevel-end");
    document.getElementById('labelSingle').setAttribute("class", "label-end");
  });
};
function next() {//抽卡结果逐个展示-下一个
  console.log('祈愿10次展示下一个');
  now++;
  if (now >= 10) { console.log('展示完毕，进入total'); total(); return; }; console.log('展示下一个 now=' + now + '  output[now]=' + output[now] + '  outputStar[now]=' + outputStar[now]);
  document.getElementById('result').setAttribute("onclick", "nextBan()");
  document.getElementById('nowName').innerHTML = output[now];
  if (outputStar[now] == 3) {
    document.getElementById('four').setAttribute("style", "display:none;");
    document.getElementById('five').setAttribute("style", "display:none;");
    console.log('3 Star Result');
  };
  if (outputStar[now] == 4) {
    document.getElementById('four').setAttribute("style", "/*DISPLAY NONE DISABLED*/");
    document.getElementById('five').setAttribute("style", "display:none;");
    console.log('4 Star Result');
  };
  if (outputStar[now] == 5) {
    document.getElementById('four').setAttribute("style", "/*DISPLAY NONE DISABLED*/");
    document.getElementById('five').setAttribute("style", "/*DISPLAY NONE DISABLED*/");
    console.log('5 Star Result');
  };
  document.getElementById('label').setAttribute("class", "label");
  document.getElementById('label').setAttribute("class", "label-frame");
  document.getElementById('starDiv').setAttribute("class", "starLevel");
  document.getElementById('starDiv').setAttribute("class", "starLevel-frame");
  document.getElementById('nowName').setAttribute("class", "p-hiding");
  document.getElementById('ring').currentTime = 0;
  document.getElementById('ring').play();
  sleep(1000).then(() => {
    document.getElementById('nowName').setAttribute("class", "p-showing");
    document.getElementById('result').setAttribute("onclick", "next()");
  });
  sleep(1000).then(() => {
    document.getElementById('starDiv').setAttribute("class", "starLevel-end");
    document.getElementById('label').setAttribute("class", "label-end");
  });
};
function nextBan() { console.log('E06:动画中不能下一个 now=' + now); return; };//抽卡结果下一个（动画中直接返回）
function total() {//抽卡结果顺序展示完毕，展示全部
  for (i = 1; i < 11; i++) {
    let fp = document.getElementById('fp' + i); let f = document.getElementById('f' + i); let fs4 = document.getElementById('Ffour' + i); let fs5 = document.getElementById('Ffive' + i);
    fp.innerHTML = output[i - 1];
    if (outputStar[i - 1] == 3) { f.setAttribute("style", "/* Outline Disabled */"); fs4.setAttribute("style", "display:none;"); fs5.setAttribute("style", "display:none;"); };
    if (outputStar[i - 1] == 4) { f.setAttribute("style", fourOutline); fs4.setAttribute("style", "/**/"); fs5.setAttribute("style", "display:none;"); };
    if (outputStar[i - 1] == 5) { f.setAttribute("style", fiveOutline); fs4.setAttribute("style", "/**/"); fs5.setAttribute("style", "/**/"); };
    if (output.length == 11) { break; };
  };
  document.getElementById('result').className = 'resultDisabled';
  document.getElementById('total').className = 'total';
};
function total_back() {//返回抽卡界面
  document.getElementById('main').className = 'main';
  document.getElementById('total').className = 'totalDisabled';
  document.getElementById('resultBgm').pause();
  location.reload();
};
function resultSingleReturn() {//单抽返回主界面
  document.getElementById('main').className = 'main';
  document.getElementById('resultSingle').className = 'resultDisabled';
  document.getElementById('resultBgm').pause();
  location.reload();
};
function configLoaded() {//list.js加载完毕回调
  if (version <= CurrentVersion) { console.log('成功加载list.js  version=' + version + '  最高支持version=' + CurrentVersion); } else { console.log('list.js加载成功，但是版本过高  version=' + version + '  最高支持version=' + CurrentVersion); };
};
function configSpawn() {//跳转到config-spawn.html
  var hidden_a = document.createElement('a'); 
  // DIY_config-spawn.html地址修改 ↓
  var csurl="./config-spawn.html";
  if (ThirdList==true) {hidden_a.setAttribute('href', csurl+'?list='+getQueryString("list"));} else {hidden_a.setAttribute('href', csurl);};
  hidden_a.setAttribute('target', "_blank"); 
  document.body.appendChild(hidden_a); hidden_a.click();
  hidden_a.remove();return;
};

//定义部分常量
const fourOutline = "-webkit-box-shadow: 0 0 1.65861rem .04252845rem #7636ff, inset 0 0 .55287rem .085057rem rgba(228, 194, 255, .7)\;box-shadow: 0 0 1.65861rem .04252845rem #7636ff, inset 0 0 .55287rem .085057rem rgba(228, 194, 255, .7)\;border: .02126425rem solid #fff\;    -webkit-box-shadow: 0 0 .55287rem -.085057rem #c2a6ff, inset 0 0 .51034rem .04252845rem rgba(219, 173, 255, .6)\;box-shadow: 0 0 .55287rem -.085057rem #c2a6ff, inset 0 0 .51034rem .04252845rem rgba(219, 173, 255, .6)\;";
const fiveOutline = "-webkit-box-shadow: 0 0 1.65861rem .04252845rem #eec556, inset 0 0 .51034rem .04252845rem #fbb35a\;box-shadow: 0 0 1.65861rem .04252845rem #eec556, inset 0 0 .51034rem .04252845rem #fbb35a\;border: .02126425rem solid #fff\;-webkit-box-shadow: 0 0 .55287rem -.085057rem #eec556, inset 0 0 .51034rem .04252845rem #fbb35a\;box-shadow: 0 0 .55287rem -.085057rem #eec556, inset 0 0 .51034rem .04252845rem #fbb35a\;";
//声明变量
var output = []; var outputStar = []; var now = -1; var single = false;
// 监听ended事件并注册回调
document.getElementById("cg").addEventListener("ended", (event) => { cgEnded(); });
//背景音乐单曲循环（Event方法）（事实上loop和Event同时生效了）
document.getElementById("resultBgm").addEventListener("ended", (event) => { document.getElementById('resultBgm').currentTime = 0; document.getElementById('resultBgm').play(); });
//加载list.js
var ThirdList=false;
if (getQueryString('list') == null) {
  let listJsElement = document.createElement("script");
  listJsElement.setAttribute("type", "text/javascript");
  listJsElement.setAttribute("src", './list.js');
  document.body.appendChild(listJsElement);
  console.log('未找到三方list.js');
} else {
  let listJsElement = document.createElement("script");
  listJsElement.setAttribute("type", "text/javascript");
  listJsElement.setAttribute("src", getQueryString('list'));
  document.body.appendChild(listJsElement);
  document.getElementById('listJs').setAttribute("src", getQueryString('list'));
  console.log('找到三方list.js  src=' + getQueryString('list'));var ThirdList=true;
};
// 禁止选择文本（本来可以换更加隐蔽的写法，但是尊重下用反防止复制插件的人）
function noSelect() { return false; };
// 检查javascript是否启用（未启用则主main不会显示，而是弹出提示）
document.getElementById("main").setAttribute("class", "main"); document.getElementById("noscript").setAttribute("style", "display:none;");
// Debug CMDline
if (getQueryString('debug') == 'r') { console.log('调试参数：r()'); r(); };
if (getQueryString('lowUsage') == 'enabled') { lowUsage() };
// 「跳过动画」勾选状态存续
if (getCookie("skip_enabled") == "true") { document.getElementById("skip").checked = true; };
if (getCookie("skip_enabled") == null) { setCookie("skip_enabled", "false"); };
document.getElementById("skip").addEventListener("input", function () {if (document.getElementById("skip").checked == true) { setCookie("skip_enabled", "true"); } else { setCookie("skip_enabled", "false"); };});
console.log('主函数加载成功'); console.log("Copyright (C) 2024 kdxiaoyi. All right reserved.");