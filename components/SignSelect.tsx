import {Button, MenuItem, Select} from '@mui/material'

type Props = {
  value?: string
  onChange?: (id: string) => void
}

const SignSelect = (props: Props) => {
  return (
    <>
      <Select
        id="sign-select"
        value={props.value}
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
        displayEmpty 
      >
          <MenuItem value=""><em>聴く星座を選択してください</em></MenuItem>
          <MenuItem value={1}>くじら座 ミラ</MenuItem>
          <MenuItem value={2}>ペルセウス座 アルゴル</MenuItem>
          <MenuItem value={3}>さそり座 アンタレス</MenuItem>
          <MenuItem value={3}>オリオン座 ベテルギウス</MenuItem>
      </Select>
    </>
  )
}

export default SignSelect

