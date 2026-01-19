import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Button组Demo"
        regionId="Button-group-demo"
        regionDesc="Button组Demo"
        isRegiserChildren
    >
        <div>
            <Button.Group style={{ marginRight: 20 }}>
                <Button type="primary">OK</Button>
                <Button type="secondary">Cancel</Button>
            </Button.Group>

            <Button.Group>
                <Button disabled>Left</Button>
                <Button disabled>Middle</Button>
                <Button disabled>Right</Button>
            </Button.Group>
            <br />
            <br />

            <Button.Group style={{ marginRight: 20 }}>
                <Button type="primary">
                    <Icon type="arrow-left" /> Backward
                </Button>
                <Button type="primary">
                    Forward <Icon type="arrow-right" />
                </Button>
            </Button.Group>

            <Button.Group>
                <Button type="primary">
                    <Icon type="prompt" />
                </Button>
                <Button type="primary">
                    <Icon type="clock" />
                </Button>
                <Button type="primary">
                    <Icon type="set" />
                </Button>
            </Button.Group>
        </div>
    </APAConfigProvider>,
    mountNode
);
