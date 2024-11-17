var nameHistory = {list: null,resetProcessId: 0,};
nameHistory["append"] = function(goal) {
  nameHistory.list.unshift(goal);
  nameHistory.list.pop();
  setCookie("nameHistory",nameHistory.list.join(","),365000);
  console.log("更新nameHistory.list",nameHistory.list)
  return nameHistory.list;
};
nameHistory["reset"] = function() {
  nameHistory.list=[,,,,,,,,,,];
  setCookie("nameHistory",nameHistory.list.join(","),365000);
  console.warn("重置nameHistory.list",nameHistory.list)
  return nameHistory.list;
};
nameHistory["ClearResetBtnStatusResetting"] = function() {
  if (nameHistory.resetProcessId != -1) {clearTimeout(nameHistory.resetProcessId);};
  nameHistory.resetProcessId=-1;
};
nameHistory["init"] = function() {
  if (!getCookie("nameHistory")) {setCookie("nameHistory",",,,,,,,,,",365000);};
  nameHistory.list = getCookie("nameHistory")./*防止cookie被点炒饭*/replace(/[^\d,]+/,"").split(",",10);
  if ((!nameHistory.list) || (nameHistory.list.length != 10)) {
    setCookie("nameHistory",",,,,,,,,,",365000);
    nameHistory.list = [,,,,,,,,,];
    console.warn("Cookie损坏，正在初始化nameHistory.list="+nameHistory.list);
  };
  console.log(`nameHistory.list=`,nameHistory.list);
  return nameHistory.list;
};
nameHistory["check"] = function(reinitAfterFailed) {
  let _CheckResult=false;
  nameHistory.list = nameHistory.list.map(function(element) {return element.replace(/[^\d]/,"")});
  if (nameHistory.list.length == 10) {_CheckResult=true;};
  if (_CheckResult) {return true;};
  console.error(`nameHistory 已损坏\n`,nameHistory.list);
  if (reinitAfterFailed) {nameHistory.init();};
  return false;
};
function msg(Message, ConfirmText, isWarning) {let infoJson={};infoJson.root=document.querySelector('s-page');infoJson.text=Message;if (ConfirmText==undefined) {infoJson.action="";} else {infoJson.action=ConfirmText;};if (isWarning!=undefined) {infoJson.type="error";};customElements.get('s-snackbar').show(infoJson);console.log("创建了新的Snakbar\n",infoJson);return infoJson;};
function setCookie(cname, cvalue, exdays) { var d = new Date(); d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); var expires = "expires=" + d.toGMTString(); document.cookie = cname + "=" + cvalue + "; " + expires }; function getCookie(cname) { var name = cname + "="; var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i].trim(); if (c.indexOf(name) == 0) return c.substring(name.length, c.length) }; return null };//cookies操作模块
function range(min, max) { return Math.round(Math.random() * (max - min) + min); }; function getQueryString(name) { let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); let r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]); }; return null; }; function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }; function removeElement(ElementId) { document.getElementById(ElementId).remove(); };//加载一些通用模块
const iconBtnStatus=["filled","filled-tonal","outlined",""];

//cookie载入
nameHistory.init();nameHistory.check(true);

//切换侧栏按钮点击
const history_display=document.getElementById("history_display");
const sidebar/*抽屉边栏总框架元素*/=document.getElementById("sidebar");
document.getElementById("sidebar_toggle_btn").addEventListener("click",()=>{
  window.getSelection().removeAllRanges();
  history_display.innerHTML=`最近抽出的幸运儿不会被重复抽出：<br>${nameHistory.list.map(function(element) {
    return name[element];
  }).join("<br>")}`;
  resetHistoryBtn.style = "";
  sidebar.toggle();
});

//侧栏清除历史记录点击
const resetHistoryBtn=document.getElementById("resetHistoryBtn");
resetHistoryBtn.addEventListener("click",()=>{
  if (resetHistoryBtn.type != iconBtnStatus[2]) {
    /*再次点击时则重置历史记录*/
    nameHistory.reset();
    resetHistoryBtn.type = iconBtnStatus[2];
    nameHistory.ClearResetBtnStatusResetting();
    resetHistoryBtn.style = "display:none;";
    msg("✓ 已重置历史记录","好");
    history_display.innerHTML=`最近抽出的幸运儿不会被重复抽出：<br>${nameHistory.list.map(function(element) {
      return name[element];
    }).join("<br>")}`;
    return;
  };
  msg("再次点击以重置历史记录","好");
  resetHistoryBtn.type = iconBtnStatus[1];
  nameHistory.resetProcessId = setTimeout(()=>{resetHistoryBtn.type = iconBtnStatus[2];}, 5000);
});

//即动态重算s-drawer的高度
sidebar.style.height = `${document.body.scrollHeight-appbar.offsetHeight}px`;
window.addEventListener('resize',() => {/*当窗口大小改变时也要重算高度*/
  sidebar.style.height = `${document.body.scrollHeight-appbar.offsetHeight}px`;
});

//点击开始按钮后
const cooldown=document.getElementById("cooldown");
const startBtn=document.getElementById("start");
const start3Btn=document.getElementById("start3");
const start5Btn=document.getElementById("start5");
const resultDiv=document.getElementById("result");
var startBtnCooldownRefresh=-1;
function getNewName() {
  /*获取一个新的不重复名字编号*/
  let id=range(0,name.length-1);
  while (!(
    (nameHistory.list.indexOf(id) == -1)
    && (nameHistory.list.indexOf(id.toString()) == -1)
  )) {
    id=range(0,name.length-1);
    console.log(id,name[id])
  };
  nameHistory.append(id);
  history_display.innerHTML=`最近抽出的幸运儿不会被重复抽出：<br>${nameHistory.list.map(function(element) {
    return name[element];
  }).join("<br>")}`;
  return id;
};
function displayResult(text) {
  resultDiv.innerHTML = text;
  let fontSize = 150;
  resultDiv.style.fontSize = fontSize + 'px';
  while (true) {
    resultDiv.style.fontSize = fontSize + 'px';
    if (resultDiv.offsetWidth <= window.innerWidth) {
      break;
    } else {
      fontSize--;
    }
  }
};
window.addEventListener('resize', displayResult(resultDiv.innerHTML));
const contentScroll = document.getElementById("contentScroll");
function intoCooldown() {
  /*动画处理*/
  let toTop_interval_speed = -(contentScroll.scrollTop/(200));
  let toTop_intervalID = setInterval(() => {
    contentScroll.scrollBy(0,toTop_interval_speed);
    if (contentScroll.scrollTop == 0) {clearInterval(toTop_intervalID);};
  }, 1);
  startBtn.disabled="true";
  start3Btn.disabled="true";
  start5Btn.disabled="true";
  cooldown.value=cooldown.max;
  cooldown.style.visibility="";
  startBtnCooldownRefresh=setInterval(()=>{
    cooldown.value-=3;
    if (cooldown.value <= 1) {
      startBtn.disabled="false";
      start3Btn.disabled="false";
      start5Btn.disabled="false";
      cooldown.style.visibility="hidden"
      clearInterval(startBtnCooldownRefresh);
    };
  },1)
};
startBtn.addEventListener("click",()=>{
  let goal=getNewName();
  displayResult(name[goal]);
  intoCooldown();
  console.log("单抽结果：[",goal,"] ",name[goal]);
});
start3Btn.addEventListener("click",()=>{
  let goal=[getNewName(),getNewName(),getNewName()];
  displayResult(goal.map(function(element) {return name[element];}).join("<br>"));
  intoCooldown();
  console.log("三抽结果：[",goal,"] ",goal.map(function(element) {return name[element];}).join(" ‖ "));
});
start5Btn.addEventListener("click",()=>{
  let goal=[getNewName(),getNewName(),getNewName(),getNewName(),getNewName()];
  displayResult(goal.map(function(element) {return name[element];}).join("<br>"));
  intoCooldown();
  console.log("五抽结果：[",goal,"] ",goal.map(function(element) {return name[element];}).join(" ‖ "));
});

//加载完毕，删除js提示
document.getElementById("no_script").remove();