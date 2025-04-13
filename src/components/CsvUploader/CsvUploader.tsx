import { Box, Button, Typography } from "@mui/material"
import { parseCsvToJson } from "../../types/faultCodes"
import { useRef, useState } from "react"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { useDispatch } from "react-redux"
import { setFaultCodes } from "../../store/faultCodesSlice"

export const CsvUploader: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const dispatch = useDispatch()

  const handleButtonClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      try {
        const jsonData = await parseCsvToJson(file)
        dispatch(setFaultCodes(jsonData))
      } catch (err) {
        console.error("CSV Parsing failed:", err)
      }
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="start" gap={2}>
      <input
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<UploadFileIcon />}
        onClick={handleButtonClick}
      >
        Upload CSV
      </Button>
      {fileName && <Typography variant="body2">Loaded: {fileName}</Typography>}
    </Box>
  )
}
