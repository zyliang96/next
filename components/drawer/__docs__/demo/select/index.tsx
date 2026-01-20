import React from 'react';
import ReactDOM from 'react-dom';
import { Radio, Drawer, Select } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';
import type { SelectProps } from '@alifd/next/types/select';
import type { RadioProps } from '@alifd/next/types/radio';

const Option = Select.Option;

const onChange: SelectProps['onChange'] = value => {
    console.log(value);
};

const onBlur: SelectProps['onBlur'] = e => {
    console.log(/onblur/, e);
};

const onToggleHighlightItem: SelectProps['onToggleHighlightItem'] = (item, type) => {
    console.log(item, type);
};

class Demo extends React.Component {
    state = {
        placement: 'right',
    };

    onPlacementChange: RadioProps['onChange'] = dir => {
        this.setState({
            placement: dir,
        });
    };

    render() {
        const drawerProps = {
            placement: this.state.placement,
            closeMode: 'mask',
            bodyStyle: { padding: 0 },
        };
        return (
            <APAConfigProvider
                regionName="抽屉式选择"
                regionId="Drawer-select-demo"
                regionDesc="将 Select 的弹出模式换成 Drawer"
                isRegisterChildren
            >
                <div>
                    <Radio.Group
                        dataSource={['right', 'bottom', 'left', 'top']}
                        defaultValue={'right'}
                        onChange={this.onPlacementChange}
                    />
                    <br />
                    <br />
                    <Select
                        id="basic-demo"
                        popupComponent={Drawer}
                        popupProps={drawerProps}
                        autoWidth={false}
                        onChange={onChange}
                        onBlur={onBlur}
                        onToggleHighlightItem={onToggleHighlightItem}
                        defaultValue="jack"
                        aria-label="name is"
                        hasClear
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="frank">Frank</Option>
                        <Option value="hugo">Hugo</Option>
                    </Select>
                </div>
            </APAConfigProvider>
        );
    }
}

ReactDOM.render(<Demo />, mountNode);
