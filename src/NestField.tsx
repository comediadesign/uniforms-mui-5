import { useThemeProps } from '@mui/system';
import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

// FIXME: wrapField is not typed correctly.
export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  { helperText?: string; itemProps?: object; fullWidth?: boolean; margin?: any }
>;

function Nest(props: NestFieldProps) {
  const { children, fields, itemProps, label, ...rest } = props;
  const formControlThemeProps = useThemeProps({
    props,
    name: 'MuiFormControl'
  });
  return wrapField(
    {
      fullWidth: formControlThemeProps?.fullWidth ?? true,
      margin: formControlThemeProps?.margin ?? 'dense',
      ...props,
      component: undefined
    },
    label && <FormLabel component="legend">{label}</FormLabel>,
    children ||
      fields.map(field => <AutoField key={field} name={field} {...itemProps} />)
  );
}

export default connectField<NestFieldProps>(Nest);
