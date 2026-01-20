import React from 'react';
import ReactDOM from 'react-dom';
import { Message, Button } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const show = () => {
    Message.show({
        type: 'loading',
        content: 'Will be closed after 3 seconds or manually click on the close button',
        afterClose: () => console.log('Closed the toast'),
    });
};
const hide = () => Message.hide();

ReactDOM.render(
    <APAConfigProvider
        regionName="Toast消息"
        regionId="Message-toast-demo"
        regionDesc="展示Toast形式的消息提示"
        isRegisterChildren
    >
        <div className="message-toast-demo">
            <Button type="primary" onClick={show}>
                Show
            </Button>
            <Button type="primary" onClick={hide}>
                Hide
            </Button>
        </div>
    </APAConfigProvider>,
    mountNode
);
