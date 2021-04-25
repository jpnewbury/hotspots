import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from '@/hooks/index';

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.push('/');
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <div className=" container splash">
      <Head>
        <title>Sign in</title>
      </Head>
      {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>

        <div>
          <div>
              <label htmlFor="email">
              <input
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
            />
          </label>
        </div>
          <div>
          <label htmlFor="password">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
          </div>
          <div><button type="submit">Sign in</button>
        <Link href="/forget-password">
          <a><button>Forget password</button></a>
        </Link></div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
