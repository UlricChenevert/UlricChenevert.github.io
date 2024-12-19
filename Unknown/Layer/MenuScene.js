export class MenuScene {
    constructor(frame) {
        this.isDisplaying = false;
        this.frame = frame;
    }
    toggleIsDisplaying() {
        this.isDisplaying = !this.isDisplaying;
    }
    display() {
        if (!this.isDisplaying)
            return; // Only display if you should display
        console.error("Not Implemented");
    }
}
