var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CellRenderSystem } from "./CellRenderSystem";
import { PhysicalRenderSystem } from "../Systems/PhysicalRenderSystem";
export class RequestFrameCommand {
    constructor(frameBundler, physicalComponentBundler, cellBundler) {
        this.frameBundler = frameBundler;
        this.physicalComponentBundler = physicalComponentBundler;
        this.cellBundler = cellBundler;
        this.sceneRenderers = [];
    }
    renderScene() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sceneRenderers.forEach(renderSystem => {
                renderSystem.render();
            });
        });
    }
    renderGame() {
        return __awaiter(this, void 0, void 0, function* () {
            // First in is the lowest priority and will get overridden by the other systems
            this.sceneRenderers = [new CellRenderSystem(this.cellBundler, this.frameBundler), new PhysicalRenderSystem(this.frameBundler, this.physicalComponentBundler)];
            this.renderScene();
        });
    }
    renderLoading() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sceneRenderers = [];
            this.renderScene();
        });
    }
    renderMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            this.sceneRenderers = []; // TODO
            this.renderScene();
        });
    }
}
