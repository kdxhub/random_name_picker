function range(min,max) {return Math.round(Math.random()*(max-min)+min);};function getQueryString(name) {let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");let r = window.location.search.substr(1).match(reg);if (r != null) {return unescape(r[2]);};return null;};
function hide(id) {document.getElementById(id).className=(document.getElementById(id).className+'Disabled')};
function unhide(id) {document.getElementById(id).className=id};
function start() {//「祈愿10次」按钮点击
  console.log('start wishing')
  //生成抽卡结果
  var output = [];var outputStar = [];
  for (i = 0; i < 10; i++) { 
    step = range(0,name.length - 1);
    if ( output.indexOf(step) != -1 ) {console.log(string(i--) + '重复随机值' + step);continue;};
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
  hide('cgFrame');unhide('result');
};

// 监听ended事件并注册回调
document.getElementById("cg").addEventListener("ended", (event) => {cgEnded();});
console.log('Main function loaded.');