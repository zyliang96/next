import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

ReactDOM.render(
    <APAConfigProvider
        regionName="消息类型"
        regionId="Message-type-demo"
        regionDesc="展示不同类型的消息提示"
        isRegisterChildren
    >
        <div className="message-type-demo">
            <Message title="Success" type="success">
                Content Content Content Content
            </Message>
            <Message title="Warning" type="warning">
                Content Content Content Content
            </Message>
            <Message title="Error" type="error">
                Content Content Content Content
            </Message>
            <Message title="Notice" type="notice">
                Content Content Content Content
            </Message>
            <Message title="Help" type="help">
                Content Content Content Content
            </Message>
            <Message title="Loading" type="loading">
                Content Content Content Content
            </Message>
        </div>
    </APAConfigProvider>,
    mountNode
);
