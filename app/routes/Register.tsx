import { NavLink } from "react-router";
import { useForm, Controller } from "react-hook-form";

import MainIso from "@/assets/logo/MainIso";
import CustomInput from "@/components/shared/CustomInput";
import { IFormData, InputEnumType } from "@/interfaces/input.interface";
import CustomButton from "@/components/shared/CustomButton";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<IFormData>({
    defaultValues: {
      email: "",
      password: "",
      userName: "",
    },
  });

  const onSubmit = (data: IFormData) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8 w-full">
      <NavLink to="/" className="flex justify-center">
        <MainIso />
      </NavLink>
      <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-dark dark:text-light">
        Ingresa datos para el registro
      </h2>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="userName"
            control={control}
            rules={{
              required: "El nombre es obligatorio",
              minLength: { value: 4, message: "Mínimo 4 caracteres" },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.UserName}
                inputName="userName"
                placeholder="Nombre Completo"
                error={errors.userName?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "El correo es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Correo inválido",
              },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.Email}
                inputName="email"
                placeholder="Correo Electrónico"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "La contraseña es obligatoria",
              minLength: { value: 6, message: "Mínimo 6 caracteres" },
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                inputType={InputEnumType.Password}
                inputName="password"
                placeholder="Contraseña"
                error={errors.password?.message}
              />
            )}
          />

          <CustomButton
            buttonType="submit"
            bgColor="primary"
            textColor="accent"
            displayText={isSubmitting ? "Cargando..." : "Iniciar Sesión"}
            isDisabled={!isValid || isSubmitting}
          />
        </form>

        <p className="mt-3 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          ¿Ya eres miembro?{" "}
          <NavLink to="/login" className="font-bold text-primary">
            inicia Sesión
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;
