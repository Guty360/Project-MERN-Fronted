import { useState, useEffect, createContext } from "react";
import { Users, auth } from "../api";
import { hasExpiredToken } from "../utils";

const UserController = new Users();
const authController = new auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null); // verificara si el usuario esta logueado
  const [token, setToken] = useState(null); //envio del token
  const [loading, setLoading] = useState(true);

  //se ejecuta cuando la pantalla se recarga
  useEffect(() => {
    //esto se le conoce como una funcion asincrona anonima
    // la cual su objetivo es compilar codigo como funcion sin que interfiera
    // con la ejecucion normal
    (async () => {
      //verificar si esta logeado
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();
      //verificar que los tokens tengan informacion
      //de lo contrario quitarle el logueo
      if (!accessToken || !refreshToken) {
        logOut();
        setLoading(false);
        return;
      }
      //verificar si los tokens no existen o si los tokens estan caducados
      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logOut();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  },[]);

  //volver a carga el login con un token refrescado
  //seria un nuevo token -> invocando la funcion refresAccessToken
  const reLogin = async (refreshToken) => {
    try {
      const { accesToken } = await authController.refreshAccessToken(
        refreshToken
      );
      authController.setAccessToken(accesToken);
      await login(accesToken);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (accesToken) => {
    try {
      const response = await UserController.getMe(accesToken);
      // debemos lograr mantener la sesion activa
      // para ello se debe recuperar el usuario y que cuando recargue la pagina
      // no se cierre la sesion

      delete response.password;

      setUser(response);
      setToken(accesToken);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);

    authController.removeTokens();
  };

  const data = {
    accesToken: token,
    user,
    login,
    logOut,
  };
  if (loading) {
    return null;
  }
  return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>;
}
