export const getAcessToken = () => {
  const accesToken = localStorage.getItem("token");
  return accesToken;
};

export const getUserInfo = () => {
  const userInfoStorage = localStorage.getItem("userInfo");
  const userInfo = userInfoStorage ? JSON.parse(userInfoStorage) : null;
  return {
    ...userInfo,
  };
};
