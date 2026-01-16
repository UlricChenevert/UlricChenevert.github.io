import { EventSubscriber } from "../../../Framework/PubSub/PubSub";
import { ConversationComponent } from "../../State/CommunicationComponents/ConversationComponent";
import { NavigationState } from "../../State/Component/GoalReference";
import { Coordinate } from "../../State/DTO/Coordinate";

type ConversationCommandType = "Follow Me" | "Come Here" | "Stop" | "Flee"

export class ConversationSystem implements EventSubscriber<"Communicate", {Volume : number, Words : ConversationCommandType}> {
    public constructor (public conversationComponents : ConversationComponent[]) {}   
    
    static TILE_CONVERSATION_RADIUS = 10;
    
    HandleEvent (event: "Communicate", eventData?: { Volume: number; Words: ConversationCommandType; } | undefined) {
        
        if (eventData?.Words == "Flee") {
            this.conversationComponents.forEach((entity)=>{
                entity.MemoryReference.state = NavigationState.MovingToDestination
                entity.MemoryReference.target = new Coordinate(
                    entity.locationReference.location.x + 10, 
                    entity.locationReference.location.y + 10)
            })
        }


    };
}