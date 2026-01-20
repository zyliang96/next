import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import jsonp from 'jsonp';
import { type SelectProps } from '@alifd/next/types/select';
import { APAConfigProvider } from '@alifd/apa-sdk';

let timestamp = Date.now();

class Demo extends React.Component {
    state = {
        dataSource: [],
    };

    searchTimeout: number;

    handleSearch: SelectProps['onSearch'] = value => {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = window.setTimeout(() => {
            value
                ? jsonp(`https://suggest.taobao.com/sug?code=utf-8&q=${value}`, (err, data) => {
                      const dataSource = data.result.map((item: unknown[]) => ({
                          label: item[0],
                          value: (timestamp++).toString(36),
                      }));
                      this.setState({ dataSource });
                  })
                : this.setState({ dataSource: [] });
        }, 100);
    };

    render() {
        return (
            <Select
                showSearch
                placeholder="input to search"
                filterLocal={false}
                dataSource={this.state.dataSource}
                onSearch={this.handleSearch}
                style={{ width: 200 }}
            />
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="远程搜索"
        regionId="Select-select-search-demo"
        regionDesc="使用showSearch显示搜索框，如果需要动态更新dataSource，需要关闭filterLocal"
        isRegisterChildren
    >
        <Demo />
    </APAConfigProvider>,
    mountNode
);
