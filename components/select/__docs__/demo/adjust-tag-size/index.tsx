import React from 'react';
import ReactDOM from 'react-dom';
import { Select } from '@alifd/next';
import { APAConfigProvider } from '@alifd/apa-sdk';

const dataSource = [
    { value: '10001', label: 'Lucy King' },
    { value: 10002, label: 'Lily King' },
    { value: 10003, label: 'Tom Cat' },
];

const style = { width: 200, marginRight: 8 };

ReactDOM.render(
    <APAConfigProvider
        regionName="调整标签尺寸"
        regionId="Select-adjust-tag-size-demo"
        regionDesc="标签尺寸是否和Select尺寸保持一致（仅在多选/标签模式下生效）"
        isRegisterChildren
    >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Select
                mode="multiple"
                value={['10001']}
                size={'small'}
                adjustTagSize
                dataSource={dataSource}
                style={style}
            />
            <Select
                mode="multiple"
                value={['10001']}
                adjustTagSize
                dataSource={dataSource}
                style={style}
            />
        </div>
    </APAConfigProvider>,
    mountNode
);
