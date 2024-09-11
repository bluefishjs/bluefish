import random
import json

def generate_random_value(max_depth, current_depth=0, existing_vars=None):
    if current_depth >= max_depth or random.random() < 0.7:
        return str(random.randint(1, 100))
    elif existing_vars and random.random() < 0.8:
        return f"{random.choice(list(existing_vars.keys()))}"
    else:
        return generate_random_array(random.randint(1, 5), max_depth, current_depth + 1)

def generate_random_array(size, max_depth, current_depth=0, existing_vars=None):
    return [generate_random_value(max_depth, current_depth, existing_vars) for _ in range(size)]


def process_array(array_values, lookup, address_counter, existing_vars):
    processed_values = []

    lookup[address_counter] = processed_values
    num_values = 0

    for value in array_values:
        if isinstance(value, list):
            # Recurse on nested arrays
            processed_values.append({"type": "pointer", "value": address_counter + 1})
            nested_processed, new_address_counter, nested_values = process_array(value, lookup, address_counter + 1, existing_vars)
            num_values += nested_values + 1
            # process.append({"type": "tuple", "values": nested_processed})
            address_counter = new_address_counter
        elif isinstance(value, str) and value.startswith("var"):
            var_name = value
            var_address = existing_vars[var_name]
            processed_values.append({"type": "pointer", "value": var_address})
            num_values += 1
        else:
            processed_values.append(value)
            num_values += 1

    if len(array_values) == 0:
        num_values = 1
    return lookup, address_counter, num_values


def convert_array_to_string(array):
    items = []
    for item in array:
        if isinstance(item, list):
            items.append(convert_array_to_string(item))
        elif isinstance(item, str) and item.startswith("var"):
            items.append(item)
        else:
            items.append(f"'{item}'")
    return "[" + ", ".join(items) + "]"

def generate_program_and_props(num_variables, min_size, max_size, max_depth):
    program_lines = []
    stack = []
    heap = []
    heapArrangement = []
    address_counter = 0
    variables = {}
    total_size = 0

    for i in range(num_variables):
        # Generate the list for the variable
        array_size = random.randint(min_size, max_size)
        array_values = generate_random_array(array_size, max_depth, existing_vars=variables)

        # Convert array values to strings, handling variable references without quotes
        array_values_str = convert_array_to_string(array_values)
        program_lines.append(f"var{i} = {array_values_str}")

        # Process the array and update the heap
        lookupdict = {}
        processed_dict, new_address_counter, num_values = process_array(array_values, lookupdict, address_counter, variables)
        stack.append({"variable": f"var{i}", "value": {"type": "pointer", "value": address_counter}})
        variables[f"var{i}"] = address_counter
        total_size += num_values

        min_index = min(processed_dict.keys())
        max_index = max(processed_dict.keys())
        tuple_vals = []

        for index in range(min_index, max_index + 1):
            heap.append({"type": "tuple", "values": processed_dict[index]})

        heapArrangement.append([index for index in range(min_index, max_index + 1)])
        address_counter = new_address_counter + 1

    # Generate the Python program
    program = "\n".join(program_lines)

    # Generate the PythonTutorProps object
    props = {
        "stack": stack,
        "heap": heap,
        "heapArrangement": heapArrangement
    }

    return program, props, total_size

# -------------- PARAMETERS --------------
num_variables = 5 # controls how many variables are generated in global frame
min_size = 1 # controls min size of tuples
max_size = 3 # controls max size of tuples
max_depth = 5 # controls max level of nesting (level for array of arrays)
# ----------------------------------------


program, props, total_size = generate_program_and_props(num_variables, min_size, max_size, max_depth)
print(total_size)
# Write the generated Python program to a file
with open("pythonTutorProgram.py", "w") as python_file:
    python_file.write(program)

# Write the generated PythonTutorProps object to a TypeScript file
with open("pythonTutorProps.ts", "w") as ts_file:
    ts_file.write(f"export const pythonProps = {json.dumps(props, indent=2)};")
