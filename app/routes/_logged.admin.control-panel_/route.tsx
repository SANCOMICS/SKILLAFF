import { useUserContext } from '@/core/context'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Tabs, Typography } from 'antd'
import { useEffect } from 'react'
import CoursesTab from './components/CoursesTab'
import PremiumUpgradeTab from './components/PremiumUpgradeTab'
import SkillFeedTab from './components/SkillFeedTab'
import UsersTab from './components/UsersTab'
const { Title } = Typography

export default function AdminControlPanel() {
  const { checkRole } = useUserContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!checkRole('ADMIN')) {
      navigate('/skillfeed')
    }
  }, [checkRole])

  const items = [
    {
      key: 'users',
      label: 'Users',
      children: <UsersTab />,
    },
    {
      key: 'premium',
      label: 'Premium Upgrade',
      children: <PremiumUpgradeTab />,
    },
    {
      key: 'courses',
      label: 'Courses',
      children: <CoursesTab />,
    },
    {
      key: 'skillfeed',
      label: 'Skillfeed',
      children: (
        <div>
          <Title level={3}>Skillfeed Management</Title>
          <SkillFeedTab />
        </div>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div className="p-4">
        <Title level={2}>Admin Control Panel</Title>
        <Tabs items={items} />
      </div>
    </PageLayout>
  )
}
