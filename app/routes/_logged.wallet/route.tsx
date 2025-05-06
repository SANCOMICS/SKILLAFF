import { useUserContext } from "@/core/context";
import { Api } from "@/core/trpc";
import { PageLayout } from "@/designSystem";
import { Button, Card, Col, message, Row, Table, Typography } from "antd";
import { useState } from "react";
import { WalletPaymentModal } from "@/components/payment/WalletPaymentModal";

const { Title, Text } = Typography;

export default function WalletPage() {
  const { user } = useUserContext();
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);

  const { data: wallet, refetch: refetchWallet } =
    Api.wallet.findFirst.useQuery({
      where: { userId: user?.id },
    });

  const { data: transactions } = Api.transaction.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { createdAt: "desc" },
  });

  const handleSuccess = () => {
    refetchWallet();
    message.success("Operation completed successfully");
  };

  const handleError = (msg: string) => {
    message.error(msg);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: string) => `XAF ${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <PageLayout>
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card>
            <Title level={3}>Wallet Balance</Title>
            <Text strong style={{ fontSize: 24 }}>
              XAF {wallet?.balance || "0.00"}
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

      <WalletPaymentModal
        isOpen={isDepositModalVisible}
        onClose={() => setIsDepositModalVisible(false)}
        type="deposit"
        onSuccess={handleSuccess}
        onError={handleError}
      />

      <WalletPaymentModal
        isOpen={isWithdrawModalVisible}
        onClose={() => setIsWithdrawModalVisible(false)}
        type="withdraw"
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </PageLayout>
  );
}
