import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Drawer } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const Demo = () => {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [width, setWidth] = useState(200);

    return (
        <APAConfigProvider
            regionName="宽高"
            regionId="Drawer-size-demo"
            regionDesc="可以通过 width 设置容器宽度，或者设置 width=auto 自适应内容宽度"
            isRegiserChildren
        >
            <div>
                <Button type="primary" onClick={() => setVisible(true)}>
                    {' '}
                    fixed 700{' '}
                </Button>
                <Drawer
                    v2
                    width={700}
                    title="set width to 700"
                    placement="right"
                    visible={visible}
                    onClose={() => setVisible(false)}
                >
                    Start your business here by searching a popular product
                </Drawer>
                <Button type="primary" onClick={() => setVisible2(true)} style={{ marginLeft: 8 }}>
                    {' '}
                    auto width
                </Button>
                <Drawer
                    v2
                    width="auto"
                    title="auto width"
                    placement="right"
                    visible={visible2}
                    onClose={() => setVisible2(false)}
                >
                    <div style={{ width: width }}>
                        Start your business here by searching a popular product
                        <br />
                        <br />
                        <Button type="primary" onClick={() => setWidth(width + 100)}>
                            larger width
                        </Button>
                    </div>
                </Drawer>
            </div>
        </APAConfigProvider>
    );
};

ReactDOM.render(<Demo />, mountNode);
