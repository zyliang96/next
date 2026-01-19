import Checkbox from './checkbox';
import Group from './checkbox-group';
import ConfigProvider from '../config-provider';
import { APAConfigProvider } from '@alifd/apa-sdk';
import { assignSubComponent } from '../util/component';

const CheckboxWithGroup = assignSubComponent(Checkbox, {
    Group: ConfigProvider.config(
        APAConfigProvider.config(Group, {
            isRegiserChildren: true,
            desc: '复选框组组件',
            props: [
                { key: 'value', name: 'value', desc: '当前选中的值列表' },
                { key: 'disabled', name: 'disabled', desc: '是否禁用所有复选框' },
                { key: 'direction', name: 'direction', desc: '布局方向' },
            ],
        }),
        {
            transform: /* istanbul ignore next */ (props, deprecated) => {
                if ('itemDirection' in props) {
                    deprecated('itemDirection', 'direction', 'Checkbox');
                    const { itemDirection, ...others } = props;

                    props = { direction: itemDirection, ...others };
                }

                return props;
            },
        }
    ),
});

export type { CheckboxProps, GroupProps, CheckboxData, ValueItem } from './types';

export default CheckboxWithGroup;
