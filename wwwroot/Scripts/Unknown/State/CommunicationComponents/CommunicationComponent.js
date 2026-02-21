// Where is the entity
// Who is the entity associated with
// How does the entity respond
export class EntityCommunicationComponent {
    entityLocation;
    entityGroup;
    masterEventHandler;
    // Could split up events into different bags and let the grouping handle which event bag gets the event but
    constructor(entityLocation, entityGroup, masterEventHandler) {
        this.entityLocation = entityLocation;
        this.entityGroup = entityGroup;
        this.masterEventHandler = masterEventHandler;
    }
}
