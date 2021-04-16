const debug = 0;
var b, onMobile;
const space = "&nbsp";

// checks if the webpage is open on mobile
isOnMobile();

//onLoad() loads after body
function onLoad() {
  createTable();
  getJsonData();
  setOnClick();
}

// checks if the webpage is open on mobile
function isOnMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    onMobile = true;
  }
}

// DONT FORGET TO REMOVE
onMobile = false;
//function for getting json data from Periodic-Table-JSON and setting values inside boxes
function getJsonData(infId, onClick) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      //does not set box text if debug is on
      if (!debug) {
        //setting values inside boxes from json
        if (!onClick) {
          for (let i = 1; i < 104; i++) {
            let box = document.getElementById('b' + i);
            //sets number symbol and atomic mass
            box.innerHTML = '<span class="number">' + jsonData.elements[i - 1].number + '</span><br><span class="symbol">' + jsonData.elements[i - 1].symbol + '</span><br><span class="mass">' + jsonData.elements[i - 1].atomic_mass.toFixed(3) + '</span>';
          }
        } else if (onClick) {

          //IDEA!!  make this section a function called show info and use it for mobile and desktop so it doesnt repeat two times
          //add a checkbox on desktop to include more info which is default on mobile
          //add at info-window on mobile
          showInfo(infId, jsonData);
        }
      }
    }
  };
  //json link
  xhttp.open("GET", "https://sasho184.github.io/Periodic-Table-JSON/PeriodicTableJSON.json", true);
  xhttp.send();
}

function showInfo(infId, jsonData){
  if(onMobile){
    // Show info on the screen if on mobile
  }else{
    // Shows info on center of the table if on desktop
    let box = document.getElementById(infId);
    infId = infId.substr(4) - 1;
    let infoText = document.createElement("div");
    infoText.className = "infoText";
    let name = jsonData.elements[infId].name;
    //!!REMAKE THIS PART WITHOUT USING &nbsp space=&nbsp
    let atomicMass = `Atomic Mass: ${space.repeat(9)}${jsonData.elements[infId].atomic_mass.toFixed(3)}`;
    let shells = `Shells: ${space.repeat(22)}${jsonData.elements[infId].shells}`;
    
    let wikiLink = jsonData.elements[infId].source;
    let wikiButton = `<div class = 'wikiLink'><a target='_blank' rel='noopener noreferrer' href='${wikiLink}'>Open In Wikipedia</a></div>`;
    
    infoText.innerHTML = `${name}<br>${atomicMass}<br>${shells}<br>${wikiButton}`;
    //infoText.innerHTML = name + '<br>' + atomicMass + '<br>' + shells + '<br>' + wikiButton;
    //infoText.appendChild(wikiButton);

    console.log(infId);
    box.innerHTML = `<span class="number">${jsonData.elements[infId].number}</span><br><span class="symbol">${jsonData.elements[infId].symbol}</span><br><span class="mass">${jsonData.elements[infId].atomic_mass.toFixed(3)}</span>`;
    document.getElementById("scr").appendChild(infoText);
  }
}

//sets click event on all boxes

function setOnClick(){
  document.getElementById('table').addEventListener("click", reply_click);
}

//launches on click of a box
function reply_click(e) {
  let eventTarget = e.target;

  if(e.target.parentElement.classList.contains('box')){
    eventTarget = e.target.parentElement;
  }
  
  if(eventTarget.classList.contains('box')){
    let boxId = eventTarget.id;
    let infId = "inf" + boxId;
    let infoScreen = document.getElementById("scr");
    //resets info screen
    infoScreen.innerHTML = "";
    //places corresponding box on infoScreen
    let infoBox = document.createElement("div");
    infoBox.className = "infoBox " + boxId;
    infoBox.id = infId;
    infoScreen.appendChild(infoBox);
    getJsonData(infId, true);
  }
}

//function for appending boxes
function addBoxes() {
  let item = document.createElement("div");
  item.className = "grid-item";
  let box = document.createElement("div");
  box.className = "box b" + b;
  box.id = "b" + b;
  //adds number for debugging if true
  if (debug == 1) {
    let textnode = document.createTextNode(b);
    box.appendChild(textnode);
  }
  item.appendChild(box);
  table.appendChild(item);
}

function addEmptyBox(numAfter, ammount, name, i) {
  if (i == numAfter) {
    for (let i = 0; i < ammount; i++) {
      let item = document.createElement("div");
      item.className = "empty grid-item " + name + i;
      let box = document.createElement("div");
      box.className = "EmptyBox " + name + i;
      if (debug != 1 && debug != 2) {
        if (name == "y1") {
          box.innerHTML = "*";
        } else if (name == "y2") {
          box.innerHTML = "**";
        }
      }
      if (name == "s") {
        box.id = "scr";
      }

      //adds number for debugging if true
      if (debug == 1) {
        let textnode = document.createTextNode(name + i);
        box.appendChild(textnode);
      }
      item.appendChild(box);
      table.appendChild(item);
    }
  }
}

//createTable() creates the main table
function createTable() {
  let table = document.getElementById('table');
  // function for appending empty rows
  // numAfter - after which box
  // ammount - ammount of boxes
  // name - class to be added
  
  for (var i = 1; i < 119; i++) {
    //append first empty row
    addEmptyBox(1, 18, "f", i);
    //b sets class number
    b = i;
    //sets the numbers for the last two rows (57) - (71) and (89) - (103)
    if (i >= 89 && i <= 103) {
      b = i - 32;
    } else if (i >= 104 && i <= 118) {
      b = i - 15;
    }
    //appends boxes
    addBoxes();
    //append empty row between hydrogen(1) and helium(2)
    addEmptyBox(1, 1, "x", i);
    addEmptyBox(1, 1, "s", i);
    addEmptyBox(1, 7, "x", i);
    //append empty row between (4) and (5)
    addEmptyBox(4, 2, "x", i);
    //append empty row between (12) and (13)
    addEmptyBox(12, 10, "x", i);
    //append empty box after (56)
    addEmptyBox(56, 1, "y1", i);
    //append empty box after (88)
    addEmptyBox(88, 1, "y2" ,i);
    //append empty box after (y1) and row after (88)
    addEmptyBox(88, 35, "x", i);
    addEmptyBox(88, 1, "y1", i);
    //appends last 3 empty boxes in front of (89)
    addEmptyBox(103, 2, "x", i);
    addEmptyBox(103, 1, "y2", i);
    //skips to (71) after (56) to create a gap
    if (i == 56) {
      i = 71;
    }
  }
}