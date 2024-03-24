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

    container.append(dom)

}



export {
    render,
    createElement,
}
