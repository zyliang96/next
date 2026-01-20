import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Input前后扩展Demo"
        regionId="Input-addon-demo"
        regionDesc="Input前后扩展示例"
        isRegisterChildren
    >
        <div>
            <Input
                showLimitHint
                addonTextBefore="http://"
                addonTextAfter=".com"
                size="large"
                defaultValue="alibaba"
                maxLength={5}
                aria-label="input with config of addonTextBefore and addonTextAfter"
            />
            <br />
            <br />

            <Input
                addonTextBefore="http://"
                addonTextAfter=".com"
                size="medium"
                value="alibaba"
                aria-label="input with config of addonTextBefore and addonTextAfter"
            />
            <br />
            <br />

            <Input
                addonTextBefore="http://"
                addonTextAfter=".com"
                size="small"
                value="alibaba"
                aria-label="input with config of addonTextBefore and addonTextAfter"
            />
        </div>
    </APAConfigProvider>,
    mountNode
);
