import { Grid, TextField } from "@mui/material"
import { DegradedModeSelection } from "./DegradedModeSelection"
import { LogicDegradedModes } from "./LogicDegradedModes"

export const DMCalculator = () => {
  return (
    <Grid container>
      <Grid container flexDirection="column" size={6}>
        <Grid
          container
          flexDirection="row"
          justifyContent="flex-start"
          sx={{ mx: 2, mt: 2 }}
        >
          <Grid size={4}>
            <TextField size="small" label="DM0" />
          </Grid>
          <Grid size={4}>
            <TextField size="small" label="DM1" />
          </Grid>
        </Grid>
        <DegradedModeSelection />
      </Grid>
      <Grid container flexDirection="column" size={6}>
        <LogicDegradedModes logicData={undefined} />
      </Grid>
    </Grid>
  )
}
