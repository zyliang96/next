import React from 'react';
import ReactDOM from 'react-dom';
import { Message, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const success = () => {
    Message.success({
        content: 'Message with custom className and style',
        className: 'custom-message',
        style: {
            marginTop: '50vh',
        },
    });
};

ReactDOM.render(
    <APAConfigProvider
        regionName="自定义样式"
        regionId="Message-custom-style-demo"
        regionDesc="展示如何自定义Message的样式"
        isRegiserChildren
    >
        <div>
            <Message className="custom-message" style={{ backgroundColor: 'rgba(3,193,253,.3)' }}>
                Customized Message
            </Message>
            <br />
            <br />
            <Button type="primary" onClick={success}>
                Customized style
            </Button>
        </div>
    </APAConfigProvider>,
    mountNode
);
