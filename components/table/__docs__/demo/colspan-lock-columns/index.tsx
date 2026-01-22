import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const columns = new Array(4).fill({
    dataIndex: 'data',
    title: 'Data',
    width: 200,
});
columns.unshift({
    dataIndex: 'id',
    title: 'Id',
    width: 100,
    lock: 'left',
});
columns.push({
    dataIndex: 'state',
    title: 'State',
    width: 200,
});
columns.push({
    title: 'Action',
    width: 100,
    align: 'center',
    cell: () => <Button>delete</Button>,
    lock: 'right',
});

const dataSource = [
    {
        id: 30000,
        data: '$13.02',
        state: 'normal',
    },
    {
        id: 30001,
        data: '$16.02',
        state: 'normal',
    },
    {
        id: 30002,
        data: '$63.0002',
        state: 'error',
    },
];

ReactDOM.render(
    <APAConfigProvider
        regionName="colspan锁列示例"
        regionId="Table-colspan-lock-columns-demo"
        regionDesc="colspan锁列示例"
        isRegisterChildren
    >
        <Table.StickyLock
            type="primary"
            dataSource={dataSource}
            cellProps={(rowIndex, colIndex) => {
                if (colIndex === 0) {
                    return {
                        colSpan: 1,
                        rowSpan: 2,
                    };
                }
                if (colIndex === columns.length - 1) {
                    return {
                        colSpan: 1,
                        rowSpan: 3,
                    };
                }
            }}
        >
            {columns.map((col, i) => {
                return <Table.Column key={i} {...col} />;
            })}
        </Table.StickyLock>
    </APAConfigProvider>,
    mountNode
);
