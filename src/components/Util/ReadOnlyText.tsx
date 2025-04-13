import { TextField } from "@mui/material"

export const ReadOnlyText = ({
  label,
  value,
  multiline = true,
  color,
}: {
  label: string
  value?: string
  multiline?: boolean
  color?: string
}) => (
  <TextField
    size="small"
    label={label}
    fullWidth
    multiline={multiline}
    variant="outlined"
    value={value}
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
