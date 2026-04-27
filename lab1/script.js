const mySpan = document.getElementsByTagName('span')[0];

function showStudentName(studentName) {
    mySpan.textContent = studentName;
}

const actionBtn = document.getElementById('hoverButton');

actionBtn.onmouseover = function() {
    showStudentName("Nazar Haras");
};