import { useUserContext } from "@/core/context";
import { PageLayout } from "@/designSystem";
import { useNavigate } from "@remix-run/react";
import { Button, Card, Col, Row, Typography, message } from "antd";
import { CoursePaymentModal } from "@/components/payment/CoursePaymentModal";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;

export default function UpgradePage() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleUpgrade = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    message.success("Successfully upgraded to premium");
    navigate("/courses");
  };

  const handlePaymentError = (error: string) => {
    message.error(error);
  };

  const premiumFeatures = [
    {
      icon: "crown",
      title: "Premium Courses",
      description: "Access to all premium courses and content",
    },
    {
      icon: "download",
      title: "Offline Access",
      description: "Download courses for offline viewing",
    },
    {
      icon: "certificate",
      title: "Certificates",
      description: "Earn certificates upon course completion",
    },
  ];

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Title level={2}>Upgrade to Premium</Title>
        <Paragraph>
          Get access to all premium features and content with our subscription
          plan.
        </Paragraph>

        <Row
          gutter={[24, 24]}
          style={{ marginTop: "32px", marginBottom: "32px" }}
        >
          <Col
            xs={24}
            md={12}
            lg={8}
            style={{ margin: "0 auto", float: "none" }}
          >
            <Card
              title="Premium Subscription"
              extra={
                <Button type="primary" size="large" onClick={handleUpgrade}>
                  Upgrade Now
                </Button>
              }
            >
              <Title level={3}>XAF 10,000</Title>
              <Text type="secondary">
                Unlock all premium features and courses for one month.
              </Text>
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: "32px" }}>
          <Title level={3}>Premium Features</Title>
          <Row gutter={[24, 24]} style={{ marginTop: "16px" }}>
            {premiumFeatures.map((feature, index) => (
              <Col xs={24} md={8} key={index}>
                <Card>
                  <i
                    className={`las la-${feature.icon}`}
                    style={{ fontSize: "24px" }}
                  ></i>
                  <Title level={4} style={{ marginTop: "16px" }}>
                    {feature.title}
                  </Title>
                  <Text type="secondary">{feature.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        <CoursePaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          courseId="premium-plan"
          courseTitle="Premium Subscription"
          amount="10000"
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          type="SUBSCRIPTION"
        />
      </div>
    </PageLayout>
  );
}
