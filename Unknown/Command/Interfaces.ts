export interface IHandlesKeyboardEvents {
    handleKeyEvent : (event : KeyboardEvent) => void
}

export interface IRenderSystem {
    render : Function
}