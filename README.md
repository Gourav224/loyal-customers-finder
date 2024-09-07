# Loyal Customers Finder

This project is a web application built with Next.js, TypeScript, and Tailwind CSS. It identifies "loyal customers" based on their activity logs from two different days. Loyal customers are those who visited at least two unique pages on both days.

## Features

- Upload CSV files for two different days.
- Process and analyze log data to identify loyal customers.
- Display a list of loyal customers.

## Requirements

- Node.js (version 16 or later)
- npm (or Yarn)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install additional dependencies:**

   For CSV parsing, you need `papaparse`:

   ```bash
   npm install papaparse
   # or
   yarn add papaparse
   ```

## Usage

1. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000).

2. **Upload CSV files:**

   - **Day 1 Log File:** Click the file input labeled "Upload Day 1 Log File (CSV)" and select your CSV file for Day 1.
   - **Day 2 Log File:** Click the file input labeled "Upload Day 2 Log File (CSV)" and select your CSV file for Day 2.

3. **Find Loyal Customers:**

   Click the "Find Loyal Customers" button to process the uploaded log files and display the list of loyal customers.

## Sample CSV Files

To test the application, you can use the following sample CSV files:

- **Day 1 Log File (`day1.csv`):**
  
  ```csv
  Timestamp,PageId,CustomerId
  2024-09-01T08:30:00,home,customer1
  2024-09-01T09:00:00,product,customer1
  2024-09-01T10:15:00,checkout,customer2
  2024-09-01T11:00:00,home,customer3
  2024-09-01T11:30:00,product,customer3
  2024-09-01T12:00:00,product,customer4
  ```

  [Download Day 1 Log File (`day1.csv`)](https://pastebin.com/raw/vz3gH9t1)

- **Day 2 Log File (`day2.csv`):**
  
  ```csv
  Timestamp,PageId,CustomerId
  2024-09-02T08:45:00,home,customer1
  2024-09-02T09:30:00,checkout,customer1
  2024-09-02T10:00:00,home,customer2
  2024-09-02T10:45:00,product,customer2
  2024-09-02T11:00:00,checkout,customer3
  2024-09-02T12:30:00,checkout,customer4
  2024-09-02T13:00:00,product,customer4
  ```

  [Download Day 2 Log File (`day2.csv`)](https://pastebin.com/raw/qzXQ8T9m)

Save these files on your local machine and use them to test the functionality of the application.

