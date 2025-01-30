'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import { useState } from 'react';
import ApiFunction from 'utils/useApi';
import { useRouter } from 'next/navigation';

function SignInDefault() {
  const router = useRouter();
  const [signin, setSingin] = useState({
    name: '',
    password: '',
  });
  const onSignChange = (e) => {
    setSingin((prv) => ({ ...prv, [e.target.id]: e.target.value }));
  };
  const signInFunction = async () => {
    if (!signin.name || !signin.password) {
      return;
    }
    try {
      const response = await ApiFunction({
        method: 'post',
        body: signin,
        url: 'login',
      });
      setSingin({
        name: '',
        password: '',
      });

      router.replace('/inventory/default');
    } catch (error) {
      console.log('Error in signInFunction api-->', error);
    }
  };

  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>
            <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white">
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Google
              </p>
            </div>
            <div className="mb-6 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div>
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Username*"
              placeholder="franky@505"
              id="name"
              type="text"
              value={signin.name}
              onChange={onSignChange}
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              value={signin.password}
              onChange={onSignChange}
            />
            {/* Checkbox */}

            <button
              onClick={signInFunction}
              className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Sign In
            </button>
            {/* <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Not registered yet?
              </span>
              <a
                href="/auth/sign-up/default"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Create an account
              </a>
            </div> */}
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
