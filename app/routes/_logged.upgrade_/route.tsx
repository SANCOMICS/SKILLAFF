import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useNavigate } from '@remix-run/react'
import { Button, Card, Col, Flex, message, Row, Typography } from 'antd'
import { useEffect } from 'react'
const { Title, Text, Paragraph } = Typography

export default function UpgradePage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const { data: products, isLoading } = Api.billing.findManyProducts.useQuery({})
  const { data: premiumLink, isLoading: isPremiumLoading, error: premiumError, refetch } = Api.premiumLink.findFirst.useQuery(undefined, {
    onError: () => {
      message.error('Failed to load premium payment link')
    }
  })
  const { mutateAsync: createPaymentLink } =
    Api.billing.createPaymentLink.useMutation()

  const handleUpgrade = async (productId: string) => {
    try {
      const { url } = await createPaymentLink({
        productId,
      })
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      message.error('Fapshi payment processing failed. Please try again.')
      console.error('Payment error:', error)
    }
  }

  const premiumFeatures = [
    {
      icon: 'crown',
      title: 'Premium Courses',
      description: 'Access to all premium courses and content',
    },
    {
      icon: 'download',
      title: 'Offline Access', 
      description: 'Download courses for offline viewing',
    },
    {
      icon: 'certificate',
      title: 'Certificates',
      description: 'Earn certificates upon course completion',
    }
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          <i className="las la-gem" style={{ marginRight: 8 }}></i>
          Upgrade to Premium
        </Title>
        <Paragraph style={{ textAlign: 'center', marginBottom: 40 }}>
          Unlock all premium features and take your learning experience to the
          next level
        </Paragraph>

        <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
          {premiumFeatures.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card style={{ height: '100%', textAlign: 'center' }}>
                <i
                  className={`las la-${feature.icon}`}
                  style={{ fontSize: 32, color: '#1890ff', marginBottom: 16 }}
                ></i>
                <Title level={4}>{feature.title}</Title>
                <Text type="secondary">{feature.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              if (isPremiumLoading) return;
              if (premiumLink?.url) {
                window.location.href = premiumLink.url;
              } else {
                message.warning('Payment link not available. Please try again later.');
                refetch();
              }
            }}
            loading={isPremiumLoading}
            icon={<i className="las la-gem" />}
            style={{
              background: '#1890ff', 
              borderColor: '#1890ff',
              padding: '0 40px',
            }}
          >
            {isPremiumLoading ? 'Loading...' : 'PAY NOW'}
          </Button>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {isLoading ? (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Text>Loading available plans...</Text>
            </Col>
          ) : (
            products?.filter(product => product.name !== 'Enterprise')
              .map((product, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card
                  title={
                    <Title level={3} style={{ textAlign: 'center', margin: 0 }}>
                      {product.name}
                    </Title>
                  }
                  style={{ height: '100%' }}
                >
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={2} style={{ margin: 0 }}>
                      {product.name === 'Basic' ? 'Free' : 'XAF 3000/month'}
                    </Title>
                  </div>
                  <Paragraph style={{ minHeight: 80 }}>
                    {product.description}
                  </Paragraph>
                  <Flex vertical gap={8}>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={() => handleUpgrade(product.id)}
                      icon={
                        <img
                          src="/fapshi-icon.png"
                          alt="Fapshi"
                          style={{ height: '16px', marginRight: '8px' }}
                        />
                      }
                      style={{
                        background: '#FF6B00',
                        borderColor: '#FF6B00',
                        boxShadow: '0 2px 0 rgba(255, 107, 0, 0.1)',
                        fontWeight: 600,
                      }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      Pay with Fapshi
                    </Button>
                    <Button
                      type="primary"
                      size="large" 
                      block
                      onClick={() => {
                        if (isPremiumLoading) return;
                        if (premiumLink?.url) {
                          window.location.href = premiumLink.url;
                        } else {
                          message.warning('Payment link not available. Please try again later.');
                          refetch();
                        }
                      }}
                      loading={isPremiumLoading}
                      icon={<i className="las la-gem" />}
                      style={{
                        background: '#1890ff',
                        borderColor: '#1890ff',
                      }}
                    >
                      {isPremiumLoading ? 'Loading...' : 'Pay Now'}
                    </Button>
                    <Button
                      type="default"
                      size="large"
                      block
                      onClick={() => window.open('/pricing', '_blank')}
                      icon={<i className="las la-info-circle"></i>}
                    >
                      Learn More
                    </Button>
                  </Flex>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Text type="secondary">
            <i className="las la-lock" style={{ marginRight: 8 }}></i>
            Secure payment powered by Fapshi - Premium Features Await!
          </Text>
        </div>
      </div>
    </PageLayout>
  )
}
