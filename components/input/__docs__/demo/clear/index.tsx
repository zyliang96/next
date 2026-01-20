import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { InputProps } from '@alifd/next/types/input';

const onChange = (value: string) => {
    console.log(value);
};
const onBlur: InputProps['onBlur'] = e => {
    console.log(e);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="Input清除按钮Demo"
        regionId="Input-clear-demo"
        regionDesc="Input清除按钮示例"
        isRegisterChildren
    >
        <div>
            <Input
                hasClear
                defaultValue="clear by click"
                size="small"
                aria-label="input with config of hasClear"
                onChange={onChange}
            />
            <br />
            <br />

            <Input
                hasClear
                defaultValue="2019-09-10 10:10:20"
                aria-label="input with config of hasClear"
                onChange={onChange}
                onBlur={onBlur}
                hint="calendar"
            />
            <br />
            <br />

            <Input
                hasClear
                defaultValue="clear by click"
                size="large"
                aria-label="input with config of hasClear"
                hoverShowClear
                onChange={onChange}
            />
            <br />
            <br />
            <Input.TextArea
                hasClear
                defaultValue="clear by click"
                aria-label="input with config of hasClear"
                onChange={onChange}
            />
            <br />
            <br />
            <Input.TextArea
                hasClear
                defaultValue="clear by click"
                aria-label="input with config of hasClear"
                onChange={onChange}
                maxLength={100}
                showLimitHint
            />
            <br />
            <br />
        </div>
    </APAConfigProvider>,
    mountNode
);
