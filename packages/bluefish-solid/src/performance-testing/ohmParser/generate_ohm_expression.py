# randomly generate an arithmetic expression with * and + operators (as well as parantheses) that can be used for testing the ohm parser 
import random

def generate_string_expression(num_constants, max_open_parens, open_parens_thresh, close_parens_thresh):
    expression = ""
    open_parens = 0
    for i in range(num_constants):
        if open_parens < max_open_parens:
            if(random.random() > open_parens_thresh):
                # create another open parenthesis
                expression += "("
                open_parens += 1
        
        expression += str(random.randint(0, 10))

        if open_parens > 0:
            if(random.random() > close_parens_thresh):
                # remove an open parenthesis
                expression += ")"
                open_parens -= 1
        
        if i != num_constants - 1:
            expression += "+" if random.random() > 1 else "*" # randomly add an operator

    for i in range(open_parens):
        expression += ")"
    
    return expression
    
# -------------- PARAMETERS --------------
num_constants = 10         # number of constants in expression
max_open_parens = 5      # maximum number of open parentheses at a time
open_parens_thresh = 0.66   # probability that a opening parenthesis will appear before a constant in the expression
close_parens_thresh = 0.66  # probability that a closing parenthesis will appear after a constant in the expression (given there are open parentheses)
# ----------------------------------------

expression = generate_string_expression(num_constants, max_open_parens, open_parens_thresh, close_parens_thresh)
print("Expression Length:", len(expression))
# Write the generated expression to a TypeScript file
with open("ohm_expression.ts", "w") as ts_file:
    ts_file.write(f"export const expression = \"{expression}\";")
