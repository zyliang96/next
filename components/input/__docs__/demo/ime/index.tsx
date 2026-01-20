import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

function Demo() {
    const [value, setValue] = React.useState('');
    const handleChange = (value: string) => {
        console.log(value);
        setValue(value);
    };

    return (
        <div>
            <Input value={value} onChange={handleChange} composition placeholder="尝试输入中文" />{' '}
            <br />
            <br />
            <Input.TextArea
                value={value}
                onChange={handleChange}
                composition
                placeholder="尝试输入中文"
            />
        </div>
    );
}

ReactDOM.render(
    <APAConfigProvider
        regionName="Input中文输入法Demo"
        regionId="Input-ime-demo"
        regionDesc="Input中文输入法示例"
        isRegisterChildren
    >
        <Demo />
    </APAConfigProvider>,
    mountNode
);
