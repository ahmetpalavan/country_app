import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from "@/components/ui/table";

interface TableProps {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
  onRowClick: (rowIndex: number) => void;
  selectedCountryCode: string | null;
}

const TableComponent: React.FC<TableProps> = ({ caption, headers, rows, onRowClick, selectedCountryCode }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  const handleRowClick = (rowIndex: number) => {
    if (selectedRowIndex === rowIndex) {
      setSelectedRowIndex(null);
      onRowClick(-1);
    } else {
      setSelectedRowIndex(rowIndex);
      onRowClick(rowIndex);
    }
  };

  useEffect(() => {
    if (selectedCountryCode) {
      const rowIndex = rows.findIndex((row) => row[0] === selectedCountryCode);
      if (rowIndex !== -1) {
        setSelectedRowIndex(rowIndex);
      }
    }
    console.log("selectedCountryCode", selectedCountryCode);
  }, [selectedCountryCode]);

  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableCell className="text-rose-500" key={index}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            onClick={() => handleRowClick(rowIndex)}
            className={`cursor-pointer ${
              row[0] === selectedCountryCode || rowIndex === selectedRowIndex
                ? "bg-blue-500 text-white"
                : rowIndex % 2 === 0
                ? "bg-white"
                : "bg-gray-200"
            }`}
          >
            {row.map((cell, cellIndex) => (
              <TableCell className="w-1/6" key={cellIndex}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
