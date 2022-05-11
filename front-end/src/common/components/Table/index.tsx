import React, { FC, useState } from 'react';
import { TableStyles } from './styles';

type TableProps = {
  thead: any[];
  theadCheckbox?: boolean;
  onCheck?: () => any;
};

const Table: FC<TableProps> = ({ thead, children, theadCheckbox = false, onCheck }) => {
  return (
    <TableStyles>
      <div className="table-content">
        <table>
          <thead>
            <tr>
              {thead.map((item, index) => {
                return <th key={index}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </TableStyles>
  );
};

export default Table;
