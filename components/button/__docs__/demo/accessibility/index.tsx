import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Button无障碍Demo"
        regionId="Button-accessibility-demo"
        regionDesc="Button无障碍Demo"
        isRegiserChildren
    >
        <div>
            <Button.Group>
                <Button type="primary" aria-label="prompt button">
                    <Icon type="prompt" />
                </Button>
                <Button type="primary" aria-label="clock button">
                    <Icon type="clock" />
                </Button>
                <Button type="primary" aria-label="set button">
                    <Icon type="set" />
                </Button>
            </Button.Group>
        </div>
    </APAConfigProvider>,
    mountNode
);
