import { useState, useMemo, useRef, useEffect } from 'react';
import Field, { type WatchCallback, type FieldOption as OriginalFieldOption } from '@alifd/field';
import { APAAction } from '@alifd/apa-sdk';
import { z } from 'zod';
import { log } from '../util';
import { scrollToFirstError, cloneAndAddKey } from './utils';
import type { FieldOption, FieldState, ValidateCallback, ValidatePromiseResults } from './types';

class NextField extends Field {
    static useField(options: FieldOption = {}): NextField {
        if (!useState || !useMemo) {
            log.warning('need react version > 16.8.0');
            // @ts-expect-error 在缺少对应 hook 的情况下应抛出异常，直接 return 会导致类型问题：useField 返回值可能为空，消费时类型很麻烦
            return;
        }
        return this.getUseField({ useMemo, useState })(options) as NextField;
    }

    static useWatch(field: Field, names: string[], callback: WatchCallback) {
        const callbackRef = useRef(callback);
        callbackRef.current = callback;

        // watch at render stage, field or names change will cause rewatch
        const unwatch = useMemo(() => {
            return field.watch(names, (...args) => {
                if (typeof callbackRef.current === 'function') {
                    callbackRef.current(...args);
                }
            });
        }, [field, names.join(',')]);

        useEffect(() => {
            // unwatch at uneffect stage
            return unwatch;
        }, [unwatch]);
    }

    constructor(com: unknown, options: FieldOption = {}) {
        // scrollToFirstError 选项的默认值设置放在 next field 里处理
        const { scrollToFirstError: scrollToFirstErrorOption = true } = options;
        const newOptions = Object.assign({}, options, {
            scrollToFirstError: scrollToFirstErrorOption,
            afterValidateRerender: scrollToFirstError,
            processErrorMessage: cloneAndAddKey,
        }) as unknown as OriginalFieldOption;
        super(com, newOptions);

        this.validate = this.validate.bind(this);
        this.reset = this.reset.bind(this);
    }

    /**
     * 校验全部字段 - callback 模式
     * @param callback - 校验结果的回调函数
     */
    validate(callback?: ValidateCallback): void;
    /**
     * 校验指定字段 - callback 模式
     * @param names - 字段名或字段名列表
     * @param callback - 校验结果回调函数
     */
    validate(names?: string | string[], callback?: ValidateCallback): void;
    /**
     * 校验 - callback version
     */
    @APAAction({
        name: 'validate',
        desc: '校验字段',
        params: z.tuple([z.array(z.string()).optional(), z.function().optional()]),
    })
    validate(names?: string | string[] | ValidateCallback, callback?: ValidateCallback) {
        if (typeof names === 'function') {
            return this.validateCallback(names);
        }
        return this.validateCallback(names, callback);
    }

    /**
     * 重置全部字段
     * @param backToDefault - 是否重置为默认值，默认 false
     * @deprecated 使用 resetToDefault() 代替 reset(true)
     */
    reset(backToDefault?: boolean): void;
    /**
     * 重置指定字段
     * @param names - 字段名
     * @param backToDefault - 是否重置为默认值，默认为 false
     * @deprecated 使用 resetToDefault(names) 代替 reset(names, true)
     */
    reset(names?: string | string[], backToDefault?: boolean): void;
    /**
     * 重置指定字段
     * @param names - 字段名
     */

    reset(names?: string | string[]): void;
    @APAAction({
        name: 'reset',
        desc: '重置字段',
        params: z.tuple([z.array(z.string()).optional(), z.boolean().optional()]),
    })
    reset(names?: string[] | string | boolean, backToDefault = false) {
        if (names === true) {
            log.deprecated('reset(true)', 'resetToDefault()', 'Field');
            this.resetToDefault();
        } else if (backToDefault === true) {
            log.deprecated('reset(ns,true)', 'resetToDefault(ns)', 'Field');
            this.resetToDefault(names || undefined);
        } else {
            super.reset(names || undefined);
        }
    }
    /**
     * 获取字段值
     * @param name - 字段名
     * @returns 字段值
     */
    @APAAction({ name: 'getValue', desc: '获取字段值', params: z.tuple([z.string()]) })
    getValue<T = unknown>(name: string): T | undefined {
        return super.getValue(name);
    }

    /**
     * 获取字段值
     * @param names - 字段名列表
     * @returns 字段值
     */
    @APAAction({ name: 'getValues', desc: '获取字段值', params: z.tuple([z.array(z.string())]) })
    getValues<T = Record<string, unknown>>(names?: string[]): T {
        return super.getValues(names);
    }

    /**
     * 设置字段值
     * @param name - 字段名
     * @param value - 字段值
     * @param reRender - 是否重新渲染
     * @param triggerChange - 是否触发 change 事件
     */
    @APAAction({
        name: 'setValue',
        desc: '设置字段值',
        params: z.tuple([z.string(), z.any(), z.boolean().optional(), z.boolean().optional()]),
    })
    setValue(name: string, value: unknown, reRender?: boolean, triggerChange?: boolean): void {
        return super.setValue(name, value, reRender, triggerChange);
    }

    /**
     * 设置字段值
     * @param fieldsValue - 字段值
     * @param reRender - 是否重新渲染
     */
    @APAAction({
        name: 'setValues',
        desc: '设置字段值',
        params: z.tuple([z.record(z.string(), z.any()), z.boolean().optional()]),
    })
    setValues(fieldsValue?: Record<string, unknown>, reRender?: boolean): void {
        return super.setValues(fieldsValue, reRender);
    }

    /**
     * 获取字段错误
     * @param name - 字段名
     * @returns 字段错误
     */
    @APAAction({ name: 'getError', desc: '获取字段错误', params: z.tuple([z.string()]) })
    getError(name: string): unknown[] | null {
        return super.getError(name);
    }

    /**
     * 获取字段错误
     * @param names - 字段名列表
     * @returns 字段错误
     */
    @APAAction({ name: 'getErrors', desc: '获取字段错误', params: z.tuple([z.array(z.string())]) })
    getErrors(names?: string[]): Record<string, unknown[] | null> {
        return super.getErrors(names);
    }

    /**
     * 设置字段错误
     * @param name - 字段名
     * @param errors - 字段错误
     */
    @APAAction({ name: 'setError', desc: '设置字段错误', params: z.tuple([z.string(), z.any()]) })
    setError(name: string, errors?: unknown): void {
        return super.setError(name, errors);
    }

    /**
     * 设置字段错误
     * @param fieldsErrors - 字段错误
     */
    @APAAction({
        name: 'setErrors',
        desc: '设置字段错误',
        params: z.tuple([z.record(z.string(), z.any())]),
    })
    setErrors(fieldsErrors?: Record<string, unknown>): void {
        return super.setErrors(fieldsErrors);
    }

    /**
     * 获取字段状态
     * @param name - 字段名
     * @returns 字段状态
     */
    @APAAction({ name: 'getState', desc: '获取字段状态', params: z.tuple([z.string()]) })
    getState(name: string): FieldState {
        return super.getState(name);
    }

    /**
     * 校验字段
     * 因为方法重载，在Agent中无法有效识别，所以只选择一个最推荐的方法进行描述
     * @param names - 字段名列表
     * @returns 校验结果
     */
    validatePromise(names?: string | string[]): Promise<ValidatePromiseResults>;
    validatePromise<FormatterResults>(
        formatter?: (
            results: ValidatePromiseResults
        ) => FormatterResults | Promise<FormatterResults>
    ): Promise<FormatterResults>;
    validatePromise<FormatterResults>(
        names?: string | string[],
        formatter?: (
            results: ValidatePromiseResults
        ) => FormatterResults | Promise<FormatterResults>
    ): Promise<FormatterResults>;
    @APAAction({
        name: 'validatePromise',
        desc: '校验字段',
        params: z.tuple([z.array(z.string()).optional()]),
    })
    validatePromise<FormatterResults>(
        namesOrFormatter?:
            | string
            | string[]
            | ((results: ValidatePromiseResults) => FormatterResults | Promise<FormatterResults>),
        formatter?: (
            results: ValidatePromiseResults
        ) => FormatterResults | Promise<FormatterResults>
    ): Promise<ValidatePromiseResults | FormatterResults> {
        if (typeof namesOrFormatter === 'function') {
            return super.validatePromise(namesOrFormatter);
        }
        return super.validatePromise(namesOrFormatter, formatter);
    }

    /**
     * 重置字段
     * @param names - 字段名列表
     * @returns 重置结果
     */
    @APAAction({
        name: 'resetToDefault',
        desc: '重置字段为默认值',
        params: z.tuple([z.array(z.string()).optional()]),
    })
    resetToDefault(names?: string | string[]): void {
        return super.resetToDefault(names);
    }
}

export * from './types';
export default NextField;
