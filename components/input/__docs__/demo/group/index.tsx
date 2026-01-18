import React from 'react';
import ReactDOM from 'react-dom';
import { Input, Select, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const select = (
    <Select aria-label="please select">
        <option value="https">https</option>
        <option value="http">http</option>
    </Select>
);
const button = <Button>search</Button>;

ReactDOM.render(
    <APAConfigProvider
        regionName="Input输入框组合Demo"
        regionId="Input-group-demo"
        regionDesc="Input输入框组合示例"
        isRegiserChildren
    >
        <div>
            <Input.Group addonBefore={select} addonAfter={button}>
                <Input
                    hasClear
                    defaultValue="abc"
                    style={{ width: '100%' }}
                    aria-label="please input"
                />
            </Input.Group>
            <br />
            <br />
            <Input addonTextAfter=".com" addonBefore={select} aria-label="please input" />
        </div>
    </APAConfigProvider>,
    mountNode
);
