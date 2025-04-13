import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { ContentHeader } from "../Util/ContentHeader"

export const DegradedModeSelection = () => {
  const paperRef = useRef<HTMLDivElement>(null)
  const [paperHeight, setPaperHeight] = useState<number>(0)

  useEffect(() => {
    const updateAvailableHeight = () => {
      if (paperRef.current) {
        const rect = paperRef.current.getBoundingClientRect()
        const y = rect.top
        const remaining = window.innerHeight - y - 60
        setPaperHeight(remaining)
      }
    }

    updateAvailableHeight()
    window.addEventListener("resize", updateAvailableHeight)

    return () => {
      window.removeEventListener("resize", updateAvailableHeight)
    }
  }, [])

  return (
    <Grid container direction="column" sx={{ m: 2 }}>
      <ContentHeader text="Degraded Modes">
        <Button>Select All</Button>
      </ContentHeader>
      <Paper
        ref={paperRef}
        elevation={4}
        sx={{
          height: paperHeight,
          overflowY: "auto",
          mt: 2,
          p: 2,
        }}
      >
        <Box display="flex" flexDirection="column">
          {[...Array(15).keys()].map((idx) => (
            <FormControlLabel
              key={idx}
              control={<Checkbox defaultChecked />}
              label={`test${idx}`}
            />
          ))}
        </Box>
      </Paper>
    </Grid>
  )
}
