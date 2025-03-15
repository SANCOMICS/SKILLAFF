import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Table,
  Typography,
} from 'antd'
import { useState } from 'react'

interface WithdrawFormValues {
  amount: string
  phoneNumber: string
}

const { Title, Text } = Typography

export default function WalletPage() {
  const { user } = useUserContext()
  const [withdrawForm] = Form.useForm()
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false)
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [depositForm] = Form.useForm()

  const { data: wallet, refetch: refetchWallet } =
    Api.wallet.findFirst.useQuery({
      where: { userId: user?.id },
    })

  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  const { mutateAsync: initiateDeposit } =
    Api.billing.initiateDeposit.useMutation()
  const { mutateAsync: processWithdrawal } =
    Api.billing.processWithdrawal.useMutation()

  const handleDeposit = async (values: WithdrawFormValues) => {
    setIsDepositing(true)
    try {
      await initiateDeposit({ 
        amount: values.amount,
        phoneNumber: values.phoneNumber 
      })
      setIsDepositModalVisible(false)
      depositForm.resetFields()
      refetchWallet()
      message.success('Dépôt Mobile Money initié avec succès')
    } catch (error) {
      message.error(error.message)
    } finally {
      setIsDepositing(false)
    }
  }

  const handleWithdraw = async (values: WithdrawFormValues) => {
    try {
      await processWithdrawal({
        amount: values.amount,
        phoneNumber: values.phoneNumber
      })

      message.success('Mobile Money withdrawal processed successfully')
      withdrawForm.resetFields()
      setIsWithdrawModalVisible(false)
      refetchWallet()
    } catch (error) {
      message.error(error.message || 'Failed to process withdrawal')
    }
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: string) => `XAF ${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ]

  return (
    <PageLayout>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card>
            <Title level={3}>Wallet Balance</Title>
            <Text strong style={{ fontSize: 24 }}>
              XAF {wallet?.balance || '0.00'}
            </Text>
            <div style={{ marginTop: 24 }}>
              <Button
                type="primary"
                onClick={() => setIsDepositModalVisible(true)}
                style={{ marginRight: 16 }}
              >
                Deposit Funds
              </Button>
              <Button onClick={() => setIsWithdrawModalVisible(true)}>
                Withdraw Funds
              </Button>
            </div>
          </Card>
        </Col>

        <Col xs={24}>
          <Card>
            <Title level={3}>Transaction History</Title>
            <Table
              columns={columns}
              dataSource={transactions}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Mobile Money Deposit" 
        open={isDepositModalVisible}
        onOk={() => depositForm.submit()}
        onCancel={() => setIsDepositModalVisible(false)}
        okButtonProps={{ loading: isDepositing }}
      >
        <Form form={depositForm} onFinish={handleDeposit}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: 'Please enter deposit amount' },
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
                pattern: /^(237|\\+237)?[6-9][0-9]{8}$/,
                message: 'Please enter a valid Cameroon phone number',
              },
            ]}
          >
            <Input addonBefore="+237" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Withdraw Funds"
        open={isWithdrawModalVisible}
        onOk={() => withdrawForm.submit()}
        onCancel={() => setIsWithdrawModalVisible(false)}
      >
        <Form form={withdrawForm} onFinish={handleWithdraw}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[
              { required: true, message: 'Please enter withdrawal amount' },
              { pattern: /^\d+$/, message: 'Please enter a valid amount' },
            ]}
          >
            <Input prefix="NGN" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter phone number' },
              {
                pattern: /^(237|\\+237)?[6-9][0-9]{8}$/,
                message: 'Please enter a valid Cameroon phone number',
              },
            ]}
          >
            <Input addonBefore="+237" />
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
