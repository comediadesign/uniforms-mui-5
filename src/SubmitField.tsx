import { useThemeProps } from '@mui/system';
import Button, { ButtonProps } from '@mui/material/Button';
import React, { ReactNode, Ref } from 'react';
import { Override, filterDOMProps, useForm } from 'uniforms';

export type SubmitFieldProps = Override<
  ButtonProps,
  // FIXME: What kind of `ref` is it?
  { inputRef?: Ref<any>; label?: ReactNode }
>;

function SubmitField(props: SubmitFieldProps) {
  const {
    children,
    disabled,
    inputRef,
    label = 'Submit',
    value,
    ...rest
  } = props;
  const { error, state } = useForm();
  const themeProps = useThemeProps({ props, name: 'MuiButton' });

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      ref={inputRef}
      type="submit"
      value={value}
      variant={themeProps?.variant ?? 'contained'}
      {...filterDOMProps(rest)}
    >
      {children || label}
    </Button>
  );
}

export default SubmitField;
