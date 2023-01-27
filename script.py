def get_middle_number(first_numbers):
    arr_result = []
    for first_number in first_numbers:
        second_number = (first_number + 52) - 1
        result = int((first_number + second_number) / 2)
        arr_result.append(result)
    return arr_result
    
 
def get_first_numbers(initial_value):
    arr_values = []
    prev_value = initial_value
    arr_values.append(initial_value)
    for i in range(9):
        prev_value = prev_value + 52
        print(prev_value)
        arr_values.append(prev_value)

    return arr_values


print(get_middle_number(get_first_numbers(1)))