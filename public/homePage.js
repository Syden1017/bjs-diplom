"use strict";

const logout = new LogoutButton();
const rateBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favorites = new FavoritesWidget();

logout.action = () => {
  ApiConnector.logout((response) => {
    if (response.success === true) {
      location.reload();
    }
  });
};

ApiConnector.current((response) => {
  if (response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});

function getCurrentExchangeRate() {
  ApiConnector.getStocks((response) => {
    if (response.success === true) {
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
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      setMessage(true, "Пополнение прошло успешно");
    } else {
      setMessage(false, "При выполнении пополнения произошла ошибка");
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      setMessage(true, "Конвертация прошла успешно");
    } else {
      setMessage(false, "При выполнении конвертации произошла ошибка");
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      setMessage(true, "Перевод прошёл успешно");
    } else {
      setMessage(false, "При выполнении перевода произошла ошибка");
    }
  });
};

ApiConnector.getFavorites((response) => {
  if (response.success === true) {
    favorites.clearTable();
    favorites.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favorites.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success === true) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      setMessage(true, "Добавление пользователя в избранное выполнено успешно");
    } else {
      setMessage(
        false,
        "При добавлении пользователя в избранное произошла ошибка"
      );
    }
  });
};

favorites.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success === true) {
      favorites.clearTable();
      favorites.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      setMessage(true, "Удаление пользователя из избранного выполнено успешно");
    } else {
      setMessage(
        false,
        "При удалении пользователя из избранногшо произошла ошибка"
      );
    }
  });
};
