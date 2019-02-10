var table;
var b;
var debug = 0;

//createTable() loads after body and creates the main table
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
    //adds number for debugging if true
    if (debug) {
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
    addEmptyBox(1, 16, "x");
    //append empty row between (4) and (5)
    addEmptyBox(4, 10, "x");
    //append empty row between (12) and (13)
    addEmptyBox(12, 10, "x");
    //append empty box after (56)
    addEmptyBox(56, 1, "y");
    //append empty box after (88)
    addEmptyBox(88, 1, "y");
    //append empty box after (y1) and row after (88)
    addEmptyBox(88, 36, "x");
    //appends last 3 empty boxes in front of (89)
    addEmptyBox(103, 3, "x");
    //skips to (71) after (56) to create a gap
    if (i == 56) {
      i = 71;
    }
  }
}
