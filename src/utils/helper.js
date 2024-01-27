// export const getAcessToken = () => {
//   const accesToken = localStorage.getItem("token");
//   return accesToken;
// };

// export const getUserInfo = () => {
//   const userInfoStorage = localStorage.getItem("userInfo");
//   const userInfo = userInfoStorage ? JSON.parse(userInfoStorage) : null;
//   return {
//     ...userInfo,
//   };
// };
export const getAccessToken = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken || ""; // Trả về chuỗi rỗng nếu không có token
};

export const getUserInfo = () => {
  const userInfoStorage = localStorage.getItem("userInfo");
  try {
    const userInfo = userInfoStorage ? JSON.parse(userInfoStorage) : null;
    return userInfo ? { ...userInfo } : null;
  } catch (error) {
    console.error("Failed to parse user info from localStorage", error);
    return null; // Xử lý trường hợp dữ liệu không phải JSON hợp lệ
  }
};
