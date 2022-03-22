class MemoryGame {
    constructor({ screen, utils }) {
        this.screen = screen
        this.utils = utils
        this.initHeroes = [
            { img: './contents/batman.png', name: 'batman' },
            { img: './contents/hellboy.png', name: 'hellboy' },
            { img: './contents/flash.png', name: 'flash' },
            { img: './contents/ciclope.png', name: 'ciclope' },
        ]
        this.defaultIcon = "./contents/default.png"
        this.hiddenHeroes = []
        this.selectedHeroes = []
    }
    play() {
        this.shuffle()
    }
    async shuffle() {
        const copies = this.initHeroes
                        .concat(this.initHeroes)
                        .map(item => {
                            return Object.assign({}, item, {id: Math.random()/0.1})
                        })
                        .sort(() => Math.random() - 0.5)
        this.screen.render(copies)
        this.screen.showLoading()

        const idInterval = this.screen.startCounter()
        await this.utils.timeout(3000)
        this.screen.clearCounter(idInterval)
        this.hideHeroes(copies)
        this.screen.showLoading(false)
    }
    hideHeroes(heroes) {
        const hiddenHeroes = heroes
                                .map(({name, id}) => ({
                                        id,
                                        name,
                                        img: this.defaultIcon
                                    }))
        this.screen.render(hiddenHeroes)
        this.hiddenHeroes = hiddenHeroes
    }
    validateSelection(id, name) {
        const item = {id, name}
        const selectedHeroes = this.selectedHeroes.length

        switch(selectedHeroes) {
            case 0:
                this.selectedHeroes.push(item)
                break
            case 1:
                const [ firstSelection ] = this.selectedHeroes
                this.selectedHeroes = []
                if (firstSelection.name === item.name &&
                    firstSelection.id !== item.id
                    ) {
                        this.showHeroes(item.name)
                        this.screen.showMessage()
                        return
                    }
                this.screen.showMessage(false)
                break
        }

    }
    showHeroes(foundName) {
        const { img } = this.initHeroes.find(({name}) => foundName === name)
        this.screen.showHeroes(foundName, img)
    }
    showHiddenHeroes() {
        const hiddenHeroes = this.hiddenHeroes
        for (const hero of hiddenHeroes) {
            const { img } = this.initHeroes.find(item => hero.name == item.name)
            hero.img = img
        }
        this.screen.render(hiddenHeroes)
    }
    initializer() {
        this.screen.render(this.initHeroes)
        this.screen.setPlay(this.play.bind(this))
        this.screen.setValidateSelection(this.validateSelection.bind(this))
        this.screen.setShowHiddenHeroes(this.showHiddenHeroes.bind(this))
    }
}
