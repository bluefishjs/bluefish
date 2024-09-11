import random

def generate_random_array_and_write_to_ts(size):
    # Generate a random array of integers between 0 and 99 inclusive
    random_array = [random.randint(0, 99) for _ in range(size)]

    # Write the array to a TypeScript file
    with open("insertionSortProps.ts", "w") as file:
        file.write(f"export const sortProps = {random_array};\n")


# -------------- PARAMETERS --------------
num_elements = 10 # number of elements in array to generate
# ----------------------------------------

generate_random_array_and_write_to_ts(num_elements)
