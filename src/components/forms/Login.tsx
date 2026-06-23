import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../schemas/authSchemas';
import { useAuthStore } from '../../store/authStore';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError('');
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err: any) {
      setServerError(err.response?.data?.message || 'Credenciales incorrectas');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
          Iniciar sesión
        </h1>
        {serverError && (
          <div className='bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm'>
            {serverError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              placeholder='ejemplo@email.com'
              {...register('email')}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Contraseña
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Tu contraseña'
                {...register('password')}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700'
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
        <p className='mt-4 text-center text-sm text-gray-600'>
          ¿No tienes cuenta?{' '}
          <Link
            to='/register'
            className='text-indigo-600 hover:underline font-medium'
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
