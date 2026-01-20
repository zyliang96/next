import React from 'react';
import ReactDOM from 'react-dom';
import { Radio } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const RadioGroup = Radio.Group;
ReactDOM.render(
    <APAConfigProvider
        regionName="无障碍支持"
        regionId="Radio-accessibility-demo"
        regionDesc="通过aria-labelledby给Group设置辅助技术可及的文本"
        isRegisterChildren
    >
        <div>
            <span id="radio-a11y">Programming language :</span>
            <RadioGroup aria-labelledby="radio-a11y">
                <Radio id="python" value="python">
                    python
                </Radio>
                <Radio id="java" value="java">
                    java
                </Radio>
                <Radio id="c" value="c">
                    c
                </Radio>
            </RadioGroup>
        </div>
    </APAConfigProvider>,
    mountNode
);
