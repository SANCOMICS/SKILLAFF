import { ConfigProvider, theme as antTheme, message } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MessageInstance } from 'antd/es/message/interface'
import { ErrorBoundary, MrbHtml } from './core'

export type DesignSystemContext = {
  isMobile: boolean
  message: MessageInstance
  isLoading: boolean
}

const DesignSystemContext = createContext<DesignSystemContext>({
  isMobile: false,
  message: null,
  isLoading: true,
})

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

const ProviderGeneral = ({ children }) => {
  const [isLoading, setLoading] = useState(true)
  const [isMobile, setMobile] = useState(false)

  const isWindow = typeof window !== 'undefined'

  const defaultTheme = {
    algorithm: antTheme.defaultAlgorithm,
    token: {
      colorPrimary: 'black',
      colorTextBase: 'black',
      colorLink: 'black',
      colorBgBase: 'white',
      colorBgContainer: 'white',
    },
  }

  useEffect(() => {
    if (!isWindow) {
      return
    }

    try {
      setMobile(window.innerWidth < 992)

      const handleResize = () => {
        setMobile(window.innerWidth < 992)
      }

      window.addEventListener('resize', handleResize)

      return () => {
        if (!isWindow) {
          return
        }

        window.removeEventListener('resize', handleResize)
      }
    } catch (error) {
      console.error('Failed to initialize mobile detection:', error)
    }
  }, [])

  useEffect(() => {
    if (!isWindow) {
      return
    }

    try {
      const setVhVariable = () => {
        document.documentElement.style.setProperty(
          '--100vh',
          `${window.innerHeight}px`,
        )
      }

      setVhVariable()

      window.addEventListener('resize', setVhVariable)

      return () => window.removeEventListener('resize', setVhVariable)
    } catch (error) {
      console.error('Failed to initialize vh variable:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <ConfigProvider theme={defaultTheme}>
      <DesignSystemContext.Provider value={{ isMobile, message, isLoading }}>
        {children}
      </DesignSystemContext.Provider>
    </ConfigProvider>
  )
}

type Props = {
  children: ReactNode
}

export const DesignSystemProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ProviderGeneral>
        <MrbHtml>{children}</MrbHtml>
      </ProviderGeneral>
    </ErrorBoundary>
  )
}
