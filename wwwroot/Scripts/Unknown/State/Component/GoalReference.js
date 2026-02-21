export var NavigationState;
(function (NavigationState) {
    NavigationState[NavigationState["Idle"] = 0] = "Idle";
    NavigationState[NavigationState["MovingToDestination"] = 1] = "MovingToDestination";
})(NavigationState || (NavigationState = {}));
export class NavigationGoalComponent {
    state;
    target;
    constructor(state = NavigationState.Idle, target) {
        this.state = state;
        this.target = target;
    }
}
