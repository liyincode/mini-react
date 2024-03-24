// const textElement = document.createTextNode('aaa')
// document.getElementById('root').append(textElement)

// let i = 0
// while (i < 10000000000) {
//     i++
// }
const rootDom = document.getElementById('root')

function createText(text) {
    return document.createTextNode(text)
}

let domCount = 1000000

function work(IdleDeadline) {
    if (domCount === 0) {
        console.timeEnd('update dom')
        return
    }


    let shouldYield = false
    while (!shouldYield) {
        const textDom = createText(domCount.toString())
        rootDom.append(textDom)
        domCount--

        shouldYield = IdleDeadline.timeRemaining() < 1;
    }

    requestIdleCallback(work)
}

console.time('update dom')
requestIdleCallback(work)

// while (domCount > 0) {
//     const textDom = createText(domCount.toString())
//     rootDom.append(textDom)
//     domCount--
// }
// console.timeEnd('update dom')
