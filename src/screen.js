const utils = Utils

const ID_CONTENT = "figures"
const ID_BTN_PLAY = "btnPlay"
const ID_BTN_SHOW_HIDDEN_HEROES = "btnShowHiddenHeroes"
const ID_MESSAGE = "message"
const ID_LOADING = "loading"
const ID_COUNTER = "counter"

const MESSAGES = {
    success: {
        text: "Perfect! Congratulations!",
        class: "alert-success"
    },
    error: {
        text:"You Wrong! Try Again!",
        class: "alert-danger"
    }
}
const CLASS_INVISIBLE = "invisible"


class Screen {
    static render(items) {
        const contentHTML = Screen.getAllHTML(items)
        Screen.replaceHTML(contentHTML)
    }
    static getAllHTML(items) {
        return items.map(Screen.getHTML).join('')
    }
    static getHTML(item) {
        return `
            <div class="col-md-3">
                <div class="card" style="width: 50%;" onclick="window.setValidateSelection('${item.id}', '${item.name}')">
                    <img src="${item.img}" name="${item.name}" class="card-img-top">
                </div>
                <br/>
            </div>
        `
    }
    static replaceHTML(stringHTML) {
        const content = document.getElementById(ID_CONTENT)
        content.innerHTML = stringHTML
    }
    static setPlay(fnOnClick) {
        const btnPlay = document.getElementById(ID_BTN_PLAY)
        btnPlay.onclick = fnOnClick
    }
    static setValidateSelection(fnOnClick) {
        window.setValidateSelection = fnOnClick
    }
    static showHeroes(name, img) {
        const elementsHTML = document.getElementsByName(name)
        elementsHTML.forEach(item => item.src = img)
    }
    static async showMessage(success=true) {
        const element = document.getElementById(ID_MESSAGE)
        if (success) {
            element.classList.remove(MESSAGES.error.class)
            element.classList.add(MESSAGES.success.class)
            element.innerHTML = MESSAGES.success.text
        } else {
            element.classList.remove(MESSAGES.success.class)
            element.classList.add(MESSAGES.error.class)
            element.innerHTML = MESSAGES.error.text
        }
        element.classList.remove(CLASS_INVISIBLE)
        await utils.timeout(1000)
        element.classList.add(CLASS_INVISIBLE)
    }
    static showLoading(show=true) {
        const element = document.getElementById(ID_LOADING)
        if (show) {
            element.classList.remove(CLASS_INVISIBLE)
            return
        }
        element.classList.add(CLASS_INVISIBLE)
    }
    static startCounter() {
        let startNumber = 3
        const element = document.getElementById(ID_COUNTER)
        const identifyOnText = "$$counter"
        const defaultText = `Starting in ${identifyOnText} seconds...`

        const updateText = () => (element.innerHTML = defaultText.replace(identifyOnText, startNumber--))
        updateText()
        const idInterval = setInterval(updateText, 1000);
        return idInterval
    }
    static clearCounter(idInterval) {
        clearInterval(idInterval)
        const element = document.getElementById(ID_COUNTER)
        element.innerHTML = ""
    }
    static setShowHiddenHeroes(fnOnClick) {
        const element = document.getElementById(ID_BTN_SHOW_HIDDEN_HEROES)
        element.onclick = fnOnClick
    }
}
