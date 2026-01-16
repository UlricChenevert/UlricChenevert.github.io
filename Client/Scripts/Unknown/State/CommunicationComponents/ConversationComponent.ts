import { DisplayableComponent } from "../Component/DisplayableComponent";
import { NavigationGoalComponent } from "../Component/GoalReference";

export class ConversationComponent {
    public constructor (public locationReference : DisplayableComponent, public MemoryReference : NavigationGoalComponent) {}
}