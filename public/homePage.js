"use strict";

const logout = new LogoutButton();
const rateBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favorites = new FavoritesWidget();

logout.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

function getCurrentExchangeRate() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      rateBoard.clearTable();
      rateBoard.fillTable(response.data);
    }
  });
}

getCurrentExchangeRate();

setInterval(() => {
  getCurrentExchangeRate();
}, 60000);

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Пополнение прошло успешно");
    } else {
      moneyManager.setMessage(false, "Ошибка пополнения. " + response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      setMessage(true, "Конвертация прошла успешно");
    } else {
      moneyManager.setMessage(false, "Ошибка конвертации. " + response.error);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, "Перевод прошёл успешно");
    } else {
      moneyManager.setMessage(false, "Ошибка перевода. " + response.error);
    }
  });
};

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favorites.clearTable();
    favorites.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favorites.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(
        true,
        "Добавление пользователя в избранное выполнено успешно"
      );
    } else {
      favorites.setMessage(
        false,
        "Ошибка  добавления пользователя в избранное. " + response.error
      );
    }
  });
};

favorites.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favorites.setMessage(
        true,
        "Удаление пользователя из избранного выполнено успешно"
      );
    } else {
      favorites.setMessage(false, "Ошибка удаления. " + response.error);
    }
  });
};
