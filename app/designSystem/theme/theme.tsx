import { theme } from 'antd'

export const Theme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: 'black',
    colorTextBase: 'black',
    colorLink: 'black',
    colorBgBase: 'white',
    colorBgContainer: 'white',
  },
  components: {
    Layout: {
      siderBg: '#ffffff',
      siderBorderRight: '1px solid #f0f0f0',
      headerBg: '#ffffff',
      headerBorderBottom: '1px solid #f0f0f0',
    },
  },
  // Custom styles for Skill Feed
  skillFeed: {
    videoContainer: {
      height: '100vh',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    },
    overlay: {
      background:
        'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)',
      padding: '2.5rem',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transition: 'all 0.4s ease-in-out',
      backdropFilter: 'blur(4px)',
      zIndex: 10,
      transform: 'translateY(0)',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    },
    transitions: {
      swipe: {
        transform: 'translateX(0)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, opacity',
      },
      fade: {
        opacity: 1,
        transition: 'all 0.5s ease-in-out',
        willChange: 'opacity, transform',
      },
    },
  },
}
