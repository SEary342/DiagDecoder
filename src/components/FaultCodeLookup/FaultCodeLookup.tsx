import {
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FMILookup } from "./FMILookup";
import { SPNLookup } from "./SPNLookup";
import { ReadOnlyText } from "./ReadOnlyText";
import { DegradedMode } from "./DegradedMode";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ContentHeader = ({ text }: { text: string }) => (
  <Box
    sx={{
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      backgroundColor: "rgba(128,128,128,0.5)",
      p: 1,
      borderRadius: 2,
    }}
  >
    <Typography variant="subtitle1">{text}</Typography>
  </Box>
);

export const FaultCodeLookup = () => {
  const faultCodeData = useSelector(
    (state: RootState) => state.faultCodes.list
  );

  const [spnSelected, setspnSelected] = useState<number | null>(null);
  const [fmiSelected, setfmiSelected] = useState<string | null>(null);
  const lookupData = faultCodeData.find(
    (x) => x.spn === spnSelected && x.fmi === fmiSelected
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} flexDirection="row">
        <Grid container spacing={2} flexDirection="column" size={8}>
          <ContentHeader text="SPN/FMI Decoding" />
          <Grid container flexDirection="row">
            <Grid size={5}>
              <SPNLookup
                faultCodeData={faultCodeData}
                onChange={setspnSelected}
                value={spnSelected}
              />
            </Grid>
            <Grid size={5}>
              <FMILookup
                faultCodeData={faultCodeData}
                onChange={setfmiSelected}
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
        </Grid>
        <Grid container spacing={2} flexDirection="column" size={4}>
          <ContentHeader text="Fault Information" />
        </Grid>
      </Grid>
    </Box>
  );
};
