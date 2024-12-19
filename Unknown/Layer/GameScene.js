export class GameScene {
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
        this.frame.tileGrid.forEach(tile => {
            console.log("Display");
        });
    }
}
