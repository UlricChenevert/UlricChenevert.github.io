import { NavigationState } from "../../State/Component/GoalReference";
import { Coordinate } from "../../State/DTO/Coordinate";
export class ConversationSystem {
    conversationComponents;
    constructor(conversationComponents) {
        this.conversationComponents = conversationComponents;
    }
    static TILE_CONVERSATION_RADIUS = 10;
    HandleEvent(event, eventData) {
        if (eventData?.Words == "Flee") {
            this.conversationComponents.forEach((entity) => {
                entity.MemoryReference.state = NavigationState.MovingToDestination;
                entity.MemoryReference.target = new Coordinate(entity.locationReference.location.x + 10, entity.locationReference.location.y + 10);
            });
        }
    }
    ;
}
