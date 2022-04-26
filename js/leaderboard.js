const leaderboard = document.getElementById("leaderboard"); // reference to leaderboard table 

// Read highScores array from local storage or create dummy scores
const highScores = JSON.parse(localStorage.getItem('highScores')) ||
[
{"Name": "Keyser Söze","Score": 672},
{"Name": "Ellen Ripley","Score": 547},
{"Name": "Sarah Connor","Score": 524},
{"Name": "Michael Corleone","Score": 491},
{"Name": "Lara Croft","Score": 485},
{"Name": "Marty McFly","Score": 418},
{"Name": "Harry Callahan","Score": 373},
{"Name": "Peter Venkman","Score": 296},
{"Name": "Wayne Campbell","Score": 248},
{"Name": "Joey Tribbiani","Score": 150}
]; 

// Function to create table head
function createTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
}
// Function to create table rows  
function createTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
  
let table = document.querySelector("table");
let data = Object.keys(highScores[0]);
createTableHead(table, data);
createTable(table, highScores);