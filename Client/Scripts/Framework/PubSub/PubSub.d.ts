export type EntityEvent = "Communicate"

export interface EventPublisher<T extends EntityEvent> {
    Subscribers : EventSubscriber<T>[]
    
    Subscribe : () => number // ID
    Unsubscribe : (id : number) => boolean

    EmitEvent : (event : T) => void
}

export interface EventSubscriber<T extends EntityEvent> {
    HandleEvent : (event : T) => void
}