import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Typography, Space, Alert, Spin } from 'antd'
import { Api } from '@/core/trpc'

const { Text, Title } = Typography

interface CoursePaymentModalProps {
  isOpen: boolean
  onClose: () => void
  courseId: string
  courseTitle: string
  amount: string
  onSuccess: () => void
  onError: (msg: string) => void
  type?: 'COURSE_PURCHASE' | 'SUBSCRIPTION'
}

interface PaymentFormValues {
  phoneNumber: string
}

interface FapshiPaymentResponse {
  status?: 'SUCCESSFUL' | 'FAILED' | 'PENDING'
  transId?: string
  message?: string
}

export function CoursePaymentModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  amount,
  onSuccess,
  onError,
  type = 'COURSE_PURCHASE'
}: CoursePaymentModalProps) {
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [status, setStatus] = useState<'form' | 'pending' | 'success' | 'failed' | 'timeout'>('form')
  const [pollingCount, setPollingCount] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const { mutateAsync: initiatePayment } = Api.fapshi.initiatePayment.useMutation()
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

      // Set timeout for 30 minutes
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
    if (paymentStatus && typeof paymentStatus === 'object' && 'status' in paymentStatus) {
      const fapshiStatus = paymentStatus as unknown as FapshiPaymentResponse
      if (fapshiStatus.status === 'SUCCESSFUL') {
        setStatus('success')
        onSuccess()
      } else if (fapshiStatus.status === 'FAILED') {
        setStatus('failed')
        onError('Payment failed. Please try again.')
      }
      // Keep polling if status is still pending
      else if (fapshiStatus.status === 'PENDING' && status === 'pending') {
        // Continue polling
      }
    }
  }, [paymentStatus, onSuccess, onError, status])

  const handleSubmit = async (values: PaymentFormValues) => {
    setIsSubmitting(true)
    try {
      const result = await initiatePayment({
        amount: parseFloat(amount),
        phone: values.phoneNumber,
        message: `Payment for ${type === 'SUBSCRIPTION' ? 'Premium Subscription' : 'Course'}: ${courseTitle}`,
        type,
        referenceId: courseId
      })
      setTransactionId(result.transactionId)
      setStatus('pending')
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
      if (result && typeof result === 'object' && 'status' in result) {
        const fapshiStatus = result as unknown as FapshiPaymentResponse
        if (fapshiStatus.status === 'SUCCESSFUL') {
          setStatus('success')
          onSuccess()
        } else if (fapshiStatus.status === 'FAILED') {
          setStatus('failed')
          onError('Payment failed. Please try again.')
        } else {
          // If still pending, continue polling
          setStatus('pending')
        }
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
                    <Text>{type === 'SUBSCRIPTION' ? 'Subscription' : 'Course'}: {courseTitle}</Text>
                    <Text>Amount: {amount} XAF</Text>
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
          Pay Now
        </Button>
      ] : null}
      width={500}
      title={type === 'SUBSCRIPTION' ? 'Premium Subscription Payment' : 'Course Payment'}
    >
      {renderContent()}
    </Modal>
  )
} 