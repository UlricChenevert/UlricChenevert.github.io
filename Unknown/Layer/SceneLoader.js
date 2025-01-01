var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GraphicsConfig } from "../State/Config/GraphicsConfig.js";
import { Color } from "../State/DTO/Color.js";
export class SceneLoader {
    constructor(frame) {
        this.frame = frame;
    }
    display(displayElement) {
        return __awaiter(this, void 0, void 0, function* () {
            let html = "";
            let defaultColor = new Color(GraphicsConfig.Colors.Background.red, GraphicsConfig.Colors.Background.green, GraphicsConfig.Colors.Background.blue);
            this.frame.tileGrid.forEach((row) => {
                row.forEach((tile) => {
                    if (tile.color != defaultColor) {
                        html += `<span style="color:rgba(${tile.color.red}, ${tile.color.green}, ${tile.color.blue}, ${tile.color.opacity});">${tile.representation}</span>`; //
                    }
                    else {
                        html += tile.representation;
                    }
                });
                html += '<br>';
            });
            displayElement.innerHTML = html;
        });
    }
}
