function getRandomNumber(min, max) {
    return (Math.floor(Math.random() * (max - min + 1) + min))
}

function getRandomTwoSymbol() {
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const upperAlphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    return `${alphabet[getRandomNumber(0, 25)]}${upperAlphabet[getRandomNumber(0, 25)]}`
}

module.exports = {
    getRandomID: () => {
        return `${getRandomNumber(1000, 9999)}${getRandomTwoSymbol()}${getRandomNumber(10, 99)}${getRandomTwoSymbol()}`
    },
    getRandomIDforLot: () => {
        return `${getRandomNumber(100, 999)}${getRandomTwoSymbol()}${getRandomTwoSymbol()}${getRandomNumber(1000, 9999)}${getRandomTwoSymbol()}`
    }
}