import { Autocomplete, TextField } from "@mui/material"
import { faultCode } from "../../types/faultCodes"

const formatSPNName = (fc: faultCode) => `${fc.spn}: ${fc.spnName}`

export const SPNLookup = ({
  value,
  faultCodeData,
  onChange,
}: {
  value?: number | null
  faultCodeData: faultCode[]
  onChange: (spn: number | null) => void
}) => {
  // Deduplicate by SPN
  const uniqueSPNs = Array.from(
    faultCodeData
      .reduce((acc, fc) => {
        if (fc.spn && !acc.has(fc.spn)) {
          acc.set(fc.spn, fc)
        }
        return acc
      }, new Map<number, faultCode>())
      .values(),
  )

  // Find the currently selected option
  const selectedOption = uniqueSPNs.find((fc) => fc.spn === value) ?? null

  return (
    <Autocomplete
      size="small"
      fullWidth
      options={uniqueSPNs}
      getOptionLabel={formatSPNName}
      value={selectedOption}
      onChange={(_, newValue) => onChange(newValue?.spn ?? null)}
      isOptionEqualToValue={(option, val) => option.spn === val.spn}
      renderInput={(params) => <TextField {...params} label="SPN/Component" />}
    />
  )
}
