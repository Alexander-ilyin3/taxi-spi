import { Popper } from '@mui/material'
import { getMountPoint } from 'helpers/shadowRoot'

const ShadowPopper = (props) => <Popper {...props} container={getMountPoint} />


export default ShadowPopper
