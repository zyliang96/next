import React from 'react';
import ReactDOM from 'react-dom';
import { Message, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const showSuccess = () => Message.success('success');
ReactDOM.render(
    <APAConfigProvider
        regionName="无障碍支持"
        regionId="Message-accessibility-demo"
        regionDesc="展示Message的无障碍特性"
        isRegisterChildren
    >
        <div className="message-toast-quick-demo">
            <Button type="primary" onClick={showSuccess}>
                success
            </Button>
        </div>
    </APAConfigProvider>,
    mountNode
);
