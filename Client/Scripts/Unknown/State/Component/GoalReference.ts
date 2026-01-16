import { Coordinate } from "../DTO/Coordinate";

export enum NavigationState {Idle, MovingToDestination}

export class NavigationGoalComponent {
    constructor(public state = NavigationState.Idle, public target : Coordinate | undefined) {}
}