import { useThemeProps } from '@mui/system';
import TextField, {
  TextFieldProps as MUITextFieldProps
} from '@mui/material/TextField';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

export type TextFieldProps = FieldProps<string, MUITextFieldProps>;

function Text(props: TextFieldProps) {
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
    value = '',
    ...rest
  } = props;
  const themeProps = useThemeProps({ props, name: 'MuiTextField' });

  return (
    <TextField
      disabled={disabled}
      error={!!error}
      fullWidth={themeProps?.fullWidth ?? true}
      helperText={(error && showInlineError && errorMessage) || helperText}
      inputProps={{ readOnly, ...(themeProps?.inputProps ?? {}) }}
      label={label}
      margin={themeProps?.margin ?? 'dense'}
      name={name}
      onChange={event => disabled || onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value}
      {...filterDOMProps(rest)}
    />
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
