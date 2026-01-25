import { SyntheticEvent, MouseEvent as ReactMouseEvent } from 'react';

/**
 * 判断是否是 React 合成事件
 * @param event - 事件对象（可能是原生或合成事件）
 * @returns 是否为合成事件
 */
export function isSyntheticEvent(event: Event | SyntheticEvent | unknown): event is SyntheticEvent {
    if (!event || typeof event !== 'object') {
        return false;
    }

    // 方法1: 检查 nativeEvent（最可靠）
    if ('nativeEvent' in event && event.nativeEvent instanceof Event) {
        return true;
    }

    // 方法2: 检查 React 合成事件特有方法
    if (
        'isPropagationStopped' in event &&
        'isDefaultPrevented' in event &&
        typeof (event as any).isPropagationStopped === 'function' &&
        typeof (event as any).isDefaultPrevented === 'function'
    ) {
        return true;
    }

    return false;
}

/**
 * 创建一个 React 模拟鼠标事件
 * @param nativeEvent - 原生鼠标事件
 * @param target - 事件目标
 * @returns React 模拟鼠标事件
 */
export function createReactMouseSyntheticEvent(
    nativeEvent: MouseEvent | ReactMouseEvent<Element>,
    target?: EventTarget
) {
    if (isSyntheticEvent(nativeEvent)) {
        return nativeEvent as unknown as ReactMouseEvent<Element>;
    }
    if (!nativeEvent) {
        nativeEvent = new MouseEvent('click');
    }
    const syntheticEvent = {
        nativeEvent,
        currentTarget: null,
        target: target || null,
        bubbles: nativeEvent.bubbles,
        cancelable: nativeEvent.cancelable,
        defaultPrevented: nativeEvent.defaultPrevented,
        eventPhase: nativeEvent.eventPhase,
        isTrusted: nativeEvent.isTrusted,
        preventDefault: () => nativeEvent.preventDefault(),
        stopPropagation: () => nativeEvent.stopPropagation(),
        isDefaultPrevented: () => nativeEvent.defaultPrevented,
        isPropagationStopped: () => false,
        persist: () => {},
        timeStamp: nativeEvent.timeStamp,
        type: nativeEvent.type,
        // MouseEvent 特有属性
        altKey: false,
        button: 0,
        buttons: 0,
        clientX: 0,
        clientY: 0,
        ctrlKey: false,
        metaKey: false,
        movementX: 0,
        movementY: 0,
        pageX: 0,
        pageY: 0,
        relatedTarget: null,
        screenX: 0,
        screenY: 0,
        shiftKey: false,
        detail: 0,
        view: window,
        getModifierState: () => false,
    };
    return syntheticEvent as unknown as ReactMouseEvent<Element>;
}
