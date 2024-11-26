
from typing import List
from DisplayFunctions import initDisplay, move, printDisplay, Entity

# displayGrid = initDisplay()
entities : List[Entity] = [Entity((1,1), '8')]

while True:
    printDisplay(entities)
    entities[0] = move(entities[0])