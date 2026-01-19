import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Button幽灵状态Demo"
        regionId="Button-ghost-demo"
        regionDesc="Button幽灵状态Demo"
        isRegiserChildren
    >
        <div style={{ clear: 'both' }}>
            <div className="ghost-light-background">
                <Button ghost="light">Ghost light</Button>
            </div>
            <div className="ghost-dark-background">
                <Button ghost="dark">Ghost dark</Button>
            </div>
        </div>
    </APAConfigProvider>,
    mountNode
);
