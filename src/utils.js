class Utils {
    static timeout(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}