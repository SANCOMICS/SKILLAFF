import { Api } from '@/core/trpc'
import { Button, Divider, Form, Input, Typography, message } from 'antd'

const { Text } = Typography

export default function PremiumUpgradeTab() {
  const [form] = Form.useForm()

  const {
    data: premiumLink,
    refetch: refetchPremium,
    isLoading: isLoadingPremium,
    error: premiumError,
  } = Api.premiumLink.findFirst.useQuery(undefined, {
    retry: false,
    onError: error => {
      console.error('Failed to fetch premium link:', error)
      message.error('Failed to load premium link data')
    },
  })

  const {
    data: affiliateLink,
    refetch: refetchAffiliate,
    isLoading: isLoadingAffiliate,
    error: affiliateError,
  } = Api.affiliateLink.findFirst.useQuery(undefined, {
    retry: false,
    onError: error => {
      console.error('Failed to fetch affiliate link:', error)
      message.error('Failed to load affiliate link data')
    },
  })

  const { mutateAsync: updatePremiumLink, isLoading: isUpdatingPremium } =
    Api.premiumLink.update.useMutation()
  const { mutateAsync: createPremiumLink, isLoading: isCreatingPremium } =
    Api.premiumLink.create.useMutation()
  const { mutateAsync: updateAffiliateLink, isLoading: isUpdatingAffiliate } =
    Api.affiliateLink.update.useMutation()
  const { mutateAsync: createAffiliateLink, isLoading: isCreatingAffiliate } =
    Api.affiliateLink.create.useMutation()

  const handleSubmit = async (values: {
    premiumUrl: string
    affiliateUrl: string
  }) => {
    const validateAndSaveLink = async (
      url: string,
      type: 'premium' | 'affiliate',
    ) => {
      if (!url.trim()) {
        throw new Error(
          `URL cannot be empty - please provide a valid ${type} link`,
        )
      }

      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        throw new Error('URL must start with http:// or https://')
      }

      try {
        new URL(url.trim())
      } catch (e) {
        throw new Error(
          'Invalid URL format - must be a complete URL starting with http:// or https://',
        )
      }

      let response
      if (type === 'premium') {
        if (premiumLink?.id) {
          response = await updatePremiumLink({
            where: { id: premiumLink.id },
            data: { url: url.trim() },
          })
        } else {
          response = await createPremiumLink({
            data: { url: url.trim() },
          })
        }
        await refetchPremium()
      } else {
        if (affiliateLink?.id) {
          response = await updateAffiliateLink({
            where: { id: affiliateLink.id },
            data: { url: url.trim() },
          })
        } else {
          response = await createAffiliateLink({
            data: { url: url.trim() },
          })
        }
        await refetchAffiliate()
      }
      return response
    }

    try {
      const [premiumResponse, affiliateResponse] = await Promise.all([
        validateAndSaveLink(values.premiumUrl, 'premium'),
        validateAndSaveLink(values.affiliateUrl, 'affiliate'),
      ])

      console.log('Links successfully saved:', {
        premium: premiumResponse,
        affiliate: affiliateResponse,
      })
      message.success('Links saved successfully')
      form.setFieldsValue({
        premiumUrl: premiumResponse.url,
        affiliateUrl: affiliateResponse.url,
      })
    } catch (error) {
      console.error('Update links error:', error)
      message.error(error.message || 'Failed to update links')
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        {isLoadingPremium ? (
          <Text>Loading premium link data...</Text>
        ) : premiumError ? (
          <Text type="danger">
            Error loading premium link data. Please try again.
          </Text>
        ) : (
          premiumLink?.url && (
            <Text>
              Current Premium Link: <Text strong>{premiumLink.url}</Text>
            </Text>
          )
        )}
      </div>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          premiumUrl: premiumLink?.url,
          affiliateUrl: affiliateLink?.url,
        }}
        disabled={isLoadingPremium || isLoadingAffiliate}
      >
        <Form.Item
          name="premiumUrl"
          label="Payment Link URL"
          rules={[
            { required: true, message: 'Payment link URL is required' },
            {
              type: 'url',
              message:
                'Please enter a valid URL starting with http:// or https://',
            },
            {
              validator: async (_, value) => {
                if (!value?.trim()) return
                try {
                  new URL(value)
                } catch (e) {
                  throw new Error('Invalid URL format')
                }
              },
            },
          ]}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Input placeholder="https://example.com/payment" />
        </Form.Item>

        <Divider />

        <div className="mb-4">
          {isLoadingAffiliate ? (
            <Text>Loading affiliate link data...</Text>
          ) : affiliateError ? (
            <Text type="danger">
              Error loading affiliate link data. Please try again.
            </Text>
          ) : (
            affiliateLink?.url && (
              <Text>
                Current Affiliate Link: <Text strong>{affiliateLink.url}</Text>
              </Text>
            )
          )}
        </div>

        <Form.Item
          name="affiliateUrl"
          label="Affiliate Link URL"
          rules={[
            { required: true, message: 'Affiliate link URL is required' },
            {
              type: 'url',
              message:
                'Please enter a valid URL starting with http:// or https://',
            },
            {
              validator: async (_, value) => {
                if (!value?.trim()) return
                try {
                  new URL(value)
                } catch (e) {
                  throw new Error('Invalid URL format')
                }
              },
            },
          ]}
          validateTrigger={['onChange', 'onBlur']}
        >
          <Input placeholder="https://example.com/affiliate" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={
              isUpdatingPremium ||
              isCreatingPremium ||
              isUpdatingAffiliate ||
              isCreatingAffiliate
            }
            disabled={
              isUpdatingPremium ||
              isCreatingPremium ||
              isUpdatingAffiliate ||
              isCreatingAffiliate
            }
          >
            {isUpdatingPremium ||
            isCreatingPremium ||
            isUpdatingAffiliate ||
            isCreatingAffiliate
              ? 'Saving...'
              : 'Save Links'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
