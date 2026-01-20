import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import { type SelectProps } from '@alifd/next/types/select';
import { APAConfigProvider } from '@alifd/apa-sdk';

const Option = Select.Option;

class App extends React.Component {
    onChange: SelectProps['onChange'] = value => {
        console.log(value);
    };

    render() {
        return (
            <APAConfigProvider
                regionName="无障碍支持"
                regionId="Select-accessibility-demo"
                regionDesc="展示Select的无障碍支持，通过aria-labelledby对组件进行描述"
                isRegiserChildren
            >
                <div>
                    <span id="select-a11y">Select: </span>
                    <Select
                        onChange={this.onChange}
                        defaultValue="jack"
                        aria-labelledby="select-a11y"
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="frank">Frank</Option>
                        <Option value="hugo">Hugo</Option>
                    </Select>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<App />, mountNode);
