import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  CopyOutlined,
  FacebookFilled,
  TikTokOutlined,
  YoutubeFilled,
} from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
const { Title, Text } = Typography

export default function SettingsPage() {
  const { user } = useUserContext()
  const [form] = Form.useForm()

  const { data: userData, refetch } = Api.user.findFirst.useQuery({
    where: { id: user?.id },
    include: { socialAccounts: true },
  })

  const {
    data: affiliateLink,
    isLoading: isLoadingAffiliateLink,
    error: affiliateLinkError,
  } = Api.affiliateLink.findFirst.useQuery(undefined, {
    onError: () => {
      message.error('Failed to load affiliate link')
    },
  })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: createSocialAccount } =
    Api.socialAccount.create.useMutation()
  const { mutateAsync: deleteSocialAccount } =
    Api.socialAccount.delete.useMutation()

  const { mutateAsync: processWithdrawal } =
    Api.billing.processWithdrawal.useMutation()

  const { mutateAsync: logout } = Api.authentication.logout.useMutation({
    onSuccess: data => {
      if (data.redirect) {
        window.location.href = data.redirect
      }
    },
  })

  const handleClickLogout = async () => {
    try {
      const response = await logout()
      if (response.redirect) {
        window.location.href = response.redirect
      }
    } catch (error) {
      message.error('Failed to logout')
    }
  }

  const handleProfileUpdate = async (values: any) => {
    try {
      if (user?.id) {
        await updateUser({
          where: { id: user.id },
          data: {
            name: values.name,
            email: values.email,
          },
        })
        message.success('Profile updated successfully')
        refetch()
      }
    } catch (error) {
      message.error('Failed to update profile')
    }
  }

  const handleConnectSocial = async (platform: string) => {
    try {
      if (platform === 'YouTube') {
        window.location.href = '/api/auth/youtube'
        return
      }

      if (user?.id) {
        await createSocialAccount({
          data: {
            platform,
            status: 'CONNECTED',
            userId: user.id,
          },
        })
        message.success(`${platform} account connected`)
        refetch()
      }
    } catch (error) {
      message.error(`Failed to connect ${platform} account`)
    }
  }

  const handleDisconnectSocial = async (accountId: string) => {
    try {
      await deleteSocialAccount({
        where: { id: accountId },
      })
      message.success('Social account disconnected')
      refetch()
    } catch (error) {
      message.error('Failed to disconnect account')
    }
  }

  const handlePayoutSettingsSubmit = async (values: any) => {
    try {
      await processWithdrawal({
        amount: '0',
        phoneNumber: values.phoneNumber || ''
      })
      message.success('Payout settings saved successfully')
      form.resetFields(['phoneNumber'])
    } catch (error) {
      message.error('Failed to save payout settings')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-cog"></i> Settings
        </Title>
        <Text>Manage your account settings and preferences</Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-user"></i> Profile Information
                </>
              }
            >
              <div style={{ marginBottom: '16px' }}>
                <Typography.Text>
                  Name:{' '}
                  <Typography.Text strong>{userData?.name}</Typography.Text>
                </Typography.Text>
                <br />
                <Typography.Text>
                  Email:{' '}
                  <Typography.Text strong>{userData?.email}</Typography.Text>
                </Typography.Text>
              </div>
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  name: userData?.name,
                  email: userData?.email,
                }}
                onFinish={handleProfileUpdate}
              >
                <Form.Item label="Name" name="name">
                  <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item label="Email" name="email">
                  <Input placeholder="Enter your email" />
                </Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    <i className="las la-save"></i> Save Changes
                  </Button>
                  <Button danger onClick={handleClickLogout}>
                    <i className="las la-sign-out-alt"></i> Logout
                  </Button>
                </Space>
              </Form>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-share-alt"></i> Connected Accounts
                </>
              }
              style={{ marginTop: 24 }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                {['TikTok', 'Facebook', 'YouTube'].map(platform => {
                  const isConnected = userData?.socialAccounts?.some(
                    account => account.platform === platform,
                  )
                  const account = userData?.socialAccounts?.find(
                    account => account.platform === platform,
                  )

                  return (
                    <div
                      key={platform}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ display: 'flex', alignItems: 'center' }}>
                        {platform === 'YouTube' ? (
                          <YoutubeFilled
                            style={{
                              fontSize: '16px',
                              color: '#FF0000',
                              marginRight: '5px',
                            }}
                          />
                        ) : platform === 'TikTok' ? (
                          <TikTokOutlined
                            style={{
                              fontSize: '16px',
                              color: '#000000',
                              marginRight: '5px',
                            }}
                          />
                        ) : (
                          <FacebookFilled
                            style={{
                              fontSize: '16px',
                              color: '#1877F2',
                              marginRight: '5px',
                            }}
                          />
                        )}
                        {platform}
                      </Text>
                      {isConnected && account ? (
                        <Button
                          danger
                          onClick={() => handleDisconnectSocial(account.id)}
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          type="primary"
                          onClick={() => handleConnectSocial(platform)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-hand-holding-usd"></i> Affiliate Program
                </>
              }
              style={{ marginTop: 24 }}
            >
              <Text>Earn 50% commission on every referral!</Text>
              <div style={{ marginTop: 16 }}>
                {affiliateLink?.url ? (
                  <Space>
                    <Input
                      value={`${affiliateLink.url}?ref=${
                        user?.id
                      }&tx=${Date.now()}`}
                      readOnly
                    />
                    <Tooltip title="Copy affiliate link">
                      <Button
                        icon={<CopyOutlined />}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${affiliateLink.url}?ref=${
                              user?.id
                            }&tx=${Date.now()}`,
                          )
                          message.success('Affiliate link copied to clipboard!')
                        }}
                      />
                    </Tooltip>
                  </Space>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      if (isLoadingAffiliateLink) return
                      message.error(
                        'Affiliate link not available. Please try again later.',
                      )
                    }}
                    loading={isLoadingAffiliateLink}
                  >
                    Become An Affiliate to earn
                  </Button>
                )}
              </div>
            </Card>
          </Col>

          <Col xs={24}>
            <Card
              title={
                <>
                  <i className="las la-money-check"></i> Payout Settings
                </>
              }
              style={{ marginTop: 24 }}
            >
              <Form layout="vertical" onFinish={handlePayoutSettingsSubmit}>
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[
                    { required: true, message: 'Phone number is required' },
                    {
                      pattern: /^(237|\+237)?[6-9][0-9]{8}$/,
                      message: 'Please enter a valid Cameroon phone number',
                    },
                  ]}
                >
                  <Input addonBefore="+237" placeholder="Enter your phone number" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    <i className="las la-save"></i> Save Payout Settings
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
