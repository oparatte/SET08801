// JavaScript Document
var question;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'TEST/questions.json', true)
xhr.responseType = 'text'; //specify type is text
xhr.send();


xhr.onload = function() {
    if (xhr.status === 200) {
        question = JSON.parse(xhr.responseText);
        console.log(question); // to load full json array
        // console.log(question[1]); // to load a specific question
        // console.log(question[1].Question); // to load only text from question 2
    } // end if
} // end onload function 

function display(x) {
    console.log(XMLHttpRequestEventTarget);
    document.getElementById('question').innerHTML = question[x].Question
    document.getElementById('answer1').innerHTML = question[x].AnswerA
    document.getElementById('answer2').innerHTML = question[x].AnswerB
    document.getElementById('answer3').innerHTML = question[x].AnswerC
    document.getElementById('answer4').innerHTML = question[x].AnswerD
} // end function



// loging for testing
xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
    console.log(xhr.status);
    console.log(xhr.statusText);
} // end function 