import { NavLink } from "react-router";

import MainIso from "@/assets/logo/MainIso";
import CustomInput from "@/components/shared/CustomInput";

const Login = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <NavLink to="/" className="flex justify-center">
          <MainIso />
        </NavLink>
        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-dark dark:text-light">
          Inicia sesión con tu cuenta
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          
          <CustomInput inputType="email" inputName="email" placeholder="Correo Electrónico" isRequired  />
          <CustomInput inputType="password" inputName="password" placeholder="Contraseña" isRequired  />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-primary dark:shadow-none dark:hover:bg-primary dark:focus-visible:outline-primary"
            >
              Ingresar
            </button>
          </div>
        </form>

        <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          ¿No eres miembro aún?{" "}
          <NavLink to="/register" className="font-bold text-primary">
            Registrate
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
