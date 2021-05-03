const debug = 0;
let b, onMobile, tableData;
const space = "&nbsp";

// checks if the webpage is open on mobile
isOnMobile();

//onLoad() loads after body
function onLoad() {
  createTable();
  getTableData();
  setOnClick();
}

// checks if the webpage is open on mobile
function isOnMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    onMobile = true;
  }
}
// DONT FORGET TO REMOVE
// onMobile = false;

function getTableData() {
  if (localStorage.getItem('tableData') === null) {// If there is no data in LS we get it with ajax and save it to LS
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://sasho184.github.io/Periodic-Table-JSON/PeriodicTableJSON.json", true);
    xhr.onload = function () {
      if (this.status === 200) {
        tableData = JSON.parse(xhr.responseText);
        localStorage.setItem('tableData', JSON.stringify(tableData)); // If there is no data in LS we get it with ajax and save it to LS
        setBoxes(); // sets values in boxes
      }
    }
    xhr.onerror = function () {
      console.log('Request error...');
    }
    xhr.send();
  } else {// If there is data in LS we save it to tableData
    tableData = JSON.parse(localStorage.getItem('tableData'));
    setBoxes(); // sets values in boxes
  }
}

function setBoxes(debug) {
  if (!debug) {
    //setting values inside boxes from tableData
    for (let i = 1; i < 104; i++) {
      let box = document.getElementById('b' + i);
      //sets number symbol and atomic mass
      box.innerHTML = '<span class="number">' + tableData.elements[i - 1].number + '</span><br><span class="symbol">' + tableData.elements[i - 1].symbol + '</span><br><span class="mass">' + tableData.elements[i - 1].atomic_mass.toFixed(3) + '</span>';
    }
  }
}

// !!! Create a DOM object outside and just edit it for mobile and desktop instead of making a new one everytime !!!

function showInfo(boxId, infId, tableData) {
  if (onMobile) {
    // Show info on the screen if on mobile
    let mobileInfoScreen = document.createElement('div');
    mobileInfoScreen.classList.add('mobile-info-screen');
    let centerDiv = `<div class="center"></div>`;
    mobileInfoScreen.innerHTML = centerDiv;

    document.querySelector('body').appendChild(mobileInfoScreen);

    let infoBox = document.getElementById(boxId).cloneNode(true);
    infoBox.id = infId;
    infoBox.classList.remove('box');
    infoBox.classList.add('infoBox');
    

    infId = infId.substr(4) - 1;
    let infoText = document.createElement("div");
    infoText.className = "infoText";
    let atomicMass = `Atomic Mass: ${tableData.elements[infId].atomic_mass.toFixed(3)}`;
    let shells = `Shells: ${tableData.elements[infId].shells}`;

    let wikiLink = tableData.elements[infId].source;
    let wikiButton = `<div class='wikiLink'><a target='_blank' rel='noopener noreferrer' href='${wikiLink}'>Open In Wikipedia</a></div>`;

    infoText.innerHTML = `${name}<br>${atomicMass}<br>${shells}<br>${wikiButton}`;

    let closeBtn = document.createElement('div');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = 'Close';
    
    mobileInfoScreen.querySelector('.center').appendChild(infoBox);
    mobileInfoScreen.querySelector('.center').appendChild(infoText);
    mobileInfoScreen.querySelector('.center').appendChild(closeBtn);
    
    document.querySelector('.close').addEventListener('click', function(){
      document.querySelector('.mobile-info-screen').remove();
    });

  } else {
    const infoScreen = document.getElementById("scr");
    //resets info screen
    infoScreen.innerHTML = "";

    let infoBox = document.getElementById(boxId).cloneNode(true);
    infoBox.id = infId;
    infoBox.classList.remove('box');
    infoBox.classList.add('infoBox');
    // mobileInfoScreen.appendChild(infoBox);

    

    // Shows info on center of the table if on desktop
    infId = infId.substr(4) - 1;
    let infoText = document.createElement("div");
    infoText.className = "infoText";
    //!!REMAKE THIS PART WITHOUT USING &nbsp space=&nbsp
    let atomicMass = `Atomic Mass: ${space.repeat(5)}${tableData.elements[infId].atomic_mass.toFixed(3)}`;
    let shells = `Shells: ${space.repeat(18)}${tableData.elements[infId].shells}`;

    let wikiLink = tableData.elements[infId].source;
    let wikiButton = `<div class = 'wikiLink'><a target='_blank' rel='noopener noreferrer' href='${wikiLink}'>Open In Wikipedia</a></div>`;

    infoText.innerHTML = `${name}<br>${atomicMass}<br>${shells}<br>${wikiButton}`;

    infoScreen.appendChild(infoBox);
    document.getElementById("scr").appendChild(infoText);
  }
}

//sets click event on all boxes

function setOnClick() {
  document.getElementById('table').addEventListener("click", reply_click);
}

//launches on click of a box
function reply_click(e) {
  let eventTarget = e.target;

  if (e.target.parentElement.classList.contains('box')) {
    eventTarget = e.target.parentElement;
  }

  if (eventTarget.classList.contains('box')) {
    const boxId = eventTarget.id;
    const infId = "inf" + boxId;
    showInfo(boxId, infId, tableData);
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
    addEmptyBox(88, 1, "y2", i);
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