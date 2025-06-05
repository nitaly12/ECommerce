'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

type FormInputs = {
  otp: string; // combined OTP string (4 digits)
};

const OTP_LENGTH = 4;

const VerifyOTPComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';

  // react-hook-form for final OTP value
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    clearErrors,
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  // Local state for separate OTP inputs
  const [otpInputs, setOtpInputs] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoadingResendOTP, setIsLoadingResendOTP] = useState(false);

  useEffect(() => {
    if (!email) {
      router.replace('/forgot-password');
    }
  }, [email, router]);

  // Handle input change per digit
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // only digits

    const newOtpInputs = [...otpInputs];
    newOtpInputs[idx] = val.slice(-1); // only last digit
    setOtpInputs(newOtpInputs);

    // Clear error on change
    if (errorMessage) setErrorMessage('');
    clearErrors('otp');

    // Move focus to next input if current input has a digit
    if (val && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // Handle backspace and arrow keys for better UX
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace') {
      if (!otpInputs[idx] && idx > 0) {
        // Move to previous input if current is empty
        inputsRef.current[idx - 1]?.focus();
      }
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && idx < OTP_LENGTH - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  // On submit, join inputs and set form value, then validate OTP
  const onSubmit = () => {
    const otpValue = otpInputs.join('');
    setValue('otp', otpValue, { shouldValidate: true });

    if (!/^\d{4}$/.test(otpValue)) {
      setErrorMessage('OTP must be exactly 4 digits.');
      return;
    }

    if (otpValue === '1234') {
      router.push(`/set-new-password?email=${encodeURIComponent(email)}`);
    } else {
      setErrorMessage('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = () => {
    setIsLoadingResendOTP(true);

    setTimeout(() => {
      setIsLoadingResendOTP(false);
      alert('OTP resent to your email.');
    }, 2000);
  };

  if (!email) return <p className="text-center mt-10 text-gray-500">Redirecting...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 sm:p-20">
        <h2 className="text-3xl font-bold mb-3 text-center text-purple-700 ">Enter 4 Digits Code</h2>
        <p className="text-sm text-gray-500 mb-10 text-center">
          Enter the code sent to <strong className="text-gray-700">{email}</strong>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            {/* <label className="block text-sm font-medium mb-2 text-purple-700 text-center">Enter 4 Digits OTP Code</label> */}
            <div className="flex justify-between gap-3">
              {otpInputs.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  //this is importance
                  ref={(el) => (inputsRef.current[idx] = el)}  
                  className={`w-14 h-14 text-2xl font-semibold text-center rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errorMessage ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
            {(errors.otp || errorMessage) && (
              <p className="text-sm text-red-500 mt-2">
                {errors.otp?.message || errorMessage}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={otpInputs.some((d) => d === '')}
            className="w-full py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
          >
            Verify
          </button>
          <div className="flex justify-end text-sm text-blue-600 cursor-pointer">
            <div onClick={handleResendOtp}>
              {isLoadingResendOTP ? (
                <div className="flex items-center gap-2">
                  OTP is Sending{' '}
                  <span className="loader_purple w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : (
                <span className="hover:underline">Resend OTP</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTPComponent;
