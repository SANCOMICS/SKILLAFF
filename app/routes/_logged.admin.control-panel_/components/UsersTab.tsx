import { Api } from '@/core/trpc'
import { Button, Input, message, Modal, Select, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
const { Title } = Typography

export default function UsersTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [isCoursesModalVisible, setIsCoursesModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { data: premiumCourses } = Api.course.findMany.useQuery({
    where: { isPremium: true },
  })
  const { data: userCourses, refetch: refetchUserCourses } =
    Api.userCourse.findMany.useQuery(
      { where: { userId: selectedUser?.id }, include: { course: true } },
      { enabled: !!selectedUser?.id },
    )
  const { mutateAsync: enrollUser } = Api.userCourse.create.useMutation()
  const { mutateAsync: unenrollUser } = Api.userCourse.delete.useMutation()
  const {
    data: users,
    isLoading,
    refetch,
  } = Api.user.findMany.useQuery({
    where: {
      AND: [
        roleFilter ? { globalRole: roleFilter } : {},
        statusFilter ? { status: statusFilter } : {},
        {
          OR: [
            { name: { contains: searchQuery } },
            { email: { contains: searchQuery } },
          ],
        },
      ],
    },
  })
  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: deleteUser } = Api.user.delete.useMutation()

  const handleStatusChange = async (
    userId: string,
    newStatus: 'INVITED' | 'VERIFIED',
  ) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { status: newStatus },
      })
      message.success('User status updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update user status')
    }
  }

  const handleRoleChange = async (
    userId: string,
    newRole: 'USER' | 'ADMIN' | 'PREMIUM',
  ) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { globalRole: newRole },
      })
      message.success('User role updated successfully')
      refetch()
    } catch (error) {
      message.error('Failed to update user role')
    }
  }

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser({ where: { id: userId } })
      message.success('User deleted successfully')
      refetch()
    } catch (error) {
      message.error('Failed to delete user')
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: any) => (
        <Select
          value={status}
          onChange={(value: 'INVITED' | 'VERIFIED') =>
            handleStatusChange(record.id, value)
          }
          style={{ width: 120 }}
        >
          <Select.Option value="INVITED">Invited</Select.Option>
          <Select.Option value="VERIFIED">Verified</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'globalRole',
      key: 'globalRole',
      render: (role: string, record: any) => (
        <Select
          value={role}
          onChange={value => handleRoleChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="USER">User</Select.Option>
          <Select.Option value="PREMIUM">Premium</Select.Option>
          <Select.Option value="ADMIN">Admin</Select.Option>
        </Select>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setSelectedUser(record)
              setIsCoursesModalVisible(true)
            }}
          >
            Courses
          </Button>
          <Button
            onClick={() =>
              handleStatusChange(
                record.id,
                record.status === 'VERIFIED' ? 'INVITED' : 'VERIFIED',
              )
            }
          >
            {record.status === 'VERIFIED' ? 'Suspend' : 'Activate'}
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4">
      <Title level={3}>Users Management</Title>
      <div className="flex gap-4 mb-4">
        <Select
          placeholder="Filter by role"
          allowClear
          style={{ width: 200 }}
          onChange={value => setRoleFilter(value)}
          options={[
            { label: 'User', value: 'USER' },
            { label: 'Premium', value: 'PREMIUM' },
            { label: 'Admin', value: 'ADMIN' },
          ]}
        />
        <Select
          placeholder="Filter by status"
          allowClear
          style={{ width: 200 }}
          onChange={value => setStatusFilter(value)}
          options={[
            { label: 'Invited', value: 'INVITED' },
            { label: 'Verified', value: 'VERIFIED' },
          ]}
        />
      </div>
      <Input.Search
        placeholder="Search by name or email"
        onChange={e => setSearchQuery(e.target.value)}
        className="mb-4"
        allowClear
      />
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
      <Modal
        title="Manage User Courses"
        open={isCoursesModalVisible}
        onCancel={() => setIsCoursesModalVisible(false)}
        footer={null}
      >
        {premiumCourses?.map(course => (
          <div
            key={course.id}
            className="flex justify-between items-center mb-4"
          >
            <span>{course.title}</span>
            <Select
              value={userCourses?.some(uc => uc.courseId === course.id)}
              onChange={async value => {
                if (value) {
                  await enrollUser({
                    data: { courseId: course.id, userId: selectedUser.id },
                  })
                } else {
                  await unenrollUser({
                    where: { courseId: course.id, userId: selectedUser.id },
                  })
                }
                refetchUserCourses()
              }}
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
            />
          </div>
        ))}
      </Modal>
    </div>
  )
}
