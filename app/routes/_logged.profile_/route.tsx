import { Avatar, Button, Flex, Form, Input, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useUploadPublic } from '@/plugins/upload/client'
import { UploadFile, RcFile } from 'antd/es/upload/interface'

export default function ProfilePage() {
  const { user, refetch: refetchUser } = useUserContext()
  const { mutateAsync: logout } = Api.authentication.logout.useMutation({
    onSuccess: data => {
      if (data.redirect) {
        window.location.href = data.redirect
      }
    },
  })

  const [form] = Form.useForm()

  const [isLoading, setLoading] = useState(false)
  const [isLoadingLogout, setLoadingLogout] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: upload } = useUploadPublic()

  useEffect(() => {
    form.setFieldsValue(user)
  }, [user])

  const handleSubmit = async (values: Partial<User>) => {
    setLoading(true)

    try {
      let pictureUrl = values.pictureUrl;
      if (fileList.length > 0) {
        const { url } = await upload({ file: fileList[0] as RcFile });
        pictureUrl = url;
      }

      await updateUser({
        where: { id: user.id },
        data: {
          email: values.email,
          name: values.name,
          pictureUrl,
        },
      })

      refetchUser()
    } catch (error) {
      console.error(`Could not save user: ${error.message}`, {
        variant: 'error',
      })
    }

    setLoading(false)
  }

  const handleClickLogout = async () => {
    setLoadingLogout(true)

    try {
      await logout()
    } catch (error) {
      console.error(`Could not logout: ${error.message}`, {
        variant: 'error',
      })

      setLoadingLogout(false)
    }
  }

  return (
    <PageLayout layout="super-narrow">
      <Flex justify="space-between" align="center">
        <Typography.Title level={1}>Profile</Typography.Title>
        <Button onClick={handleClickLogout} loading={isLoadingLogout}>
          Logout
        </Button>
      </Flex>

      <Flex justify="center" style={{ marginBottom: '30px' }}>
        <Avatar size={80} src={user?.pictureUrl}>
          {Utility.stringToInitials(user?.name)}
        </Avatar>
      </Flex>

      <Form
        form={form}
        initialValues={user}
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Email is required' }]}
        >
          <Input type="email" placeholder="Your email" autoComplete="email" />
        </Form.Item>

        <Form.Item label="Profile picture" name="pictureUrl">
          <Upload 
            fileList={fileList} 
            beforeUpload={file => { 
              setFileList([...fileList, file]); 
              return false; 
            }} 
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Save
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
