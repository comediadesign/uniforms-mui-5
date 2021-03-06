import { useThemeProps } from '@mui/system';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioMaterial, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import omit from 'lodash/omit';
import React from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type RadioFieldProps = FieldProps<
  string,
  RadioProps,
  {
    allowedValues?: string[];
    checkboxes?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    margin?: string | number;
    row?: boolean;
    transform?: (value: string) => string;
  }
>;

function Radio(props: RadioFieldProps) {
  const {
    allowedValues,
    disabled,
    id,
    inputRef,
    label,
    name,
    onChange,
    readOnly,
    row,
    transform,
    value,
    ...rest
  } = props;
  const formControlThemeProps = useThemeProps({
    props,
    name: 'MuiFormControl'
  });
  return wrapField(
    {
      fullWidth: formControlThemeProps?.fullWidth ?? true,
      margin: formControlThemeProps?.margin ?? 'dense',
      ...props,
      component: 'fieldset',
      disabled
    },
    label && (
      <FormLabel component="legend" htmlFor={name}>
        {label}
      </FormLabel>
    ),
    <RadioGroup
      id={id}
      name={name}
      onChange={(event: any) =>
        disabled || readOnly || onChange(event.target.value)
      }
      ref={inputRef}
      row={row}
      value={value ?? ''}
    >
      {allowedValues?.map(item => (
        <FormControlLabel
          control={
            <RadioMaterial
              {...omit(filterDOMProps(props), ['checkboxes', 'helperText'])}
            />
          }
          key={item}
          label={transform ? transform(item) : item}
          value={`${item}`}
        />
      ))}
    </RadioGroup>
  );
}

export default connectField<RadioFieldProps>(Radio, { kind: 'leaf' });
