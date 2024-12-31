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
    constructor(frameBundler, displayableComponents) {
        this.displayableComponents = displayableComponents;
        this.frameBundler = frameBundler;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displayableComponents.entityBundle.forEach((component) => {
                const temp = this.frameBundler.tileGrid[component.location.y][component.location.x];
                temp.representation = component.representation;
                temp.color = component.color;
            });
        });
    }
}
