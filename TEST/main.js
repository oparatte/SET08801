// JavaScript Document
var xhr = new XMLHttpRequest();

xhr.open('GET', 'data.json', true)
xhr.responseType = 'text'; //specify type is text

xhr.onload = function() {
    if (xhr.status === 200) {
        var question = JSON.parse(xhr.responseText);
        console.log(question);
    } // end if
} // end onload function 

xhr.send();

// loging for testing
xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
    console.log(xhr.status);
    console.log(xhr.statusText);
} // end function 