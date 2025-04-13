import { Autocomplete, TextField } from "@mui/material"
import { faultCode } from "../../types/faultCodes"

const cleanFmi = (str?: string | null) =>
  str
    ? str
        .replace(/FMI=?\s*/i, "")
        .replace(/^"+|"+$/g, "")
        .trim()
    : ""

export const FMILookup = ({
  value,
  faultCodeData,
  spnSelected,
  onChange,
}: {
  value?: string | null
  faultCodeData: faultCode[]
  spnSelected: number | null
  onChange: (fmi: string | null) => void
}) => {
  const fmiMap = faultCodeData
    .filter((x) => x.spn === spnSelected)
    .reduce((acc, curr) => {
      const raw = curr.fmi
      const cleaned = cleanFmi(raw)
      acc.set(cleaned, raw)
      return acc
    }, new Map<string, string>())
  const fmiOptions = [...fmiMap.keys()].sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true })
  })
  return (
    <Autocomplete
      size="small"
      options={fmiOptions}
      value={cleanFmi(value)}
      onChange={(_, newValue: string | null) => {
        onChange(newValue ? (fmiMap.get(newValue) ?? null) : null)
      }}
      disablePortal
      renderInput={(params) => <TextField {...params} label="FMI" />}
    />
  )
}
