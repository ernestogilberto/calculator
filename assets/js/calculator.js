const buttons = document.getElementById("buttons")

function addElement (father, tag, text, className = null, idName = null) {
    let element = document.createElement(tag)
    element.innerHTML = text
    father.appendChild(element)

    if (className != null) {
        for (let elem in className) {
            element.classList.add(className[elem])
        }
    }

    if (idName != null) {
        element.id = idName
    }
}

function setKeys () {
    const keys = "1,2,3,C,4,5,6,-,7,8,9,+,0,=,/,*"

    const idKeys = document.getElementById("keyboard")
    idKeys.innerHTML = ""
    keys.split(',').map(element => {
        let key = document.createElement("span")
        key.addEventListener("click", teclaPulsada)
        key.innerText = element;

        if (element === 'C') {
            key.classList.add("clear")
            key.onclick = function(event) {
                document.getElementById("text").value = "";
            }
        }

        if (element === "=") {
            key.classList.add("equal")
            key.onclick = function(event) {
                let data = document.getElementById("text").value
                let result = 0
                if(data.includes("+")){
                    let operators = data.split("+")
                    result = parseInt(operators[0]) + parseInt(operators[1])
                } else if(data.includes("-")){
                    let operators = data.split("-")
                    result = parseInt(operators[0]) - parseInt(operators[1])
                } else if(data.includes("/")){
                    let operators = data.split("/")
                    result = parseInt(operators[0]) / parseInt(operators[1])
                } else if(data.includes("*")){
                    let operators = data.split("*")
                    result = parseInt(operators[0]) * parseInt(operators[1])
                }
                document.getElementById("text").value = result;
            }
        }
        idKeys.appendChild(key)
    })
}

function addKeyboard (father) {
    addElement(father, "input", "", ["screen"], "text")
    addElement(father, "div", "", null, "keyboard")
    const keyboard = document.getElementById("keyboard")
    addElement(keyboard, "div", null, null, "key")
    setKeys()
}

function teclaPulsada() {
    const key = this.classList.contains("clear") || this.classList.contains("equal") ? "" : this.innerText;
    document.getElementById("text").value += key;
}

addKeyboard(buttons)