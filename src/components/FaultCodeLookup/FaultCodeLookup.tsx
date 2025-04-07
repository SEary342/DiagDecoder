import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FMILookup } from "./FMILookup";
import { faultCode } from "../../types/faultCodes";

const formatSPNName = (fc?: faultCode) =>
  fc ? `${fc.spn}: ${fc.spnName}` : "";

export const FaultCodeLookup = () => {
  const faultCodeData = useSelector(
    (state: RootState) => state.faultCodes.list
  );
  const spnNameOptions = [
    ...new Set(
      faultCodeData.map((x) => `${x.spn}: ${x.spnName}`).filter(Boolean)
    ),
  ];
  const [spnSelected, setspnSelected] = useState<number | null>();
  const [fmiSelected, setfmiSelected] = useState<string | null>();
  const lookupData = faultCodeData.find(
    (x) => x.spn === spnSelected && x.fmi === fmiSelected
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2} flexDirection="row">
        <Grid container spacing={2} flexDirection="column" size={8}>
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
            <Typography variant="subtitle1">SPN/FMI Decoding</Typography>
          </Box>
          <Grid container flexDirection="row">
            <Autocomplete
              sx={{ width: 300 }}
              options={spnNameOptions}
              value={formatSPNName(
                faultCodeData.find((x) => x.spn === spnSelected) || undefined
              )}
              onChange={(_, newValue) =>
                setspnSelected(newValue ? Number(newValue.split(":")[0]) : null)
              }
              getOptionLabel={(option) => String(option)}
              renderInput={(params) => (
                <TextField {...params} label="SPN/Component" />
              )}
            />
            <FMILookup
              faultCodeData={faultCodeData}
              onChange={setfmiSelected}
              spnSelected={spnSelected}
              value={fmiSelected}
            />
            <Box sx={{ ml: "auto" }}>
              <Typography>
                Implemented:
                {lookupData !== undefined && (
                  <Typography
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
              <Typography>
                Fault ID:
                <Typography
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
          <Grid container flexDirection="row">
            next row
          </Grid>
        </Grid>
        <Grid container spacing={2} flexDirection="column" size={4}>
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
            <Typography variant="subtitle1">Fault Information</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
