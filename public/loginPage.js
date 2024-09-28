"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.success === true) {
      location.reload();
    } else {
      setLoginErrorMessage("Неверный логин или пароль");
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success === true) {
      location.reload();
    } else {
      setRegisterErrorMessage("Данный пользователь уже существует");
    }
  });
};
