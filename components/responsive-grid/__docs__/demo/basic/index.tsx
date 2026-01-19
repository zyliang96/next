import React from 'react';
import ReactDOM from 'react-dom';
import { ResponsiveGrid, Radio } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const { Cell } = ResponsiveGrid;

const ds = ['desktop', 'tablet', 'phone'];

type DemoState = { device: 'phone' | 'tablet' | 'desktop' };
class Demo extends React.Component {
    state = {
        device: 'desktop',
    };
    onChange = (device: DemoState['device']) => {
        this.setState({
            device,
        });
    };
    render() {
        const { device } = this.state;
        return (
            <div className="list">
                <Radio.Group
                    shape="button"
                    onChange={this.onChange}
                    dataSource={ds}
                    defaultValue="desktop"
                />
                <br />
                <br />
                <div className={`list-item ${device}`}>
                    <ResponsiveGrid gap={10} device={device as DemoState['device']}>
                        <Cell className="mygrid grid-12" colSpan={12}>
                            12
                        </Cell>
                        <Cell className="mygrid grid-6" colSpan={6}>
                            6
                        </Cell>
                        <Cell className="mygrid grid-6" colSpan={6}>
                            6
                        </Cell>
                        <Cell className="mygrid grid-4" colSpan={4}>
                            4
                        </Cell>
                        <Cell className="mygrid grid-4" colSpan={4}>
                            4
                        </Cell>
                        <Cell className="mygrid grid-4" colSpan={4}>
                            4
                        </Cell>
                        <Cell className="mygrid grid-3" colSpan={3}>
                            3
                        </Cell>
                        <Cell className="mygrid grid-3" colSpan={3}>
                            3
                        </Cell>
                        <Cell className="mygrid grid-3" colSpan={3}>
                            3
                        </Cell>
                        <Cell className="mygrid grid-3" colSpan={3}>
                            3
                        </Cell>
                    </ResponsiveGrid>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <APAConfigProvider
        regionName="响应式网格布局组件基本使用示例"
        regionId="responsive-grid-basic-demo"
        regionDesc="响应式网格布局组件基本使用示例"
        isRegiserChildren
    >
        <Demo />
    </APAConfigProvider>,
    mountNode
);
