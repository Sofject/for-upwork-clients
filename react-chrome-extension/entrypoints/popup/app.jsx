import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { MemoryRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import SigninPage from './pages/signin';
import SignupPage from './pages/signup';
import Homepage from './pages/homepage';
import { createTheme } from './theme/index';
import { userThemeColor } from './theme/colors';
import { DomainProvider } from './context/domain';
import { WorkspaceProvider } from './context/workspace';
import { AuthProvider } from './context/auth';

const userThemeData = {
  logo: '',
  companyName: '',
  companyTagline: '',
  colors: userThemeColor
};

export default function App() {
  const theme = useMemo(() => {
    return createTheme({
      colorPreset: userThemeData?.colors,
      contrast: "high",
      themeLogo: userThemeData?.logo,
      companyName: userThemeData?.companyName,
    });
  }, [userThemeData]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <DomainProvider>
            <AuthProvider>
              <WorkspaceProvider>
                <Routes>
                  <Route path="/" element={<SignupPage />} />
                  <Route path="/signin" element={<SigninPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route 
                    path="/homepage" 
                    element={
                      <ProtectedRoute>
                        <Homepage />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </WorkspaceProvider>
            </AuthProvider>
          </DomainProvider>
        </Router>
        <Toaster
          toastOptions={{
            duration: 2000,
            success: {
              style: {
                background: theme.palette.primary?.main,
                color: theme.palette.primary?.contrastText
              },
              iconTheme: {
                primary: theme.palette.primary?.contrastText,
                secondary: theme.palette.primary?.main
              }
            },
            error: {
              style: {
                background: 'red',
                color: theme.palette.primary?.contrastText
              },
              iconTheme: {
                primary: theme.palette.primary?.contrastText,
                secondary: 'red'
              }
            },
            loading: {
              style: {
                background: theme.palette.primary?.contrastText,
                color: theme.palette.primary?.main
              },
              iconTheme: {
                primary: theme.palette.primary?.main,
                secondary: theme.palette.primary?.contrastText
              }
            }
          }}
        />
      </ThemeProvider>
    </Provider>
  );
}

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};
