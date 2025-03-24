import { LoadingOutlined } from '@ant-design/icons'
import { Button, Layout, Result, Spin } from 'antd'
import React, { useEffect, useState } from 'react'

export const MrbSplashScreen: React.FC = () => {
  const [isPageInitialised, setPageInitialised] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const initializeTimeout = setTimeout(() => {
      if (!isPageInitialised) {
        setHasError(true)
      }
    }, 5000)

    try {
      setPageInitialised(true)
    } catch (error) {
      setHasError(true)
      console.error('Initialization failed:', error)
    }

    return () => clearTimeout(initializeTimeout)
  }, [])

  if (!isPageInitialised && !hasError) {
    return <div></div>
  }

  if (hasError) {
    return (
      <Layout.Content
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Result
          status="error"
          title="Initialization Failed"
          subTitle="The application failed to initialize. Please try again."
          extra={[
            <Button
              type="primary"
              key="reload"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>,
          ]}
        />
      </Layout.Content>
    )
  }

  return (
    <Layout.Content
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Layout.Content>
  )
}
