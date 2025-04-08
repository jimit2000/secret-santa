# Digital XC Project

## Overview

The Digital XC project processes employee data from CSV files to associate employees with their children and generates a new CSV file with the processed information.

## Project Structure

- **input/**: Contains input CSV files.
  - **data.csv**: Employee data including names and email addresses.
  - **prev-year-data.csv**: Previous year employee data for comparison.
- **output/**: Contains the generated output CSV file.
  - **[timestamp]-output.csv**: Processed employee data with associated child information.
- **index.js**: Main application logic for reading, processing, and writing CSV data.
- **package.json**: npm configuration file listing dependencies and scripts.
- **README.md**: Documentation for the project.

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.

## Usage

Run the application using the command:

```
node index.js
```

This will read the input CSV files, process the data, and generate an output CSV file in the output directory.

## Dependencies

- fs: File system module for reading and writing files.
- csv-parser: Library for parsing CSV files.
- json2csv: Library for converting JSON data to CSV format.
