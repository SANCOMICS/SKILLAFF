import { Api } from '@/core/trpc'
import { AppHeader } from '@/designSystem/ui/AppHeader'
import { useNavigate, useSearchParams } from '@remix-run/react'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { AuthenticationClient } from '~/core/authentication/client'

export default function LoginPage() {
  const router = useNavigate()
  const [searchParams] = useSearchParams()

  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)

  const { mutateAsync: createAdmin } =
    Api.authentication.createAdmin.useMutation()
  const { mutateAsync: login } = Api.authentication.login.useMutation({
    onSuccess: data => {
      if (data.redirect) {
        window.location.href = data.redirect
      }
    },
  })

  const errorKey = searchParams.get('error')

  const errorMessage = {
    Signin: 'Try signing in with a different account.',
    OAuthSignin: 'Try signing in with a different account.',
    OAuthCallback: 'Try signing in with a different account.',
    OAuthCreateAccount: 'Try signing in with a different account.',
    EmailCreateAccount: 'Try signing in with a different account.',
    Callback: 'Try signing in with a different account.',
    OAuthAccountNotLinked:
      'To confirm your identity, sign in with the same account you used originally.',
    UserNotVerified: 'Please verify your account by checking your email.',
    EmailSignin: 'Check your email address.',
    CredentialsSignin:
      'Sign in failed. Check the details you provided are correct.',
    default: 'Unable to sign in.',
  }[errorKey ?? 'default']

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      form.setFieldValue('email', 'user@test.com')
      form.setFieldValue('password', 'password123')
    }
  }, [])

  useEffect(() => {
    const createAdminUser = async () => {
      try {
        await createAdmin({
          email: 'admin@admin.com',
          password: 'admin123',
        })
      } catch (error) {
        // Silently fail if admin already exists
      }
    }
    createAdminUser()
  }, [createAdmin])

  const handleSubmit = async (values: any) => {
    setLoading(true)

    try {
      const response = await login({
        email: values.email,
        password: values.password,
      })
      if (!response.success) {
        setLoading(false)
        window.location.href = response.redirect
      }
    } catch (error) {
      if (error instanceof Error) {
        if ('code' in error) {
          // API error
          window.location.href = `/login?error=${error.code}`
        } else {
          // Network error
          window.location.href = '/login?error=default'
        }
      }
      setLoading(false)
    }
  }

  return (
    <Flex align="center" justify="center" vertical flex={1}>
      <Flex
        vertical
        style={{
          width: '340px',
          paddingBottom: '50px',
          paddingTop: '50px',
        }}
        gap="middle"
      >
        <AppHeader description="Welcome!" />

        {errorKey && (
          <Typography.Text type="danger">{errorMessage}</Typography.Text>
        )}

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Email is required' }]}
          >
            <Input type="email" placeholder="Your email" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="end">
              <Button
                type="link"
                onClick={() => window.open('https://wa.link/f2dnnq', '_blank')}
                style={{ padding: 0, margin: 0 }}
              >
                Forgot password?
              </Button>
            </Flex>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        {/* <AuthenticationClient.SocialButtons /> */}

        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => router('/register')}
        >
          <Flex gap={'small'} justify="center">
            <Typography.Text type="secondary">No account?</Typography.Text>{' '}
            <Typography.Text>Sign up</Typography.Text>
          </Flex>
        </Button>
        <Button
          ghost
          style={{ border: 'none' }}
          onClick={() => window.location.href = 'https://skillflow.online/login/'}
        >
          <Flex gap="small" justify="center">
            <Typography.Text type="secondary">Issue signing in?</Typography.Text>
            <Typography.Text>Click here then try again!</Typography.Text>
          </Flex>
        </Button>

      </Flex>
    </Flex>
  )
}
