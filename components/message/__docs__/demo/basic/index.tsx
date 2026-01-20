import React from 'react';
import ReactDOM from 'react-dom';
import { Message, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const notice = () => {
    Message.notice('This is a Toast Message Notice');
};

ReactDOM.render(
    <APAConfigProvider
        regionName="基本使用"
        regionId="Message-basic-demo"
        regionDesc="展示Message的基本用法，包括内联消息和Toast消息"
        isRegisterChildren
    >
        <div>
            <Message type="notice">This is an Inline Message Notice</Message>
            <br />
            <Button type="primary" onClick={notice}>
                Display Toast Message Notice
            </Button>
        </div>
    </APAConfigProvider>,
    mountNode
);
