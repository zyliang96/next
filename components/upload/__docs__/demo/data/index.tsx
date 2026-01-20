import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Button } from '@alifd/next';
import { type UploadProps } from '@alifd/next/types/upload';
import { APAConfigProvider } from '@alifd/apa-sdk';

const beforeUpload: UploadProps['beforeUpload'] = info => {
    console.log('beforeUpload callback : ', info);
};

const onChange: UploadProps['onChange'] = info => {
    console.log('onChange callback : ', info);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="添加上传参数"
        regionId="Upload-data-demo"
        regionDesc="展示 Upload 的添加上传参数"
        isRegisterChildren={true}
    >
        <Upload
            listType="text"
            action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            data={{ token: 'abcd' }}
            beforeUpload={beforeUpload}
            onChange={onChange}
            defaultValue={[
                {
                    name: 'IMG.png',
                    state: 'done',
                    size: 1024,
                    downloadURL:
                        'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
                    imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
                },
            ]}
        >
            <Button type="primary" style={{ margin: '0 0 10px' }}>
                Upload File
            </Button>
        </Upload>
    </APAConfigProvider>,
    mountNode
);
