export class CellRenderSystem {
    constructor(cellBundler, frameBundler) {
        this.cellBundler = cellBundler;
        this.frameBundler = frameBundler;
    }
    render() {
        // Render the cell bundler
        this.cellBundler.activeCell.tileGrid.forEach((row, x) => {
            row.forEach((TileComponent, y) => {
                this.frameBundler.tileGrid[x][y].representation = TileComponent.representation;
            });
        });
    }
}
