var names=new Array();
var score=new Array();

function insert(){
    var namesValue = document.getElementById('name').value;
    var scoreValue = document.getElementById('score').value;
    names[names.length]=namesValue;
    score[score.length]=scoreValue;
  }

function show() {
  var content="<b>All Elements of the Arrays :</b><br>";
  for(var i = 0; i < names.length; i++) {
     content +=names[i]+"<br>";
  }
  for(var i = 0; i < score.length; i++) {
     content +=score[i]+"<br>";
  }
  document.getElementById('display').innerHTML = content;
}
