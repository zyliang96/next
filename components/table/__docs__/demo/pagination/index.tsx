import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Pagination } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const dataSource = j => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            result.push({
                title: { name: `Quotation for 1PCS Nano ${3 + i}.0 controller compatible` },
                id: 100306660940 + i + j,
                time: 2000 + j,
            });
        }
        return result;
    },
    render = (value, index, record) => {
        return <a href="javascript:;">Remove({record.id})</a>;
    };

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataSource(5),
        };
    }

    onChange = currentPage => {
        this.setState({
            loading: true,
        });
        setTimeout(() => {
            this.setState({
                dataSource: dataSource(currentPage * 5),
                loading: false,
            });
        }, 200);
    };
    render() {
        return (
            <APAConfigProvider
                regionName="Pagination示例"
                regionId="Table-pagination-demo"
                regionDesc="Pagination示例"
                isRegisterChildren
            >
                <div>
                    <Table dataSource={this.state.dataSource} loading={this.state.loading}>
                        <Table.Column title="Id1" dataIndex="id" width={140} />
                        <Table.Column title="Time" dataIndex="time" width={500} />
                        <Table.Column cell={render} width={200} />
                    </Table>
                    <Pagination onChange={this.onChange} className="page-demo" />
                </div>
            </APAConfigProvider>
        );
    }
}
ReactDOM.render(<App />, mountNode);
