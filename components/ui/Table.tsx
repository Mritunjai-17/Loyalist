import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Column<Row> = {
  key: string;
  header: string;
  numeric?: boolean;
  render: (row: Row) => ReactNode;
};

type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /** Accessible name for the scroll region and the table. */
  label: string;
  caption?: ReactNode;
  className?: string;
};

/** The first column is rendered as a row header. */
export function Table<Row>({ columns, rows, rowKey, label, caption, className }: TableProps<Row>) {
  return (
    <div className={cn("table-scroll", className)} tabIndex={0} role="region" aria-label={label}>
      <table className="data-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" data-numeric={col.numeric || undefined}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((col, index) =>
                index === 0 ? (
                  <th key={col.key} scope="row">
                    {col.render(row)}
                  </th>
                ) : (
                  <td key={col.key} data-numeric={col.numeric || undefined}>
                    {col.render(row)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
