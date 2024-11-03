#### Animal Object
- Position
- Direction
- Speed
- Basic Needs

#### Herd Animal Movement Overview
- Separation (steer to avoid crowing flock mates) 
- Alignment (steer towards average heading)
- Cohesion ( move towards average heading )
- Need Mitigation ( finding / consuming food, water, sleep )
- Predator Combat / Avoidance

#### Herd Animal Behavior Tree
Root  
- Combat Selector
    - Defend *if fear is low and neighbor amount is high*
    - Flee
- Need Mitigation Selector [ Required ]
    - Forage Selector
        - Water Sequence
            - Find Water
            - Drink Water
        - Food Sequence
            - Find food
            - Consume food
    - Sleep Sequence
        - Find shelter
        - Sleep
- Seasonal Behavior Selector
    - Migration Sequence *if food is scarce or temperatures are falling*
        - Set destination
        - Move
    - Breeding Sequence *if spring*
        - Find Mate
        - ***Mate***
