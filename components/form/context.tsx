import { createContext, useContext } from 'react';
import type NextField from '../field';

export interface FormContextValue {
    _formField: NextField | null;
    _formSize?: 'large' | 'medium' | 'small';
    _formDisabled?: boolean;
    _formPreview?: boolean;
    _formFullWidth?: boolean;
    _formLabelForErrorMessage?: boolean;
    _formMarginToDisplayHelp?: boolean;
}

const defaultContextValue: FormContextValue = {
    _formField: null,
    _formSize: undefined,
    _formDisabled: false,
    _formPreview: false,
    _formFullWidth: false,
    _formLabelForErrorMessage: false,
    _formMarginToDisplayHelp: false,
};

export const FormContext = createContext<FormContextValue>(defaultContextValue);

export const useFormContext = () => useContext(FormContext);

export const FormContextProvider = FormContext.Provider;
export const FormContextConsumer = FormContext.Consumer;
