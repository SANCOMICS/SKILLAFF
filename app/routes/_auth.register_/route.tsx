import { Utility } from '@/core/helpers/utility';
import { Api } from '@/core/trpc';
import { AppHeader } from '@/designSystem/ui/AppHeader';
import { User } from '@prisma/client';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { Button, Flex, Form, Input, Typography, message } from 'antd';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: register } = Api.authentication.register.useMutation();

  useEffect(() => {
    const email = searchParams.get('email')?.trim();

    if (Utility.isDefined(email)) {
      form.setFieldsValue({ email });
    }
  }, [searchParams]);

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true);
  
    try {
      const tokenInvitation = searchParams.get('tokenInvitation') ?? undefined;
  
      // Generate random password on the frontend
      const randomPassword = generateRandomPassword();
  
      // Register the user and send the generated password
      const response = await register({
        ...values,
        password: randomPassword, // Ensure password is included
        tokenInvitation,
      });
  
      // Send success message
      message.success('Registration successful! Please check your email for verification.');
  
      // Redirect to login page
      router('/login');
    } catch (error: any) {
      console.error('Could not sign up:', error);
      
      // Check if error message indicates the user already exists
      if (error?.data?.code === 'CONFLICT') {
        message.error('This user already exists. Please sign in or use a different email.');
      } else {
        message.error('An error occurred during registration. Please try again.');
      }
  
      setLoading(false);
    }
  };
  
  
  // Ensure password generation function exists
  const generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
  };
  
  

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex vertical style={{ width: '340px', paddingBottom: '50px', paddingTop: '50px' }} gap="middle">
        <AppHeader description="Welcome!" />
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>

          <Form.Item name="name" rules={[{ required: true, message: 'Name is required' }]} label="Name">
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              Register
            </Button>
          </Form.Item>
        </Form>

        <Button ghost style={{ border: 'none' }} onClick={() => router('/login')}>
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">Have an account?</Typography.Text>{' '}
            <Typography.Text>Sign in</Typography.Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
