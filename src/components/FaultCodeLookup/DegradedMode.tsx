import { Button, Grid, Typography } from "@mui/material"
import { ReadOnlyChipList } from "./ReadOnlyChipList"
import { ReadOnlyText } from "../Util/ReadOnlyText"

export const DegradedMode = ({
  items,
  label,
}: {
  items?: string[]
  label: string
}) => (
  <Grid container flexDirection="row" sx={{ m: 2 }}>
    <Grid container flexDirection="column" size={2} gap={1}>
      <Typography fontSize="small" fontWeight="bold" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <ReadOnlyText label="DM0" />
      <ReadOnlyText label="DM1" />
      <Button variant="contained" size="small">
        DM Calculator
      </Button>
    </Grid>
    <Grid size={10}>
      <ReadOnlyChipList items={items} sx={{ mt: 3, ml: 2 }} />
    </Grid>
  </Grid>
)
