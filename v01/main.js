// v1 创建一个包含 app 字符的 div
/*
const dom = document.createElement('div')
dom.id = 'app'
const textElement = document.createTextNode('app')
dom.appendChild(textElement);
const rootElement = document.getElementById('root')
rootElement.appendChild(dom)
 */

// v2 虚拟 dom
/*
const el = {
    type: 'div',
    prop: {
        id: 'app',
        children: [
            {
                type: 'text',
                nodeValue: 'app'
            },
            {
                type: 'text',
                nodeValue: 'aaaa'
            }
        ]
    }
}

function createTextElement(text) {
    return document.createTextNode(text)
}

function createElement(type, props, children) {
    const dom = document.createElement(type)
    Object.keys(props).forEach(prop => {
        if (prop !== 'children') {
            dom[prop] = props[prop]
        }
    })

    children.forEach(child => {
        console.log(child)
        if (child.type === 'text') {
            dom.appendChild(createTextElement(child.nodeValue))
        } else {
            dom.appendChild(createElement(child.type, child.prop, child.prop.children))
        }
    })

    return dom;
}

function render(el) {
    const dom = createElement(el.type, el.prop, el.prop.children)

    document.querySelector('#root').appendChild(dom)
}

render(el);

 */

// v3
const el = {
    type: 'div',
    prop: {
        id: 'app',
        children: [
            {
                type: 'TEXT_ELEMENT',
                nodeValue: 'app'
            }
        ]
    }
}

function createTextElement (text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map((child) => typeof child === 'string' ?
                createTextElement(child) : child
            )
        }
    }
}


function render(el, container) {
    console.log({el, container})
    const dom = el.type === 'TEXT_ELEMENT' ?
        document.createTextNode(el.nodeValue)
        : document.createElement(el.type)

    Object.keys(el.props).forEach((prop) => {
        if (prop !== 'children') {
            dom[prop] = el.props[prop]
        }
    })

    el.props.children.forEach((child) => {
        render(child, dom)
    })

    console.log({container})
    container.append(dom)
}

const App = createElement('div', { id: 'app'}, 'app', 'aaaa')
// render(document.querySelector('#root'), App)

const ReactDom = {
    createRoot(container) {
        return {
            render(App) {
                render(App, container)
            }
        }
    }
}

console.log(App)
ReactDom.createRoot(document.getElementById('root')).render(App)
