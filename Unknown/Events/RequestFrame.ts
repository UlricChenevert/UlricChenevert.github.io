export function dispatchRequestFrameEvent() {
    return dispatchEvent(new CustomEvent("requestFrame")) 
}