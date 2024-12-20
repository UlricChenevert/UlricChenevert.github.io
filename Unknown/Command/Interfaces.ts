export interface IHandlesKeyboardEvents {
    handleKeyEvent : (event : KeyboardEvent) => void
}

export interface IRenderSystem {
    render : Function
}

export interface ISceneStep {
    step : Function
}

export interface ISceneCommand extends ISceneStep, IRenderSystem {
    render : Function
    step : Function
}