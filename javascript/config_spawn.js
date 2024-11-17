  //模块:文本行操作
String.prototype.lines = function() { return this.split(/\r*\n/); };String.prototype.lineCount = function() { return this.lines().length; };
//定义变量
const namesE=document.getElementById('names');
const starsE=document.getElementById('stars');
const outE=document.getElementById('output');
const state=document.getElementById("state");
var names=namesE.value;
var stars=namesE.value;
function getQueryString(name) {let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");let r = window.location.search.substr(1).match(reg);if (r != null) {return unescape(r[2]);};return null;};
function refreshResult() {//动态刷新状态栏
  document.getElementById("doneTip").setAttribute("style","display:none;");
  document.getElementById("errorTip").setAttribute("style","display:none;");
  var names=namesE.value;
  var stars=starsE.value;
  if (names.lineCount() == stars.lineCount()) {state.innerHTML="共计姓名"+names.lineCount()+"个 ＝ 共计星级"+stars.lineCount()+"个"} 
  else {state.innerHTML="共计姓名"+names.lineCount()+"个 ≠ 共计星级"+stars.lineCount()+"个"};
  namesE.style.height = "inherit";namesE.style.height = `${namesE.scrollHeight+10}px`;
  starF= namesE.style.height / names.lineCount() ;
  starsE.setAttribute("style",`font-weight: `+starF+`px;`+`height: ${namesE.style.height};`);
};
function spawn() {//生成配置文件
  outE.value="";refreshResult();
  namesE.value=namesE.value.replace(/[\[\]\(\)\{\"\}\;\:\|\,]/g, '');  
  starsE.value=starsE.value.replace(/[^0123456789\n]/g, '');  
  var n=namesE.value.lines();var s=starsE.value.lines();
  if (n.length != s.length) {document.getElementById("errorTip").innerHTML="× 请确保姓名与星级一一对应";document.getElementById("errorTip").setAttribute("style","background:#f47a7aae;margin: .3rem 0 0 0;");return;};
  outE.value += "const name=[";for (i = 0; i < (n.length-1); i++) {outE.value += "\""+n[i]+"\"\,";};outE.value += "\""+n[n.length-1]+"\"]\;\r";
  outE.value += "const star=[";
  for (i = 0; i < (s.length-1); i++) {
    if (Number(s[i]) <= 3) {outE.value += "3\,";};
    if (Number(s[i]) == 4) {outE.value += "4\,";};
    if (Number(s[i]) >= 5) {outE.value += "5\,";};
  };
  if (Number(s[s.length-1]) <= 3) {outE.value += "3]\;";};
  if (Number(s[s.length-1]) == 4) {outE.value += "4]\;";};
  if (Number(s[s.length-1]) >= 5) {outE.value += "5]\;";};outE.value += "\r";
  outE.value += `const version=2;`;outE.value += "\r";
  outE.value += `//配置文件编辑器：`;outE.value += "\r";
  outE.value += `// https://kdxhub.github.io/random_name_picker/comfig-spawn.html`;outE.value += "\r";
  outE.value += `// 根目录下config-spawn.html`;outE.value += "\r";
  outE.value += `function DisableStart(Reazon){document.getElementById('main-loadedList').innerHTML=Reazon;document.getElementById('start').disabled=true;document.getElementById('startButtonTips').innerHTML="引擎故障…";document.getElementById('startGuidancePrompt').innerHTML="请联系管理员/电教委以获取支持"};console.log("name长度="+name.length);console.log("star长度="+star.length);document.getElementById('main-loadedList').innerHTML="共计"+name.length+"名幸运儿，抽取概率均等";if(star.length!=name.length){DisableStart("E04.部署错误。数组「name」与「star」长度不等。")};if(star.length<=10){DisableStart("E05.部署错误。待选项太少（"+star.length+"项）<br>至少需要11项。")};configLoaded();`;
  outE.focus();outE.select();
  var hidden_a = document.createElement('a'); 
  hidden_a.setAttribute('href', 'data:text/plain;base64,'+window.btoa(unescape(encodeURIComponent(outE.value))));
  hidden_a.setAttribute('download', "list.js"); 
  document.body.appendChild(hidden_a); hidden_a.click();
  hidden_a.remove();
  document.getElementById("doneTip").setAttribute("style","background:#98f6b798;margin: .3rem 0 0 0;");return;
};
function clearT() {//清空区域
  if (confirm('确认要清空编辑区吗？\n该操作无法撤销')) {namesE.value="";starsE.value="";};refreshResult();return;
};
//变量初始化
var starF=1;
//textarea自适应高度
namesE.addEventListener("input",function(){refreshResult();});
starsE.addEventListener("input",function(){refreshResult();});
outE.addEventListener("select", function() {this.style.height = "inherit";this.style.height = `${this.scrollHeight}px`;refreshResult();});
//加载list.js
function configLoaded() {//list.js加载完毕回调
  namesE.value="";starsE.value="";
  for (i=0;i< (name.length - 1);i++) {namesE.value += name[i]+"\n";};
  for (i=0;i< (star.length - 1);i++) {starsE.value += star[i]+"\n";};
  namesE.value += name[name.length - 1];
  starsE.value += star[star.length - 1];
  refreshResult();
};
var listJsElement = document.createElement("script");
if (getQueryString('list') == null) {
  listJsElement.setAttribute("type", "text/javascript");
  listJsElement.setAttribute("src", './list.js');
  document.body.appendChild(listJsElement);
  console.log('未找到三方list.js');
} else {
  listJsElement.setAttribute("type", "text/javascript");
  listJsElement.setAttribute("src", getQueryString('list'));
  document.body.appendChild(listJsElement);
  document.getElementById('listJs').setAttribute("src", getQueryString('list'));
  console.log('找到三方list.js  src=' + getQueryString('list'));
};
//debug cmdLine
if (getQueryString('debug') != 1) {outE.setAttribute('style',"display:none;")};
//js加载成功则关闭提示
document.getElementById("errorTip").setAttribute("style","display:none;");
document.getElementById("noscript").setAttribute("style","display:none;");
//强制刷新一次布局
refreshResult();