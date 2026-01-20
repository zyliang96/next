import React from 'react';
import ReactDOM from 'react-dom';
import { Message, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const key = 'updatable';

const openMessage = () => {
    Message.loading({ content: 'Loading...', key });
    setTimeout(() => {
        Message.success({ content: 'Loaded!', key, duration: 2000 });
    }, 1000);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="更新消息"
        regionId="Message-update-message-demo"
        regionDesc="展示如何动态更新消息内容"
        isRegisterChildren
    >
        <Button type="primary" onClick={openMessage}>
            Open the message box
        </Button>
    </APAConfigProvider>,
    mountNode
);
