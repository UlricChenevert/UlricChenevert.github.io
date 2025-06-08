# WASD Gravity Drive

## Premise

Artificial gravity fields work on an **artificial mass**, which can be used for a myriad of uses, including but not limited to anti-character shield, launch tubes, gravity cannons, and of course gravity drives.

Gravity Drives are on mass block and a gravity generator on the same grid, which create a "reactionless drive" with monstrous acceleration at a large PCU cost.

---

## Drive Costs

* **Mass Block:**
    * PCU: 25
* **Gravity Generator:**
    * PCU: 188
* **Example Calculation:**
    * 1g = 9.8 m/s²
    * 1kg = 9.8N
    * (kg: 3,532kg mentioned in diagram)
* **Symmetric Ship:**
    * ≤ 210 PCU per thruster (Note: This seems to be a comparative cost or related to a different system, as the gravity drive itself is reactionless.)

---

## Integrating The Drive To WASD

Press key ➡️ Controllable object ➡️ Detect change ➡️ Control Drive

* **W, A, S, D:**
    * ↳ 4 Thrusters (Likely conceptual directions, not physical thrusters for this drive)
    * ↳ Wheels (Role not fully detailed, perhaps an alternative control aspect)
    * ↳ Event controllers ➡️ Control thrust
    * ↳ Scripts ➡️ Constant Stop

---

## Logic & Reasoning

Focusing on the detecting change and control drive aspects of the drive, many interesting design choices emerge. The script option is more robust and compact solution; however, it is not allowed on keen servers. Below is the design choices made and reasoning:

| Logic                                       | Reason                                                                                                                               |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| **For each direction** |                                                                                                                                      |
| ↳ Detect 100% thrust                        | ⬅️ Ward input creates 100% thrust                                                                                                    |
| ↳ Ensure gravity drives 9.8m/s²             | ⬅️ It saves PCU and increases acceleration                                                                                           |
| ↳ Trigger accelerate x20                    | (For more complex logic) if you combine generators in one direction and just control direction                                     |
| **Stopping** |                                                                                                                                      |
| ↳ ⬇️ continued                            | Each increase action only increases my 1m/s². Some control this with loops, but it is logistically easier to just create 10 groups and trigger that across 2x pages. |

---

## Stopping Continued

* **IF speed less than 5 m/s** (dependent on thrust-to-weight ratio)
    * Stop gravity drive
    * *Reason:* Drive will get into pulsating state above it once it cannot slow down any less.
* **Else**
    * Start gravity drives (Note: This might be a typo or refer to engaging reverse gravity for braking)
* **IF speed change < 0**
    * Stop artificial mass
    * *Reason:* This also means that basic thrusters must achieve speed change < 0 for gravity drive to start. Filter may. I would recommend a kill switch in cockpit.
* **Else**
    * Start artificial mass
    * *Note:* Not necessary but fucking sick to look at.

---

## Bugs to look out for

* **Gravity drives are on/triggered but nothing is happening.**
    * ➡️ Check if your other side is counteracting the field/acceleration.