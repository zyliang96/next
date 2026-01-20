import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const onClose = () => console.log('onClose triggered!');
const afterClose = () => console.log('afterClose triggered!');

ReactDOM.render(
    <APAConfigProvider
        regionName="内联关闭"
        regionId="Message-inline-close-demo"
        regionDesc="展示带关闭按钮的内联消息"
        isRegisterChildren
    >
        <div>
            <Message title="title" closeable onClose={onClose} afterClose={afterClose}>
                Content Content Content Content
            </Message>
        </div>
    </APAConfigProvider>,
    mountNode
);
