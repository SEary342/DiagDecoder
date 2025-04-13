import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { FMILookup } from "./FMILookup"
import { SPNLookup } from "./SPNLookup"
import { ReadOnlyText } from "../Util/ReadOnlyText"
import { DegradedMode } from "./DegradedMode"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { setFmiSelected, setSpnSelected } from "../../store/selectionSlice"
import { ContentHeader } from "../Util/ContentHeader"

export const FaultCodeLookup = () => {
  const dispatch = useDispatch()
  const faultCodeData = useSelector((state: RootState) => state.faultCodes.list)

  const spnSelected = useSelector(
    (state: RootState) => state.selection.spnSelected
  )
  const fmiSelected = useSelector(
    (state: RootState) => state.selection.fmiSelected
  )
  const setSpn = (spn: number | null) => dispatch(setSpnSelected(spn))
  const setFmi = (fmi: string | null) => dispatch(setFmiSelected(fmi))

  const lookupData = faultCodeData.find(
    (x) => x.spn === spnSelected && x.fmi === fmiSelected
  )

  const faultInfoFields = {
    "Fault Set Time": lookupData?.faultTime,
    "Fault Clear Time": lookupData?.faultClear,
    "Fault Latch": lookupData?.faultLatch,
    "Method to Disable Fault": lookupData?.methodDisableFault,
  }

  const faultDMInjectMtds = {
    "Mil Method to Inject Fault": lookupData?.milMethodFault,
    "Hil Method to Inject Fault": lookupData?.hilMethodFault,
    "Method to Inject Primary DM": lookupData?.milMethodPrimaryDM,
    "Method to Inject Secondary DM": lookupData?.milMethodSecondaryDM,
    "DM1 Broadcast": lookupData?.dm1Broadcast,
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} flexDirection="row">
        <Grid container spacing={2} flexDirection="column" size={8}>
          <ContentHeader text="SPN/FMI Decoding" />
          <Grid container flexDirection="row">
            <Grid size={5}>
              <SPNLookup
                faultCodeData={faultCodeData}
                onChange={setSpn}
                value={spnSelected}
              />
            </Grid>
            <Grid size={5}>
              <FMILookup
                faultCodeData={faultCodeData}
                onChange={setFmi}
                spnSelected={spnSelected}
                value={fmiSelected}
              />
            </Grid>
            <Grid size={2}>
              <Box sx={{ ml: "auto" }}>
                <Typography fontSize={12}>
                  Implemented:
                  {lookupData !== undefined && (
                    <Typography
                      fontSize="inherit"
                      component="span"
                      sx={{
                        ml: 0.5,
                        color: lookupData?.implemented ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {`${lookupData?.implemented}`.toUpperCase()}
                    </Typography>
                  )}
                </Typography>
                <Typography fontSize={12}>
                  Fault ID:
                  <Typography
                    fontSize="inherit"
                    component="span"
                    sx={{
                      ml: 0.5,
                      fontWeight: "bold",
                    }}
                  >
                    {lookupData?.id}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container flexDirection="row">
            <ReadOnlyText
              value={lookupData?.primaryText}
              label="Fault Description"
            />
          </Grid>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{ backgroundColor: "rgba(128,128,128,0.5)" }}
            >
              <Typography variant="subtitle1">
                Calibrated Degraded Modes
              </Typography>
            </AccordionSummary>
            <Grid container flexDirection="column">
              <DegradedMode
                label="Primary DM"
                items={lookupData?.primaryDegradedMode}
              />
              <DegradedMode
                label="Secondary DM"
                items={lookupData?.secondaryDegradedMode}
              />
            </Grid>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{ backgroundColor: "rgba(128,128,128,0.5)" }}
            >
              <Typography variant="subtitle1">Warning Lamps</Typography>
            </AccordionSummary>
            <Grid container flexDirection="row">
              <Grid
                container
                flexDirection="column"
                size={6}
                gap={2}
                sx={{ m: 2 }}
              >
                <ReadOnlyText
                  label="Amber Warning Lamp"
                  value={lookupData?.amberWarning}
                  color="orange"
                />
                <ReadOnlyText
                  label="Red Stop Lamp"
                  value={lookupData?.redStop}
                  color="red"
                />
              </Grid>
            </Grid>
          </Accordion>
          <Grid container flexDirection="row">
            <Button variant="contained">{`<<< Advanced Diagnostics`}</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} flexDirection="column" size={4}>
          <ContentHeader text="Fault Information" />
          {Object.entries(faultInfoFields).map(([k, v]) => (
            <Grid container flexDirection="row" key={k}>
              <ReadOnlyText label={k} multiline value={v} />
            </Grid>
          ))}
          <ContentHeader text="Fault/DM Injection Methods" />
          {Object.entries(faultDMInjectMtds).map(([k, v]) => (
            <Grid container flexDirection="row" key={k}>
              <ReadOnlyText label={k} multiline value={v} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
