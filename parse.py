import csv

def read_csv_with_header(file_path):
    """
    Reads a CSV file and returns a list of dictionaries, 
    where each dictionary represents a row and keys are the headers.

    Args:
        file_path (str): The path to the CSV file.

    Returns:
        list: A list of dictionaries representing the CSV data, or None if an error occurs.
    """
    try:
        with open(file_path, 'r') as file:
            reader = csv.DictReader(file)
            return list(reader)
    except FileNotFoundError:
        print(f"Error: File not found at '{file_path}'")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

# Example usage:
file_path = 'export.csv'
data = read_csv_with_header(file_path)

if data:
    print(data[0])