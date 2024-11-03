from typing import List
import os

DISPLAY_SIZE = 10

class Entity:
    def __init__ (self, position = (0, 0), character_representation = 'o'):
        self.position = position
        self.character_representation = character_representation

def initDisplay (size = DISPLAY_SIZE):
    temp = []  
    for row in range(size):
        temp.append([])
        for _ in range(size):
            temp[row].append('-')
    return temp

def printDisplay (entity_list : List[Entity], size = DISPLAY_SIZE):
    
    grid = initDisplay(size)

    # State Updates
    for an_entity in entity_list:
        grid[an_entity.position[0] % size][an_entity.position[1] % size] = an_entity.character_representation
    
    os.system('clear')
    for row in grid:
        for cell in row:
            print(cell, end=' ')
        print()
    
    return

def move (an_entity : Entity):
    direction = input()

    while direction != "N" and direction != "S" and direction != "W" and direction != "E":
        print ( "Input is invalid!" )
        direction = input()

    if direction == "N":
        an_entity.position = (an_entity.position[0] - 1, an_entity.position[1])
    elif direction == "S":
        an_entity.position = (an_entity.position[0] + 1, an_entity.position[1])
    elif direction == "E":
        an_entity.position = (an_entity.position[0], an_entity.position[1] + 1)
    elif direction == "W":
        an_entity.position = (an_entity.position[0], an_entity.position[1] - 1)
    

    return an_entity
