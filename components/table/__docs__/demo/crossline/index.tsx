import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const dataSource = () => {
    const result = [];
    for (let i = 0; i < 5; i++) {
        result.push({
            title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
            id: 100306660940 + i,
            time: 2000 + i,
        });
    }
    return result;
};
const render = current => {
    return <a> remove {current}</a>;
};

ReactDOM.render(
    <APAConfigProvider
        regionName="十字参考轴"
        regionId="Table-crossline-demo"
        regionDesc="十字参考轴示例"
        isRegisterChildren
    >
        <Table dataSource={dataSource()} crossline>
            <Table.Column title="Id" dataIndex="id" />
            <Table.Column title="Title" dataIndex="title.name" />
            <Table.Column title="Time" dataIndex="time" />
            <Table.Column title="Operation" dataIndex="id" cell={render} />
        </Table>
    </APAConfigProvider>,
    mountNode
);
