import React from "react";
import { ICep } from "@/types/cep";

interface TableComponentProps<T extends ICep> {
  columns: string[];
  data: T[];
}

const TableComponent = <T extends ICep>({ columns, data }: TableComponentProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column} className="py-2 px-4 border-b border-gray-200">
                  {String(row[column as keyof T] || "Não informado")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;