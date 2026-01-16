import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Box } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="Button按钮Demo"
        regionId="Button-demo"
        regionDesc="Button按钮Demo"
        isRegiserChildren
    >
        <div>
            <Box direction="row" spacing={20}>
                <Button type="normal">Normal</Button>
                <Button type="primary">primary</Button>
                <Button type="secondary">Secondary</Button>
            </Box>
            <br />
            <Box direction="row" spacing={20}>
                <Button type="normal" text>
                    Normal
                </Button>
                <Button type="primary" text>
                    Primary
                </Button>
                <Button type="secondary" text>
                    Secondary
                </Button>
            </Box>
            <br />
            <Box direction="row" spacing={20}>
                <Button type="normal" warning>
                    Normal
                </Button>
                <Button type="primary" warning>
                    Primary
                </Button>
            </Box>
        </div>
    </APAConfigProvider>,
    mountNode
);
