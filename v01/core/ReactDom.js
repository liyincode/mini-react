import { render } from './React.js'

const ReactDom = {
    createRoot(container) {
        return {
            render(App) {
                render(App, container)
            }
        }
    }
}

export default ReactDom
