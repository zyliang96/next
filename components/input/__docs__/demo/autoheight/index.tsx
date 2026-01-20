import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="TextArea自动高度Demo"
        regionId="Input-textarea-autoheight-demo"
        regionDesc="TextArea自动高度示例"
        isRegisterChildren
    >
        <div>
            <Input.TextArea
                autoHeight
                aria-label="auto height"
                placeholder="Press the Enter button continuously"
                onKeyDown={(e, opts) => {
                    console.log('onKeyDown', opts);
                }}
            />
            <br />
            <br />

            <Input.TextArea
                aria-label="auto height"
                autoHeight={{ minRows: 2, maxRows: 6 }}
                placeholder="Press the Enter button continuously"
            />
        </div>
    </APAConfigProvider>,
    mountNode
);
