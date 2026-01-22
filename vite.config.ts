import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                parserOpts: {
                    plugins: ['decorators-legacy'],
                },
                plugins: [
                    // 启用装饰器支持（legacy 模式，与 TypeScript experimentalDecorators 兼容）
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                ],
            },
        }),
        {
            name: 'apa-sdk-alias',
            config() {
                return {
                    resolve: {
                        alias: [
                            {
                                find: /^moment$/,
                                replacement: 'moment/moment.js',
                            },
                            {
                                find: '@alifd/apa-sdk',
                                replacement: path.resolve(__dirname, 'dependencies/apa-sdk/esm'),
                            },
                        ],
                    },
                };
            },
        },
    ],
});
