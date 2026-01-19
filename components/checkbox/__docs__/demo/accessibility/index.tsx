import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const CheckboxGroup = () => (
    <div>
        <p>Programming language：</p>
        <Checkbox.Group aria-label="Please select a programming language">
            <Checkbox value="python">python</Checkbox>
            <Checkbox value="java">java</Checkbox>
            <Checkbox value="angular">angular</Checkbox>
            <Checkbox value="c">c</Checkbox>
            <Checkbox value="other">other</Checkbox>
        </Checkbox.Group>
    </div>
);

ReactDOM.render(
    <APAConfigProvider
        regionName="无障碍支持"
        regionId="Checkbox-accessibility-demo"
        regionDesc="Checkbox无障碍支持示例"
        isRegiserChildren
    >
        <CheckboxGroup />
    </APAConfigProvider>,
    mountNode
);
