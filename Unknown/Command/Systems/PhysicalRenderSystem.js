var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class PhysicalRenderSystem {
    constructor(frameBundler, physicalComponents) {
        this.physicalComponents = physicalComponents;
        this.frameBundler = frameBundler;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this.physicalComponents.entityBundle.forEach((entity) => {
                this.frameBundler.tileGrid[entity.x][entity.y].representation = entity.representation;
            });
        });
    }
}