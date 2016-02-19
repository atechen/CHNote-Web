// function fso(){
// 	var fso = new ActiveXObject('Scripting.FileSystemObject'); 
// 	// var fso = new FileSystemObject(); 
// 	var folderPath = './';
// 	var folder = fso.GetFolder(folderPath);
// 	var folderFileArr = folder.files;
// 	for (var i = 0; i < folderFileArr.length; i++) {
// 		var fileX = folderFileArr[i];
// 		// console.log('文件类型：'+fileX.type+'文件名称：'fileX.Name);
// 	};
// }

var structureJson = {
	"flolders":[
		{
			"folderName":"操作系统和网络原理",
			"files":[
				{
					"fileName":"Linux.html"
				}
			]
		},
		{
			"folderName":"iOS",
			"files":[
				{
					"fileName":"01OC语法.html"
				},
				{
					"fileName":"02UI界面.html"
				},
				{
					"fileName":"03Foundation.html"
				},
				{
					"fileName":"04数据持久化.html"
				},
				{
					"fileName":"05多线程.html"
				},
				{
					"fileName":"06网络请求.html"
				},
				{
					"fileName":"07Xcode.html"
				},
				{
					"fileName":"08多媒体.html"
				},
				{
					"fileName":"10App资源.html"
				},
				{
					"fileName":"13架构.html"
				}
			]
		},
		{
			"folderName":"Swift",
			"files":[
				{
					"fileName":"Swift.html"
				}
			]
		}

	]
}

/*
*  超链接点击事件
*/
var selecedMenuItem;
function itemClick(){
    var fileName = $(this).text();
    var floderName = $(this).parent().parent().parent().siblings("div").find("a").text(); 
    // var floderName = elementItem.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].text;
    $("iframe").attr("src", "./"+floderName+"/"+fileName);

    if (selecedMenuItem != null) {
    	selecedMenuItem.style.backgroundColor = "white";
    };
    this.style.backgroundColor = "#d8edf8";
    selecedMenuItem = this;
}

/*
 * 初始化节点
 */
function initStructure(){
	var flolderArr = structureJson["flolders"];
	for (var i = 0; i < flolderArr.length; i++) {
		var flolderX = flolderArr[i];
		createNoteGroup(flolderX, i);
	};

	console.log();
}

function createNoteGroup(noteGroupDic, index){
	var leftmenu = document.getElementById("leftMenu");
	var groupDiv = document.createElement("div"); 
	groupDiv.setAttribute("class", "panel panel-success"); 
	leftmenu.appendChild(groupDiv)

	createNoteHeader(groupDiv, noteGroupDic["folderName"], index);
	createNoteList(groupDiv, noteGroupDic["files"], index);
}

function createNoteHeader(groupDiv, title, index){
	var headerDiv = document.createElement("div"); 
	headerDiv.setAttribute("class", "panel-heading"); 
	groupDiv.appendChild(headerDiv);

	var h4Ele = document.createElement("h4");
	h4Ele.setAttribute("class", "panel-title");
	headerDiv.appendChild(h4Ele);

	var aEle = document.createElement("a");
	aEle.setAttribute("data-toggle", "collapse");
	aEle.setAttribute("data-parent", "#leftMenu");
	aEle.setAttribute("href", "#collapse"+index);
	aEle.innerHTML = title;
	h4Ele.appendChild(aEle);
}

function createNoteList(groupDiv, noteArr, index){

 	var noteListDiv = document.createElement("div"); 
 	noteListDiv.setAttribute("id", "collapse"+index); 
	noteListDiv.setAttribute("class", "panel-collapse collapse in"); 
	groupDiv.appendChild(noteListDiv);

	var ulEle = document.createElement("ul");
	ulEle.setAttribute("class", "nav menu-group panel-body");
	noteListDiv.appendChild(ulEle);

 	for (var i = 0; i < noteArr.length; i++) {
 		var liEle = document.createElement("li"); 
		ulEle.appendChild(liEle);

		var aEle = document.createElement("a");
		aEle.onclick = itemClick;
		var noteDic = noteArr[i];
		aEle.innerHTML = noteDic["fileName"];
		liEle.appendChild(aEle);
	};
}


// https://chrome.google.com/webstore/detail/activex-for-chrome/lgllffgicojgllpmdbemgglaponefajn/related

