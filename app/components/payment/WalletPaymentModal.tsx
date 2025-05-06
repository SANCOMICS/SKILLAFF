import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Typography, Space, Alert, Spin } from 'antd'
import { Api } from '@/core/trpc'
import { useNavigate } from '@remix-run/react'

const { Text, Title } = Typography

interface WalletPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'deposit' | 'withdraw'
  onSuccess: () => void
  onError: (msg: string) => void
}

interface PaymentFormValues {
  amount: string
  phoneNumber: string
}

export function WalletPaymentModal({
  isOpen,
  onClose,
  type,
  onSuccess,
  onError,
}: WalletPaymentModalProps) {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [status, setStatus] = useState<'form' | 'pending' | 'success' | 'failed' | 'timeout'>('form')
  const [pollingCount, setPollingCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { mutateAsync: initiateDeposit } = Api.billing.initiateDeposit.useMutation()
  const { mutateAsync: processWithdrawal } = Api.billing.processWithdrawal.useMutation()
  const { data: paymentStatus, refetch: checkPaymentStatus } = Api.fapshi.getPaymentStatus.useQuery(
    { transId: transactionId || '' },
    { enabled: !!transactionId }
  )

  useEffect(() => {
    let pollInterval: NodeJS.Timeout
    let timeoutId: NodeJS.Timeout

    if (status === 'pending' && transactionId) {
      // Initial check
      checkPaymentStatus()

      // Set up polling
      pollInterval = setInterval(() => {
        checkPaymentStatus()
        setPollingCount((prev) => prev + 1)
      }, 30000) // Check every 30 seconds

      // Set timeout for 30 minutes (increased from 5 minutes)
      timeoutId = setTimeout(() => {
        if (status === 'pending') {
          clearInterval(pollInterval)
          setStatus('timeout')
        }
      }, 30 * 60 * 1000) // 30 minutes
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [status, transactionId, checkPaymentStatus])

  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus.status === 'SUCCESSFUL') {
        setStatus('success')
        onSuccess()
      } else if (paymentStatus.status === 'FAILED') {
        setStatus('failed')
        onError('Payment failed. Please try again.')
      }
      // Keep polling if status is still pending
      else if (paymentStatus.status === 'PENDING' && status === 'pending') {
        // Continue polling
      }
    }
  }, [paymentStatus, onSuccess, onError, status])

  const handleSubmit = async (values: PaymentFormValues) => {
    setIsSubmitting(true)
    try {
      if (type === 'deposit') {
        const transactionId = await initiateDeposit({
          amount: values.amount,
          phoneNumber: values.phoneNumber
        })
        setTransactionId(transactionId)
        setStatus('pending')
      } else {
        await processWithdrawal({
          amount: values.amount,
          phoneNumber: values.phoneNumber
        })
        onSuccess()
      }
    } catch (error) {
      onError(error.message || 'Failed to process payment')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      const result = await checkPaymentStatus()
      if (result?.status === 'SUCCESSFUL') {
        setStatus('success')
        onSuccess()
      } else if (result?.status === 'FAILED') {
        setStatus('failed')
        onError('Payment failed. Please try again.')
      } else {
        // If still pending, continue polling
        setStatus('pending')
      }
    } catch (error) {
      setStatus('failed')
      onError('Error checking payment status')
    } finally {
      setIsRefreshing(false)
    }
  }

  const renderContent = () => {
    switch (status) {
      case 'form':
        return (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                { required: true, message: 'Please enter amount' },
                { pattern: /^\d+$/, message: 'Please enter a valid amount' },
                { validator: (_, value) => {
                  if (value && parseInt(value) <= 0) {
                    return Promise.reject('Amount must be greater than 0');
                  }
                  return Promise.resolve();
                }}
              ]}
            >
              <Input prefix="XAF" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: 'Please enter phone number' },
                {
                  pattern: /^(237|\+237)?[6-9][0-9]{8}$/,
                  message: 'Please enter a valid Cameroon phone number',
                },
              ]}
            >
              <Input addonBefore="+237" />
            </Form.Item>
          </Form>
        )

      case 'pending':
        return (
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Spin size="large" />
            <Title level={4}>Waiting for Payment Confirmation</Title>
            <Text type="secondary">Please check your phone and confirm the payment request</Text>
            
            <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
              <Alert
                message="Payment Details"
                description={
                  <Space direction="vertical">
                    <Text>Amount: {form.getFieldValue('amount')} XAF</Text>
                    <Text>Phone: {form.getFieldValue('phoneNumber')}</Text>
                    <Text>Transaction ID: {transactionId}</Text>
                  </Space>
                }
                type="info"
                showIcon
              />
              
              <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Spin size="small" />
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  Checking payment status...
                </Text>
              </div>
            </Space>
          </Space>
        )

      case 'timeout':
        return (
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Alert
              message="Payment Status Unclear"
              description="We couldn't confirm your payment status. Would you like to check again?"
              type="warning"
              showIcon
            />
            <Button
              type="primary"
              onClick={handleRefresh}
              loading={isRefreshing}
              style={{ marginTop: 16 }}
            >
              Check Status Again
            </Button>
          </Space>
        )

      case 'failed':
        return (
          <Space direction="vertical" align="center" style={{ width: '100%' }}>
            <Alert
              message="Payment Failed"
              description="Your payment could not be processed. Please try again."
              type="error"
              showIcon
            />
            <Button type="primary" danger onClick={onClose} style={{ marginTop: 16 }}>
              Close
            </Button>
          </Space>
        )

      default:
        return null
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={status === 'form' ? [
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => form.submit()}
          loading={isSubmitting}
        >
          {type === 'deposit' ? 'Deposit' : 'Withdraw'}
        </Button>
      ] : null}
      width={500}
      title={type === 'deposit' ? 'Mobile Money Deposit' : 'Withdraw Funds'}
    >
      {renderContent()}
    </Modal>
  )
} 