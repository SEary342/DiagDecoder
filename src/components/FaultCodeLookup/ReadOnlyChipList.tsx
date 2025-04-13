import { Theme } from "@emotion/react"
import { Chip, Stack, SxProps } from "@mui/material"

export const ReadOnlyChipList = ({
  items = [],
  sx,
}: {
  items?: string[]
  sx?: SxProps<Theme>
}) => (
  <Stack
    direction="row"
    flexWrap="wrap"
    gap={1}
    justifyContent="flex-start"
    sx={sx}
  >
    {items.map((item, index) => (
      <Chip key={index} label={item} data-testid="ro-chip" size="small" />
    ))}
  </Stack>
)
