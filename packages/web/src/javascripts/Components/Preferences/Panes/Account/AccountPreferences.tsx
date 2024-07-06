import { observer } from 'mobx-react-lite'

import { WebApplication } from '@/Application/WebApplication'
import Authentication from './Authentication'
import Credentials from './Credentials'
import Sync from './Sync'
import Subscription from './Subscription/Subscription'
import SignOutWrapper from './SignOutView'
import FilesSection from './Files'
import PreferencesPane from '../../PreferencesComponents/PreferencesPane'
import Email from './Email/Email'
import DeleteAccount from '@/Components/Preferences/Panes/Account/DeleteAccount'

type Props = {
  application: WebApplication
}

const AccountPreferences = ({ application }: Props) => {
  return (
    <PreferencesPane>
      <SignOutWrapper application={application} />
    </PreferencesPane>
  )
}

export default observer(AccountPreferences)
