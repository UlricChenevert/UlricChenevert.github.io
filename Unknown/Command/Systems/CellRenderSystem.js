export class CellRenderSystem {
    constructor(cellBundler, frameBundler) {
        this.cellBundler = cellBundler;
        this.frameBundler = frameBundler;
    }
    render() {
        // Render the cell bundler
        this.cellBundler.centerCell.tileGrid.forEach((row, x) => {
            row.forEach((DisplayComponent, y) => {
                this.frameBundler.tileGrid[x][y].representation = DisplayComponent.representation;
                this.frameBundler.tileGrid[x][y].color = DisplayComponent.color;
            });
        });
    }
}
