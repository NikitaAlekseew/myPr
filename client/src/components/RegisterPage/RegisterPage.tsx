// @ts-ignore
import React, { useState } from "react";
import { Box, Container, Typography, Avatar, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import Swal from "sweetalert2";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { useDrawer } from "../Context/DrawerContext";
import CustomTextField from "../Common/CustomTextField";
import CustomButton from "../Common/CustomButton";
import ImageLoader from "../Common/ImageLoader";
import RowRadioButtonsGroup from "../Common/RadioGroup";
import CustomSelect from "../Common/CustomSelect";
import CustomMaskedInput from "../Common/CustomMaskedInput";

const validationSchema = object({
  firstName: string().required("Введите ваше имя"),
  email: string().email("Неверный формат почты").required("Введите почту"),
  password: string()
    .min(3, "Пароль должен содержать минимум 3 символа")
    .required("Введите пароль"),
  // About: string(),
  // Phone: string().matches(
  //   /^\+?[0-9\s-]{10,20}$/,
  //   "Введите корректный номер телефона"
  // ),
  // cityId: string(),
  roleId: string(),
});

export default function RegisterPage() {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const { setOpenLoginDrawer } = useDrawer();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cityId, setCityId] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.09)",
          borderRadius: 3,
          background: "white",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" marginBottom="16px">
          Регистрация
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            email: "",
            password: "",
            // About: "",
            // Phone: "",
            cityId: "",
            roleId: "",
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            // if (profileImage) {
            //   formData.append("profileImage", profileImage);
            // }
            // formData.append("About", values.About);
            // formData.append("Phone", values.Phone);
            // formData.append("cityId", cityId); // Используем значение из стейта
            formData.append("roleId", roleId);

            try {
              const result = await register(formData).unwrap();
              console.log("result", result);
              Swal.fire({
                title: "Поздравляем!",
                text: "Регистрация прошла успешно. Для входа в личный кабинет подтвердите регистрацию по ссылке на почте.",
                icon: "success",
                confirmButtonText: "На главную",
              }).then(() => {
                navigate("/");
              });
            } catch (error) {
              console.error("Ошибка регистрации", error);

              const typedError = error as FetchBaseQueryError;
              if (
                typedError.status === 400 &&
                typedError.data &&
                (typedError.data as { message?: string }).message ===
                  "Пользователь с таким email уже существует"
              ) {
                setErrors({
                  email: "Пользователь с таким email уже существует",
                });
              } else {
                Swal.fire({
                  title: "Ошибка",
                  text: "Регистрация не удалась, попробуйте снова",
                  icon: "error",
                  confirmButtonText: "OK",
                });
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={CustomTextField}
                  name="firstName"
                  label="Ваше имя"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Field component={CustomTextField} name="email" label="Почта" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={CustomTextField}
                  name="password"
                  label="Пароль"
                  type="password"
                />
              </Grid>
              <Grid item xs={12} sx={{ padding: 0 }}>
                <RowRadioButtonsGroup
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <ImageLoader onFileUpload={setProfileImage} />
              </Grid> */}
              {/* <Grid item xs={12}>
                <Field
                  component={CustomTextField}
                  name="About"
                  label="О себе"
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={CustomMaskedInput}
                  name="Phone"
                  label="Телефон"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomSelect
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                />
              </Grid> */}
              <Grid item xs={12}>
                <CustomButton type="submit">Зарегистрироваться</CustomButton>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Typography
              onClick={() => setOpenLoginDrawer(true)}
              sx={{
                cursor: "pointer",
                color: "primary.main",
                textDecoration: "underline",
                fontSize: "0.875rem",
              }}
            >
              Уже есть аккаунт? Войдите
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
