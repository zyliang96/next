import React from 'react';
import ReactDOM from 'react-dom';
import { Overlay, Button, Input } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const { Popup } = Overlay;

ReactDOM.render(
    <APAConfigProvider
        regionName="Popup弹层"
        regionId="Overlay-popup-demo"
        regionDesc="Overlay Popup弹层示例"
        isRegiserChildren
    >
        <div>
            <Popup v2 trigger={<Button>Open</Button>} triggerType="click">
                <span className="overlay-demo">Hello World From Popup!</span>
            </Popup>
            <br />
            <br />
            <Popup
                v2
                trigger={<Input placeholder="Use Down Arrow to open" />}
                triggerType="click"
                triggerClickKeycode={[32, 40]}
            >
                <span className="overlay-demo">Hello World From Popup!</span>
            </Popup>
        </div>
    </APAConfigProvider>,
    mountNode
);
