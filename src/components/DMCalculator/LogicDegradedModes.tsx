import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material"
import { LogicData } from "./dmTypes"
import { ReadOnlyText } from "../Util/ReadOnlyText"
import { ContentHeader } from "../Util/ContentHeader"

export const LogicDegradedModes = ({
  logicData,
}: {
  logicData?: LogicData
}) => {
  const comps: Record<
    string,
    { value?: number; aux?: Record<string, boolean | undefined> }
  > = {
    "Logic Based DM": { value: logicData?.logicBasedDM },
    "Raised Shift Points Requested": {
      value: logicData?.raisedShiftPoints,
    },
    "Splitter Movement Toward S1 Prohibited": {
      value: logicData?.splitterMvmtTowardsS1,
      aux: {
        "S1 Engaged": logicData?.splitterMvmtTowardsS1BoolS1,
        "S3 Engaged": logicData?.splitterMvmtTowardsS1BoolS3,
      },
    },
    "Splitter Movement Toward S3 Prohibited": {
      value: logicData?.splitterMvmtTowardsS3,
      aux: {
        "S1 Engaged": logicData?.splitterMvmtTowardsS3BoolS1,
        "S3 Engaged": logicData?.splitterMvmtTowardsS3BoolS3,
      },
    },
    "Up Shifts Prohibited": {
      value: logicData?.upshiftsProhibited,
    },
    "Inertia Brake Activation Prohibited": {
      value: logicData?.inertiaBrakeAct,
    },
    "Urge to Move, Auto Launch, Creep Prohibited": {
      value: logicData?.creepMode,
    },
    "PTO Mode Prohibited": {
      value: logicData?.splitterMvmtTowardsS3,
      aux: {
        "S3 Splitter Gear Disengaged": logicData?.ptoS3,
        "S2 Splitter Rail Disengagedd": logicData?.ptoS2,
      },
    },
  }
  return (
    <Grid container flexDirection="column" sx={{ mt: 2, mx: 2 }}>
      <ContentHeader text="Logic Based Degraded Modes" />
      <Box sx={{mt:2}}>
        {Object.entries(comps).map(([k, v]) => (
          <Grid container flexDirection="column" key={k} sx={{ my: 1.5 }}>
            <ReadOnlyText label={k} value={v.value} />
            {v.aux && (
              <Grid container flexDirection="row" sx={{ ml: 3 }}>
                {Object.entries(v.aux).map(([auxKey, auxVal]) => (
                  <FormControlLabel
                    key={auxKey}
                    control={<Checkbox value={auxVal} size="small" />}
                    label={auxKey}
                  />
                ))}
              </Grid>
            )}
          </Grid>
        ))}
      </Box>
    </Grid>
  )
}
