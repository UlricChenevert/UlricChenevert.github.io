# WASD Gravity Drive 

---

### Premise
Antifical gravity fielas work an artifical mass, which can be used for a myraid of uses, including but not limited to anti-character shield, launch tubes, gravity cannons, and of course Granity drives. 

Gravity Drives consist of an mass block and a gravity generator on the same grid, which creates a "reactionless drive" with monstrous aceleration at a large PCU cost and design complexity.

![Gravity Drive Diagram](../Images/GravityDriveDiagram.jpg)

### Drive Cost
- Simple: 1 mass generators : 1 gravity generator = 210 PCU (0.68x large hydrogen thrust)
- Server PCU optimized: 32 mass generators : 1 gravity generator = 1k PCU (21.8x large hydrogen thrust)

### Intergrating the Drive with WASD 

**Core Events**  
1. Press key (W, A, S, D)  
2. Influences controllable Object (Thruster, Wheels)  
3. Detect Change (Event controllers, Scripts)  
4. Drive Control (Control thrust, Control Stop) 

#### Steps For Multiplayer / Scriptless Worlds

| Function | Avenue | Notes |
|---|---|---|
| Detect  100% thrust for direction | Event in Event Controller | WASD input creates a detectable 100% thrust  | 
| Ensure gravity drives 9.8 m/s | **20x** increase acceleration commands to gravity generator group from a timer block (20 commands because each command increases / decreases by 1 m/s^2 and covers the -9.8 m/s^2 to 9.8m/s^2 case).    | Use one array of gravity drives per direction. It will increase more acceleration per PCU and simplifies set up work. You can trigger 9 groups of the same blocks per page. |
 If speed less than 5m/s: turn off gravity blocks, else: turn on | With inertia dampers, drive will be stuck in a infinite loop of thrust over compensation causing extreme pulsing. This also means that basic thrusters must be used to achieve speed change >5 for gravity drive to start. Either way I would recommend a kill switch in cockpit. | Effectiveness of this logic dependent on thrust to weight ratio. |
| If acceleration less than 0: stop artificial mass, else: start artificial mass | No necessary but fucking sick to look at. |   |
**For each direction**

## Tips 

--- 

- Gravity drives ore on on/triggered but nothing to happening: Check out if your other side is counter acting the field acceleration
- Test on small one direction craft first, then start on an actual craft
- Use an antenna when building to debug if you are creating the groups correctly
- Check the gravity field twice before turning on any artificial blocks