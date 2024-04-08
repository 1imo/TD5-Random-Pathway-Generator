import sys
import random
import data_classes

# The information has been stored in a separate class (data abstraction)
info = data_classes.Information()

# Shorthand declaration of the arguments
# Amount of towers to be generated pp, names of the players+
args = sys.argv

# Counter. The first name provided will be at index 2
index = 2

while len(args) > index:
    print(args[index])  # Print the name of the player
    for i in range(int(args[1])):
        print(random.choice(info.playable_characters))  # Print the random tower
    print()  # Print a newline (for readability)
    index = index + 1  # Increment the index

print(" ".join(random.choice(info.maps)))  # Print a random map
print(random.choice(info.difficulties))  # Print a random difficulty
