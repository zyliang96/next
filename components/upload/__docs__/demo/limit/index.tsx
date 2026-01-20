import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Button } from '@alifd/next';
import type { UploadProps, UploadError } from '@alifd/next/types/upload';
import { APAConfigProvider } from '@alifd/apa-sdk';

const onError: UploadProps['onError'] = (file: UploadError, fileList: File[]) => {
    console.log('Exceed limit', file, fileList);
};

ReactDOM.render(
    <APAConfigProvider
        regionName="个数限制"
        regionId="Upload-limit-demo"
        regionDesc="展示 Upload 的个数限制"
        isRegisterChildren={true}
    >
        <div>
            <Upload
                action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                limit={2}
                multiple
                listType="text"
                onError={onError}
                defaultValue={[
                    {
                        name: 'IMG.png',
                        state: 'done',
                        size: 1024,
                        downloadURL:
                            'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
                        fileURL:
                            'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
                        imgURL: 'https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg',
                    },
                ]}
            >
                <Button type="primary" style={{ margin: '0 0 10px' }}>
                    Upload File
                </Button>
            </Upload>
        </div>
    </APAConfigProvider>,
    mountNode
);
