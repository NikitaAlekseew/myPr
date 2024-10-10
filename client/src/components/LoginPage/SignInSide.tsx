// @ts-ignore
import {
  Avatar,
  CssBaseline,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Form, Field, FormikHelpers } from "formik";
import { object, string } from "yup";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useDrawer } from "../Context/DrawerContext";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import {
  setCredentials,
  selectCurrentUser,
} from "../../features/auth/authSlice";
import CustomTextField from "../Common/CustomTextField";
import CustomButton from "../Common/CustomButton";

const MySwal = withReactContent(Swal);

const validationSchema = object({
  email: string().email("Неверный формат почты").required("Введите почту"),
  password: string()
    .min(3, "Пароль должен содержать минимум 3 символа")
    .required("Введите пароль"),
});

interface SignInValues {
  email: string;
  password: string;
}

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const { closeLoginDrawer } = useDrawer();

  const handleSubmit = async (
    values: SignInValues,
    { setSubmitting, setErrors }: FormikHelpers<SignInValues>
  ) => {
    try {
      const { email, password } = values;
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...userData, email }));

      if (!userData.user.isActivated) {
        closeLoginDrawer();
        MySwal.fire({
          icon: "warning",
          title: "Подтвердите почту",
          text: "Пройдите авторизацию по почте, чтобы зайти в личный кабинет.",
          backdrop: `
            rgba(0,0,0,0.4)
            left top
            no-repeat
          `,
          allowOutsideClick: false,
          allowEscapeKey: false,
          customClass: {
            popup: "swal2-top-end",
          },
        });

        setSubmitting(false);
        return;
      }

      setSubmitting(false);
      if (userData.user.role_id === 2) {
        navigate("/guide");
      } else {
        navigate("/");
      }

      closeLoginDrawer();
    } catch (error) {
      console.error("Ошибка авторизации", error);
      const errorResponse = error as { data?: { message?: string } };
      const message = errorResponse.data?.message || "Не удалось войти";
      setErrors({ password: message });
      setSubmitting(false);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", width: 360 }}>
      <CssBaseline />
      <Grid item xs={12} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" marginBottom="16px">
            Вход
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={CustomTextField}
                    name="email"
                    label="Почта"
                    id="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={CustomTextField}
                    name="password"
                    label="Пароль"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomButton type="submit">Войти</CustomButton>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link
                component={RouterLink}
                to="/register"
                variant="body2"
                onClick={closeLoginDrawer}
              >
                {"Нет аккаунта? Зарегистрируйтесь!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
