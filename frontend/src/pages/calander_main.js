var cells = document.getElementsByClassName("date");
var clicked_cell;
var input = document.getElementById("cal-input");
input.addEventListener("keyup",event => {
    var keyCode = event.keyCode ? event.keyCode : event.which;
    if(keyCode === 13 && event.target.value !== ""){
        addtext();
    }
});
var color = document.getElementById("cal-color");
var button = document.getElementById("cal-button");
color.value = '#b0b0b0';
input.value = '';
button.addEventListener("click", addtext);
 
function addtext(){
    const text = input.value;  
    const cc = color.value;
    input.value = '';
    color.value = '#b0b0b0';
    if(text.length!==0){
        if(clicked_cell.childElementCount>0){
            clicked_cell.removeChild(clicked_cell.lastChild);
        }
        const text_element = document.createElement("p");
        text_element.style.color=cc;
        text_element.innerText=text;
        clicked_cell.appendChild(text_element);
    }
}

for(var i=0; i<cells.length; ++i) {
    cells[i].onclick=function() {
        for(var i=0; i<cells.length; ++i) {
            cells[i].classList.remove("clicked");
        }
        this.classList.add("clicked");
        clicked_cell=this;
    };
}


//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme");
for(var i=0; i<themeButton.length; ++i) {
    themeButton[i].addEventListener('click', e => {
        document.body.setAttribute('class', e.target.id)
    }, false)
}