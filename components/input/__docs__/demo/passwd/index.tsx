import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

function onChange(v: string) {
    console.log(v);
}

ReactDOM.render(
    <APAConfigProvider
        regionName="Password密码输入框Demo"
        regionId="Input-password-demo"
        regionDesc="Password密码输入框示例"
        isRegiserChildren
    >
        <div>
            <Input.Password placeholder="please input password" onChange={onChange} />
            <br />
            <br />
            <Input.Password size="large" placeholder="please input password" onChange={onChange} />
            <br />
            <br />
            <Input.Password size="small" placeholder="please input password" onChange={onChange} />
            <br />
            <br />
        </div>
    </APAConfigProvider>,
    mountNode
);
