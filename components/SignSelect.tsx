import {Button, MenuItem, Select} from '@mui/material'

type Props = {
  value?: string
  onChange?: (id: string) => void
  disabled?: boolean
}

const SignSelect = (props: Props) => {
  return (
    <>
      <Select
        id="sign-select"
        value={props.value}
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
        displayEmpty 
        disabled={props.disabled}
      >
          <MenuItem value="Cetus">Cetus</MenuItem>
          <MenuItem value="Perseus">Perseus</MenuItem>
          <MenuItem value="Scorpius">Scorpius</MenuItem>
          <MenuItem value="Orion">Orion</MenuItem>
      </Select>
    </>
  )
}

export default SignSelect

