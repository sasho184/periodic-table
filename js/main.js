var table;
var b;
var debug = 0;

//onLoad() loads after body
function onLoad() {
  createTable();
  console.log("createTable() done");
  getJsonData();
  console.log("getJson() done");
}

//function for getting json data from Periodic-Table-JSON and setting values inside boxes
function getJsonData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonData = JSON.parse(xhttp.responseText);
      //does not set box text if debug is on
      if (!debug) {
        //setting values inside boxes from json
        for (i = 1; i < 104; i++) {
          var box = document.getElementById('b' + i);
          //sets number symbol and atomic mass
          box.innerHTML = '<span class="number">' + jsonData.elements[i - 1].number + '</span><br><span class="symbol">' + jsonData.elements[i - 1].symbol + '</span><br><span class="mass">' + jsonData.elements[i - 1].atomic_mass.toFixed(3) + '</span>';
        }
      }
    }
  };
  //json link
  xhttp.open("GET", "https://sasho184.github.io/Periodic-Table-JSON/PeriodicTableJSON.json", true);
  xhttp.send();
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
        var box = document.createElement("div")
        box.className = "EmptyBox " + name + x;
        if (debug != 1 && debug != 2) {
          if (name == "y1") {
            box.innerHTML = "*";
          } else if (name == "y2") {
            box.innerHTML = "**";
          }
        }
        // if (x == 3){
        //   name = "screen";
        //   // item.className = "grid-item " + "screen";
        //   // box.className = "EmptyBox " + "screen";
        // }
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
    var box = document.createElement("div")
    box.className = "box b" + b;
    box.id = "b" + b
    //adds number for debugging if true
    if (debug == 1) {
      var textnode = document.createTextNode(b);
      box.appendChild(textnode);
    }
    item.appendChild(box);
    table.appendChild(item);
  }

  //creates table
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
