"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log(response);
    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage("Ошибка авторизации. " + response.error);
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage("Ошибка регистрации. " + response.error);
    }
  });
};
