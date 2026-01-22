import React from 'react';
import ReactDOM from 'react-dom';
import { Table } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const onChange = function (...args) {
        console.log(...args);
    },
    dataSource = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push({
                title: {
                    name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible`,
                },
                id: 100306660940 + i,
                time: 2000 + i,
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a>Remove({record.id})</a>;
    },
    rowSelection = {
        onChange: onChange,
        getProps: record => {
            return {
                disabled: record.id === 100306660942,
            };
        },
    };

ReactDOM.render(
    <APAConfigProvider
        regionName="Row Selection Config示例"
        regionId="Table-row-selection-config-demo"
        regionDesc="Row Selection Config示例"
        isRegisterChildren
    >
        <Table dataSource={dataSource()} rowSelection={rowSelection}>
            <Table.Column title="Id" dataIndex="id" />
            <Table.Column title="Title" dataIndex="title.name" />
            <Table.Column title="Time" dataIndex="time" />
            <Table.Column cell={render} width={200} />
        </Table>
    </APAConfigProvider>,
    mountNode
);
