import { Grid } from "@mui/material"
import { ReadOnlyText } from "../Util/ReadOnlyText"

export const DMCalculator = () => {
  return (
    <Grid container>
      <Grid container flexDirection="column" size={6}>
        <Grid container flexDirection="row">
          <ReadOnlyText label="DM0" />
          <ReadOnlyText label="DM1" />
        </Grid>
      </Grid>
      <Grid container flexDirection="column" size={6}>
        test
      </Grid>
    </Grid>
  )
}
