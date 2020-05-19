import React from 'react';
import './FormsControls.css';

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={hasError ? 'form-control error' : 'form-control'}>
            {children}
            <span className={'form-control__error'}>{error}</span>
        </div>
    )
};

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea className={'form-control__textarea'} {...input} {...restProps}/>
        </FormControl>
    )
};

export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input className={'form-control__textarea'} {...input} {...restProps}/>
        </FormControl>
    )
};