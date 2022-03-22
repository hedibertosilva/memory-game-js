function onLoad() {
    const dependencies = {
        screen: Screen,
        utils: Utils
    }
    const memoryGame = new MemoryGame(dependencies)
    memoryGame.initializer()
}

window.onload = onLoad
