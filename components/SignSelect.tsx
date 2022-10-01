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
          <MenuItem value="Cetus">くじら座 ミラ</MenuItem>
          <MenuItem value="2">ペルセウス座 アルゴル</MenuItem>
          <MenuItem value="3">さそり座 アンタレス</MenuItem>
          <MenuItem value="4">オリオン座 ベテルギウス</MenuItem>
      </Select>
    </>
  )
}

export default SignSelect

