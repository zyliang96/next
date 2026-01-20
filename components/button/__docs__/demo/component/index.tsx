import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Box } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const props = {
    component: 'a' as const,
    href: 'http://www.alibaba.com',
    target: '_blank',
};

ReactDOM.render(
    <APAConfigProvider
        regionName="Button标签Demo"
        regionId="Button-label-demo"
        regionDesc="Button标签Demo"
        isRegisterChildren
    >
        <Box direction="row" spacing={20}>
            <Button {...props} type="primary">
                alibaba.com
            </Button>
            <Button {...props} type="secondary">
                alibaba.com
            </Button>
            <Button {...props} type="normal">
                alibaba.com
            </Button>
            <Button {...props} loading>
                alibaba.com loading
            </Button>
        </Box>
    </APAConfigProvider>,
    mountNode
);
