import { useThemeProps } from '@mui/system';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type LongTextFieldProps = FieldProps<string, TextFieldProps>;

const LongText = (props: LongTextFieldProps) => {
  const {
    disabled,
    error,
    errorMessage,
    helperText,
    inputRef,
    label,
    name,
    onChange,
    placeholder,
    readOnly,
    showInlineError,
    type = 'text',
    value,
    ...rest
  } = props;
  const themeProps = useThemeProps({ props, name: 'MuiTextField' });

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={themeProps?.fullWidth ?? true}
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{ ...themeProps?.inputProps, readOnly }}
      label={label}
      margin={themeProps?.margin ?? 'dense'}
      multiline
      name={name}
      onChange={event => disabled || onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value ?? ''}
      {...filterDOMProps(rest)}
    />
  );
};

export default connectField<LongTextFieldProps>(LongText, { kind: 'leaf' });
