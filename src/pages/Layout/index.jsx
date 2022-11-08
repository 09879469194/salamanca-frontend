/* eslint-disable no-unused-vars */
import { Box, useTheme } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '../../components'
import { Copyright } from '../../components/Copyright'
import { UserContext } from '../../contexts/Auth/UserContext'

export default function Layout() {
  // const drawerWidth = 256

  // const theme = useTheme()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  // const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true })
    }
  }, [])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: '#f0f0f0',
      }}
    >
      {/* <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box> */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}
        >
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  )
}
