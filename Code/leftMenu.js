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


/*
*  超链接点击事件
*/
var selecedMenuItem;

function itemClick(){
    var fileName = $(this).text();
    var floderName = $(this).parent().parent().parent().siblings("div").find("a").text(); 
// var floderName = elementItem.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].text;
// $("iframe").attr("src", "./"+floderName+"/"+fileName);

    if (selecedMenuItem != null) {
    	selecedMenuItem.style.backgroundColor = "white";
    };
    this.style.backgroundColor = "#d8edf8";
    selecedMenuItem = this;

    createContentScript(floderName, fileName);
    
}
// 创建当前点击链接的js
function createContentScript(floderName, fileName){

	var itemSrcScriptEle = document.getElementById("itemSrcScriptID");
	var headEle = document.getElementsByTagName("head")[0];
	if (itemSrcScriptEle != null) {
		headEle.removeChild(itemSrcScriptEle);
	};

	var newScriptEle = document.createElement("script"); 
	var jsFilePath = "./"+floderName+"/"+fileName;
	newScriptEle.setAttribute("src", jsFilePath); 
	newScriptEle.setAttribute("id", "itemSrcScriptID");
	headEle.appendChild(newScriptEle);
	newScriptEle.onload = newScriptEle.onreadystatechange = function() { 
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) { 
			initContent();
			// Handle memory leak in IE 
			newScriptEle.onload = newScriptEle.onreadystatechange = null; 
		}
	};
}
// 初始化当前选择内容
function initContent(){
	createContentList("articleContent", contentJson["article"]);
	createContentList("gitHubContent", contentJson["gitHub"]);
}
function createContentList(parentEleID, contentList){
	var parenetEle = document.getElementById(parentEleID);

	//删除所有子节点
    while(parenetEle.hasChildNodes()) 
    {
        parenetEle.removeChild(parenetEle.firstChild);
    }
    
    // 添加子节点
	for (var i = 0; i < contentList.length; i++) {
		var liEle = document.createElement("li");
		parenetEle.appendChild(liEle);

		var aEle = document.createElement("a");
		var aDic = contentList[i];
		aEle.setAttribute("href", aDic["url"]);
		aEle.innerHTML = aDic["title"];
		liEle.appendChild(aEle);
	}
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
}

function createNoteGroup(noteGroupDic, groupIndex){
	var leftmenu = document.getElementById("leftMenu");
	var groupDiv = document.createElement("div"); 
	groupDiv.setAttribute("class", "panel panel-success"); 
	leftmenu.appendChild(groupDiv);

	var groupName = noteGroupDic["folderName"];
	createNoteHeader(groupDiv, groupName, groupIndex);
	createNoteList(groupName, groupDiv, noteGroupDic["files"], groupIndex);
}

function createNoteHeader(parentDiv, groupName, groupIndex){
	var headerDiv = document.createElement("div"); 
	headerDiv.setAttribute("class", "panel-heading"); 
	parentDiv.appendChild(headerDiv);

	var h4Ele = document.createElement("h4");
	h4Ele.setAttribute("class", "panel-title");
	headerDiv.appendChild(h4Ele);

	var aEle = document.createElement("a");
	aEle.setAttribute("data-toggle", "collapse");
	aEle.setAttribute("data-parent", "#leftMenu");
	aEle.setAttribute("href", "#collapse"+groupIndex);
	aEle.innerHTML = groupName;
	h4Ele.appendChild(aEle);
}

function createNoteList(groupName, parentDiv, noteArr, groupIndex){

 	var noteListDiv = document.createElement("div"); 
 	noteListDiv.setAttribute("id", "collapse"+groupIndex); 
	noteListDiv.setAttribute("class", "panel-collapse collapse in"); 
	parentDiv.appendChild(noteListDiv);

	var ulEle = document.createElement("ul");
	ulEle.setAttribute("class", "nav menu-group panel-body");
	noteListDiv.appendChild(ulEle);

 	for (var i = 0; i < noteArr.length; i++) {
 		var noteDic = noteArr[i];
 		var fileName = noteDic["fileName"];
 		// 添加script节点
 		// createContentScript(groupName, fileName);
 		// 添加<li>节点
 		var liEle = document.createElement("li"); 
		ulEle.appendChild(liEle);
		// 添加<a>节点
		var aEle = document.createElement("a");
		aEle.onclick = itemClick;
		aEle.innerHTML = fileName;
		liEle.appendChild(aEle);
	};
}


// https://chrome.google.com/webstore/detail/activex-for-chrome/lgllffgicojgllpmdbemgglaponefajn/related

