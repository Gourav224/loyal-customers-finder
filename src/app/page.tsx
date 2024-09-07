"use client"

import { useState } from "react";
import Papa from "papaparse";

interface LogEntry {
    timestamp: string;
    pageId: string;
    customerId: string;
}

interface CustomerPages {
    [customerId: string]: Set<string>;
}

const parseLogFile = (log: string): LogEntry[] => {
    // Assuming the CSV file has no header row
    return Papa.parse(log, { header: false }).data.map((row) => ({
        timestamp: row[0],
        pageId: row[1],
        customerId: row[2],
    }));
};

const findLoyalCustomers = (
    day1Logs: LogEntry[],
    day2Logs: LogEntry[]
): string[] => {
    const day1Customers: CustomerPages = {};
    const day2Customers: CustomerPages = {};

    // Process Day 1 Logs
    day1Logs.forEach(({ customerId, pageId }) => {
        if (!day1Customers[customerId]) {
            day1Customers[customerId] = new Set();
        }
        day1Customers[customerId].add(pageId);
    });

    // Process Day 2 Logs
    day2Logs.forEach(({ customerId, pageId }) => {
        if (!day2Customers[customerId]) {
            day2Customers[customerId] = new Set();
        }
        day2Customers[customerId].add(pageId);
    });

    // Find loyal customers
    const loyalCustomers: string[] = [];

    for (const customerId in day1Customers) {
        const day1Pages = day1Customers[customerId];
        const day2Pages = day2Customers[customerId];
        if (day2Pages && day1Pages.size >= 2 && day2Pages.size >= 2) {
            loyalCustomers.push(customerId);
        }
    }

    return loyalCustomers;
};

export default function Home() {
    const [logFile1, setLogFile1] = useState<string>("");
    const [logFile2, setLogFile2] = useState<string>("");
    const [loyalCustomers, setLoyalCustomers] = useState<string[]>([]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setLogFile: (value: string) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            Papa.parse(file, {
                complete: (result) => {
                    const csvData = result.data as string[][];
                    const csvString = csvData
                        .map((row) => row.join(","))
                        .join("\n");
                    setLogFile(csvString);
                },
                header: false,
                skipEmptyLines: true,
            });
        }
    };

    const handleSubmit = () => {
        const day1Logs = parseLogFile(logFile1);
        const day2Logs = parseLogFile(logFile2);
        const customers = findLoyalCustomers(day1Logs, day2Logs);
        setLoyalCustomers(customers);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
                Loyal Customers Finder
            </h1>
            <div className="max-w-4xl mx-auto bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
                <div>
                    <label className="block text-gray-300">
                        Upload Day 1 Log File (CSV):
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileChange(e, setLogFile1)}
                        className="mt-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-300">
                        Upload Day 2 Log File (CSV):
                    </label>
                    <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleFileChange(e, setLogFile2)}
                        className="mt-2"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                    Find Loyal Customers
                </button>

                {loyalCustomers.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold">Loyal Customers:</h2>
                        <ul className="list-disc pl-5 mt-4">
                            {loyalCustomers.map((customerId, index) => (
                                <li key={index} className="text-gray-300">
                                    Customer ID: {customerId}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
