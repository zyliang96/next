import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { InputProps } from '@alifd/next/types/input';

const onChange: InputProps['onChange'] = v => {
    console.log(v);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="Input输入框Demo"
        regionId="Input-basic-demo"
        regionDesc="Input输入框基础示例"
        isRegisterChildren
    >
        <div>
            <Input size="large" placeholder="Large" onChange={onChange} aria-label="Large" />
            <br />
            <br />

            <span id="J_InputMedium" style={{ display: 'none' }}>
                Aria Labelby Demo{' '}
            </span>
            <Input placeholder="Medium" aria-label="Medium" aria-labelledby="J_InputMedium" />
            <br />
            <br />

            <Input placeholder="Small" size="small" label="SIZE :" id="J_InputSmall" />
            <br />
            <br />

            <Input.TextArea placeholder="TextArea" aria-label="TextArea" />
        </div>
    </APAConfigProvider>,
    mountNode
);
