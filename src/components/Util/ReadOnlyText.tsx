import { SxProps, TextField, Theme } from "@mui/material"

export const ReadOnlyText = ({
  label,
  value,
  multiline = true,
  color,
  sx,
  fullWidth = true,
}: {
  label: string
  value?: string | number
  multiline?: boolean
  color?: string
  sx?: SxProps<Theme> | undefined
  fullWidth?: boolean
}) => (
  <TextField
    size="small"
    label={label}
    fullWidth={fullWidth}
    multiline={multiline}
    variant="outlined"
    value={value}
    sx={sx}
    slotProps={{
      input: {
        readOnly: true,
      },
      inputLabel: {
        shrink: true,
        sx: {
          color: { color },
          fontWeight: color ? "bold" : undefined,
        },
      },
    }}
  />
)
