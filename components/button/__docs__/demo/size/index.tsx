import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Box } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Button尺寸Demo"
        regionId="Button-size-demo"
        regionDesc="Button尺寸Demo"
        isRegiserChildren
    >
        <div>
            <Box direction="row" spacing={20}>
                <Button type="primary" size="large" id="test1">
                    <Icon type="atm" />
                    Large
                </Button>
                <Button type="primary">
                    <Icon type="atm" />
                    Medium
                </Button>
                <Button type="primary" size="small">
                    <Icon type="atm" />
                    Small
                </Button>
            </Box>
            <br />
            <Button.Group size="large">
                <Button className="basic-button">Button</Button>
                <Button className="basic-button">Button</Button>
                <Button className="basic-button">Button</Button>
            </Button.Group>
        </div>
    </APAConfigProvider>,
    mountNode
);
