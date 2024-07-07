import { FunctionComponent } from 'react'

import { WebApplication } from '@/Application/WebApplication'
import Encryption from './Encryption'
import PasscodeLock from './PasscodeLock'
import PreferencesPane from '@/Components/Preferences/PreferencesComponents/PreferencesPane'


interface SecurityProps {
  application: WebApplication
}

const Security: FunctionComponent<SecurityProps> = (props) => {
  return (
    <PreferencesPane>
      <Encryption />
      <PasscodeLock application={props.application} />
    </PreferencesPane>
  )
}

export default Security
