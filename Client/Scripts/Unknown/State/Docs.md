# Architecture

This contains the game state, in other words, all the data required to represent any possible state of the game. For instance, units, bullets, world items, etc.

Command system                  <- ComponentXBundler        
(On action needs component data)   (Map<Entity, ComponentX>)

![ Structure ](../../Docs/Basic%20Game%20Architecture.png)