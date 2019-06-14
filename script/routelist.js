var list;
var table;
var modal;
var materials;
var kommunObject;
var kommunArray;


var csvToArray = function(strData){
  let strDelimiter = ",";
  let objPattern = new RegExp(
    (
    "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
    "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
    "([^\\" + strDelimiter + "\\r\\n]*))"
    ),
    "gi"
    );
    let arrData = [];
    let arrMatches = null;
    while (arrMatches = objPattern.exec( strData )){
      let strMatchedDelimiter = arrMatches[ 1 ];
      if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter){
        //arrData.push( [] );
      }
      let strMatchedValue;
      if (arrMatches[ 2 ]){
        strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");
      } else {
        strMatchedValue = arrMatches[ 3 ];
      }
      if(strMatchedValue !== "")
      arrData.push( strMatchedValue );
    }
  return( arrData );
}

var parseFile = function(content, contentType){
  switch (contentType) {
    case "materials": materials = csvToArray(content);
      console.log(materials);
      break;
      case "kommunArray":kommunArray = JSON.parse(content);
      break;
      case "kommunObject":kommunObject = JSON.parse(content);
    default: return null;
  }
}

var loadTxt = function(url,contentType){
  let file = new XMLHttpRequest();
  file.open("GET",url,true);
  if(file.readyState === 1)file.send();
  file.onreadystatechange = function () {
    if(file.readyState === 4){
      if(file.status === 200 || file.status == 0){
        parseFile(file.responseText, contentType);
        //console.log(file.responseText);
      }
    }
  }
}

var makeTable = function () {
  console.log("makeTable");
  let t = document.createElement('table');
  t.setAttribute('id','listTable');
  document.getElementById('listDiv').appendChild(t);
  return t;
}

var clearTable = function () {
  console.log("clearing table...");
  document.getElementById("listDiv").innerHTML = "";
  table = makeTable();
}

var addKommunerToModal = function(parent){
  for(let i = 0; i<kommunArray.length; i++){
    let kDiv = document.createElement("DIV");
    let text = document.createTextNode(kommunArray[i].name);
    let cBox = document.createElement("INPUT");
    cBox.setAttribute("type","checkbox");
    kDiv.appendChild(cBox);
    kDiv.appendChild(text);
    parent.appendChild(kDiv);
  }
}

var addMaterialsToModal = function(parent){
  for(let i = 0; i<materials.length; i++){
    let matDiv = document.createElement("DIV");
    let text = document.createTextNode(materials[i]);
    let cBox = document.createElement("INPUT");
    cBox.setAttribute("type","checkbox");
    matDiv.setAttribute("onclick":)
    matDiv.appendChild(cBox);
    matDiv.appendChild(text);
    parent.appendChild(matDiv);
  }
}

var clickAddRoute = function (){
  console.log("clicked Add route.");
  let modalDivs = document.getElementsByClassName("modal-div");
  console.log(modalDivs);
  addMaterialsToModal(modalDivs[0]);
  addKommunerToModal(modalDivs[1]);
  modal.style.display = "block";
}

var closeModal = function(){
  console.log("clicket close modal.");
  modal.style.display = "none";
}

var onready = function(){
  console.log("onload.");
  modal = document.getElementById("myModal");
  loadTxt("/../resource/fraktioner.csv","materials");
  loadTxt("/../resource/kommunerArray.json","kommunArray");
  loadTxt("/../resource/kommunerObject.json","kommunObject")
}
