import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Divider,
  Typography,
  useTheme,
  InputAdornment
} from '@mui/material'
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate, Link as Navigate } from 'react-router-dom'
import * as Yup from "yup";
import toast from "react-hot-toast";
import MicrosoftLogo from "~/assets/microsoft-icon.png";
import GoogleLogo from "~/assets/google-icon.png";
import RedirectButton from '../components/auth/redirect-btn'
import { setCredentials, useLoginMutation } from '../store/slices/authSlice';
import { setAuthToken } from '../utils/token';
import { useDispatch } from 'react-redux';

export default function SigninPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const res = await login(values).unwrap();

        if (res?.authToken?.authToken) {
          await setAuthToken(res.authToken.authToken)
          dispatch(setCredentials({ token: res.authToken.authToken }))
          navigate('/scrap');
          toast.success('Successfully logged in')
        }
      } catch (err) {
        if (err?.data?.error?.message === "Invalid email or password") {
          toast.error('Invalid email or password')
        } else {
          helpers.setErrors({ submit: 'Something went wrong' })
        }
      }
    }
  })

  const theme = useTheme()

  const handleSocialLogin = async (provider) => {
    let type;
    switch (provider) {
      case 'google':
        type = 'loginWithGoogle'
        break;
      case 'microsoft':
        type = 'loginWithMs'
        break;
    }

    try {
      const res = await browser.runtime.sendMessage({ type });
      if (res.authToken && res.message === 'Successfully logged in') {
        toast.success('Successfully logged in');
        dispatch(setCredentials({ token: res.authToken }));
        navigate('/scrap');
      } else {
        throw new Error(res.error)
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  }

  return (
    <Box
      sx={{
        width: '550px',
        display: 'flex',
        flexDirection: 'column',
        paddingBlock: '24px',
        paddingInline: '5%',
        marginInline: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Typography
          sx={{
            width: '100%',
            fontSize: '26px',
            fontWeight: 600,
            color: '#101010'
          }}
        >
          Sign in
        </Typography>
      </Box>
      
      <RedirectButton
        buttonImage={
          <img
            src={GoogleLogo}
            alt='google logo'
            style={{ height: '16px', width: '16px' }}
          />
        }
        buttonText='Continue with Google'
        handleClick={() => handleSocialLogin('google')}
        buttonStyle={{ marginTop: '18px' }}
      />
      <RedirectButton
        buttonImage={
          <img
            src={MicrosoftLogo}
            alt='microsoft logo'
            style={{ height: '16px', width: '16px' }}
          />
        }
        buttonText='Continue with Microsoft'
        buttonStyle={{ marginTop: '12px' }}
        handleClick={() => handleSocialLogin('microsoft')}
      />

      <Box display='flex' alignItems='center' width='100%' mt={2}>
        <Divider sx={{ flex: 1, borderColor: '#D7D9E6' }} />
        <Typography sx={{ mx: 2, color: '#92979C', fontSize: '13px' }}>or</Typography>
        <Divider sx={{ flex: 1, borderColor: '#D7D9E6' }} />
      </Box>

      <form noValidate onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
        <Stack
          sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          <Typography
            sx={{
              width: '100%',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              color: '#101010',
              mt: 2
            }}
          >
            Email
          </Typography>
          <TextField
            error={!!(formik.touched.email && formik.errors.email)}
            fullWidth
            helperText={formik.touched.email && formik.errors.email}
            name='email'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type='email'
            value={formik.values.email}
            placeholder='Enter email'
            variant='outlined'
            sx={{
              mt: 1,
              width: '100%',
              backgroundColor: 'white',
              '& div': { pl: 0.3 },
              '& div fieldset': { borderRadius: '8px', border: '1px solid #E4E4E5' },
              '& div input': {
                py: 1.5,
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0em',
                '&::placeholder': {
                  color: 'rgba(40, 40, 123, 0.5)'
                }
              }
            }}
          />
          <Typography
            sx={{
              width: '100%',
              textAlign: 'left',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              color: '#101010',
              mt: 2
            }}
          >
            Password
          </Typography>
          <TextField
            error={!!(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            name='password'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            placeholder='Enter password'
            variant='outlined'
            sx={{
              mt: 1,
              width: '100%',
              backgroundColor: 'white',
              '& div': { pl: 0.3 },
              '& div fieldset': { borderRadius: '8px', border: '1px solid #E4E4E5' },
              '& div input': {
                py: 1.5,
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0em',
                '&::placeholder': {
                  color: 'rgba(40, 40, 123, 0.5)'
                }
              },
              '& .MuiFormHelperText-root': { textAlign: 'right', mx: 0 }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                    aria-label='toggle password visibility'
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
        {formik.errors.submit && (
          <Typography
            color='error'
            sx={{ mt: 3, textAlign: 'right' }}
            variant='body2'
          >
            {formik.errors.submit}
          </Typography>
        )}
        <Button
          fullWidth
          sx={{
            mt: 2,
            py: 2,
            fontSize: '14px',
            fontWeight: 700,
            borderRadius: '14px'
          }}
          type='submit'
          variant='contained'
          disabled={!formik.isValid || isLoading}
        >
          {isLoading
            ? (
              <CircularProgress size={20} color='inherit' />
            )
            : (
              <>
                <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>
                  Sign in
                </Typography>
              </>
            )}
        </Button>
        <Box mt={2}>
          <Typography
            sx={{
              color: '#101010',
              fontSize: '14px',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'baseline',
              gap: '5px'
            }}
          >
            <span>Don't have an account?</span>
            <Navigate
              to='/signup'
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: '#164694'
                },
                color: '#0071F6',
                fontWeight: 700,
                padding: 0,
                minWidth: 0,
              }}
            >
              Create an account
            </Navigate>
          </Typography>
        </Box>
      </form>
    </Box>
  )
}

