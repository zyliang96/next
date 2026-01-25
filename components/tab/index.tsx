import { APAConfigProvider } from '@alifd/apa-sdk';
import ConfigProvider from '../config-provider';
import Tab from './tab';
import Item from './tabs/tab-item';
import { assignSubComponent } from '../util/component';
import type { TabProps } from '../tab/types';

export type { TabProps, ItemProps } from './types';

const TabPane = ConfigProvider.config(Item, {
    transform: (props, deprecated) => {
        deprecated('Tab.TabPane', 'Tab.Item', 'Tab');
        return props;
    },
});

// 先用 APAConfigProvider 包装 Tab
const TabWithAPA = APAConfigProvider.config(Tab, {
    isRegisterChildren: true, // 需要注册子组件 Tab.Item
    desc: '标签页组件',
    props: [
        { key: 'activeKey', name: 'activeKey', desc: '当前激活的标签页' },
        { key: 'shape', name: 'shape', desc: '标签页的形状' },
        { key: 'size', name: 'size', desc: '标签页的尺寸' },
        { key: 'tabPosition', name: 'tabPosition', desc: '标签页的位置' },
        { key: 'excessMode', name: 'excessMode', desc: '超出模式' },
    ],
});

// 然后添加子组件（Item 已在 tab-item.tsx 中配置 APA）
const TabWithSub = assignSubComponent(TabWithAPA, {
    Item: Item,
    TabPane: TabPane,
});

// 最后用 ConfigProvider 包装
export default ConfigProvider.config(TabWithSub, {
    transform: (props: TabProps, deprecated) => {
        if ('type' in props) {
            deprecated('type', 'shape', 'Tab');
            const { type, ...others } = props;
            props = { shape: type, ...others };
        }
        if ('resDirection' in props) {
            const { resDirection, ...others } = props;

            let excessMode: TabProps['excessMode'];
            if (resDirection === 'horizontal') {
                deprecated('resDirection=horizontal', 'excessMode=slide', 'Tab');

                excessMode = 'slide';
            } else if (resDirection === 'vertical') {
                deprecated('resDirection=vertical', 'excessMode=dropdown', 'Tab');

                excessMode = 'dropdown';
            }
            props = { excessMode, ...others };
        }
        if ('tabBarExtraContent' in props) {
            deprecated('tabBarExtraContent', 'extra', 'Tab');
            const { tabBarExtraContent, ...others } = props;
            props = { extra: tabBarExtraContent, ...others };
        }

        return props;
    },
});
