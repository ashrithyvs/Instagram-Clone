import axios from "axios";
import unAuthAxios from "./UnAuthAxios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// //request interceptor to add the auth token header to requests
// instance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     const accessHeader = `Bearer ${accessToken}`;
//     if (accessToken) {
//       config.headers["Authorization"] = accessHeader;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );
// //response interceptor to refresh token on receiving token expired error
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest = error.config;
//     let refreshToken = localStorage.getItem("refreshToken");
//     if (
//       refreshToken &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       return unAuthAxios
//         .post(`user/refresh_token`, {
//           refresh_token: refreshToken,
//         })
//         .then((res) => {
//           if (res.status === 200) {
//             localStorage.setItem("access", res.data.access);
//             console.log(
//               "RT after Refreshed",
//               localStorage.getItem("refreshToken")
//             );
//             return instance(originalRequest);
//           } else if (res.status === 401 || res.status === 500) {
//             localStorage.clear();
//             window.location.replace("/login");
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           localStorage.clear();
//           return Promise.reject(err);
//         });
//     } else if (error.response.status === 401 && refreshToken === null) {
//       localStorage.clear();
//       window.location.replace("/login");
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
