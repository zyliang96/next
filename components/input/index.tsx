import ConfigProvider from '../config-provider';
import { APAConfigProvider } from '@alifd/apa-sdk';
import Input from './input';
import Password from './password';
import TextArea from './textarea';
import Group from './group';
import { assignSubComponent } from '../util/component';

export type { InputProps, PasswordProps, TextAreaProps, GroupProps, OnKeyDownOpts } from './types';

const InputWithSub = assignSubComponent(Input, {
    Password: ConfigProvider.config(
        APAConfigProvider.config(Password, {
            isRegiserChildren: false,
            desc: '密码输入框组件',
            props: [
                { key: 'value', name: 'value', desc: '密码输入框当前的值' },
                { key: 'disabled', name: 'disabled', desc: '是否禁用密码输入框' },
                { key: 'showToggle', name: 'showToggle', desc: '是否显示密码可见性切换按钮' },
            ],
        }),
        {
            exportNames: ['getInputNode', 'focus'],
            transform: (props, deprecated) => {
                if ('hasLimitHint' in props) {
                    deprecated('hasLimitHint', 'showLimitHint', 'Input');
                    const { hasLimitHint, ...others } = props;

                    props = { showLimitHint: hasLimitHint, ...others };
                }

                return props;
            },
        }
    ),
    TextArea: ConfigProvider.config(
        APAConfigProvider.config(TextArea, {
            isRegiserChildren: false,
            desc: '文本域组件',
            props: [
                { key: 'value', name: 'value', desc: '文本域当前的值' },
                { key: 'disabled', name: 'disabled', desc: '是否禁用文本域' },
                { key: 'placeholder', name: 'placeholder', desc: '文本域占位符文本' },
                { key: 'maxLength', name: 'maxLength', desc: '文本域最大字符长度' },
                { key: 'rows', name: 'rows', desc: '文本域显示的行数' },
                { key: 'autoHeight', name: 'autoHeight', desc: '是否自动调整高度' },
            ],
        }),
        {
            exportNames: ['getInputNode', 'focus'],
            transform: (props, deprecated) => {
                if ('hasLimitHint' in props) {
                    deprecated('hasLimitHint', 'showLimitHint', 'Input');
                    const { hasLimitHint, ...others } = props;

                    props = { showLimitHint: hasLimitHint, ...others };
                }

                return props;
            },
        }
    ),
    Group,
});

export default ConfigProvider.config(InputWithSub, {
    exportNames: ['getInputNode', 'focus'],
    transform: (props, deprecated) => {
        if ('hasLimitHint' in props) {
            deprecated('hasLimitHint', 'showLimitHint', 'Input');
            const { hasLimitHint, ...others } = props;

            props = { showLimitHint: hasLimitHint, ...others };
        }

        return props;
    },
});
