var debug = 0;
var b, onMobile;
// checks if the webpage is open on mobile
isOnMobile();
//onLoad() loads after body
function onLoad() {
  createTable();
  console.log("createTable() done");
  getJsonData();
  console.log("getJson() done");
  setOnClick();
  console.log("setOnClick() done");
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
function getJsonData(infId, one) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      //does not set box text if debug is on
      if (!debug) {
        //setting values inside boxes from json
        if (!one) {
          var i;
          for (i = 1; i < 104; i++) {
            var box = document.getElementById('b' + i);
            //sets number symbol and atomic mass
            box.innerHTML = '<span class="number">' + jsonData.elements[i - 1].number + '</span><br><span class="symbol">' + jsonData.elements[i - 1].symbol + '</span><br><span class="mass">' + jsonData.elements[i - 1].atomic_mass.toFixed(3) + '</span>';
          }
        } else {
          //sets info on info screen
          var box = document.getElementById(infId);
          infId = infId.substr(4) - 1;
          var infoText = document.createElement("div");
          infoText.className = "infoText";
          var name = jsonData.elements[infId].name;
          var atomicMass = "Atomic Mass: "+ jsonData.elements[infId].atomic_mass.toFixed(3);
          var shells = "Shells: "+ jsonData.elements[infId].shells;

          infoText.innerHTML = name + "<br>" + atomicMass + "<br>" + shells;
          console.log(infId);
          box.innerHTML = '<span class="number">' + jsonData.elements[infId].number + '</span><br><span class="symbol">' + jsonData.elements[infId].symbol + '</span><br><span class="mass">' + jsonData.elements[infId].atomic_mass.toFixed(3) + '</span>';
          document.getElementById("scr").appendChild(infoText);
        }
      }
    }
  };
  //json link
  xhttp.open("GET", "https://sasho184.github.io/Periodic-Table-JSON/PeriodicTableJSON.json", true);
  xhttp.send();
}

//sets click event on all boxes
function setOnClick() {
  var i;
  for (i = 1; i < 104; i++) {
    try {
      // document.getElementById(i).setAttribute("ontouchstart", "reply_click(this.id)");
      document.getElementById("b" + i).addEventListener("click", function() {
        reply_click(this.id);
      });
    } catch (err) {
      console.log("missing element");
    }
  }
}

//launches on click of a box
function reply_click(id) {
  var infId = "inf" + id;
  var infoScreen = document.getElementById("scr");
  //resets info screen
  infoScreen.innerHTML = "";
  // if on mobile
  if (onMobile) {

  }
  //if on desktop
  else {
    //places corresponding box on infoScreen
    var infoBox = document.createElement("div");
    infoBox.className = "infoBox " + id;
    infoBox.id = infId;
    infoScreen.appendChild(infoBox);
    getJsonData(infId, 1);
  }
}

//createTable() creates the main table
function createTable() {
  var table = document.getElementById('table');
  // function for appending empty rows
  // numAfter - after which box
  // ammount - ammount of boxes
  // name - class to be added
  function addEmptyBox(numAfter, ammount, name) {
    if (i == numAfter) {
      for (var x = 0; x < ammount; x++) {
        var item = document.createElement("div");
        item.className = "grid-item " + name + x;
        var box = document.createElement("div");
        box.className = "EmptyBox " + name + x;
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
          var textnode = document.createTextNode(name + x);
          box.appendChild(textnode);
        }
        item.appendChild(box);
        table.appendChild(item);
      }
    }
  }
  //function for appending boxes
  function addBoxes() {
    var item = document.createElement("div");
    item.className = "grid-item " + b;
    var box = document.createElement("div");
    box.className = "box b" + b;
    box.id = "b" + b;
    //adds number for debugging if true
    if (debug == 1) {
      var textnode = document.createTextNode(b);
      box.appendChild(textnode);
    }
    item.appendChild(box);
    table.appendChild(item);
  }
  //creates table
  var i;
  for (i = 1; i < 119; i++) {
    //append first empty row
    addEmptyBox(1, 18, "f");
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
    addEmptyBox(1, 1, "x");
    addEmptyBox(1, 1, "s");
    addEmptyBox(1, 7, "x");
    //append empty row between (4) and (5)
    addEmptyBox(4, 2, "x");
    //append empty row between (12) and (13)
    addEmptyBox(12, 10, "x");
    //append empty box after (56)
    addEmptyBox(56, 1, "y1");
    //append empty box after (88)
    addEmptyBox(88, 1, "y2");
    //append empty box after (y1) and row after (88)
    addEmptyBox(88, 35, "x");
    addEmptyBox(88, 1, "y1");
    //appends last 3 empty boxes in front of (89)
    addEmptyBox(103, 2, "x");
    addEmptyBox(103, 1, "y2");
    //skips to (71) after (56) to create a gap
    if (i == 56) {
      i = 71;
    }
  }
}
