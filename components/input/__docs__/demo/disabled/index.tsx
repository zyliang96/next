import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Input禁用状态Demo"
        regionId="Input-disabled-demo"
        regionDesc="Input禁用状态示例"
        isRegiserChildren
    >
        <div>
            <Input disabled aria-label="disabled" placeholder="disabled" size="small" />
            <br />
            <br />

            <Input
                disabled
                aria-label="disabled"
                addonTextBefore="http://"
                addonTextAfter=".com"
                size="medium"
                value="alibaba"
            />
            <br />
            <br />

            <Input
                disabled
                aria-label="disabled"
                placeholder="medium"
                maxLength={10}
                showLimitHint
            />
            <br />
            <br />

            <Input.TextArea
                disabled
                aria-label="disabled"
                placeholder="medium"
                maxLength={10}
                showLimitHint
            />
        </div>
    </APAConfigProvider>,
    mountNode
);
