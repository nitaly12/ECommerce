'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormInputs = {
  email: string;
};

const ForgotPasswordComponent = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormInputs) => {
    router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forgot Password?</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              })}
              className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          We'll send a verification code to your email
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
