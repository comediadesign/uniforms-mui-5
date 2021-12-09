import FormControl from "@mui/material/FormControl";
import FormHelperText, {
  FormHelperTextProps,
} from "@mui/material/FormHelperText";
import { useThemeProps } from "@mui/system";
import React from "react";
import { Override, connectField, filterDOMProps } from "uniforms";

export type ErrorFieldProps = Override<
  FormHelperTextProps,
  {
    errorMessage?: string;
    fullWidth?: boolean;
    margin?: "dense" | "normal" | "none";
  }
>;

function Error(props: ErrorFieldProps) {
  const { children, error, errorMessage, fullWidth, margin, variant, ...rest } =
    props;
  const themeProps = useThemeProps({ props, name: "MuiFormControl" });

  return !error ? null : (
    <FormControl
      error={!!error}
      fullWidth={fullWidth ?? themeProps?.fullWidth ?? true}
      margin={margin ?? themeProps?.margin ?? "dense"}
      variant={variant ?? themeProps?.variant}
    >
      <FormHelperText {...filterDOMProps(rest)}>
        {children || errorMessage}
      </FormHelperText>
    </FormControl>
  );
}

export default connectField<ErrorFieldProps>(Error, {
  initialValue: false,
  kind: "leaf",
});
