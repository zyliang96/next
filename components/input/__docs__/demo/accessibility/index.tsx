import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { InputProps } from '@alifd/next/types/input';

const onChange: InputProps['onChange'] = v => {
    console.log(v);
};
const onKeyDown: InputProps['onKeyDown'] = v => {
    console.log(v);
};
ReactDOM.render(
    <APAConfigProvider
        regionName="Input无障碍支持Demo"
        regionId="Input-accessibility-demo"
        regionDesc="Input无障碍支持示例"
        isRegiserChildren
    >
        <div>
            <Input
                size="large"
                placeholder="please input"
                onChange={onChange}
                onKeyDown={onKeyDown}
                aria-label="this is input"
            />
        </div>
    </APAConfigProvider>,
    mountNode
);
