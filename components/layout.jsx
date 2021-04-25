import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrentUser } from '@/hooks/index';

export default function Layout({ children }) {
  const [user, { mutate }] = useCurrentUser();
  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    mutate(null);
  };
  return (
    <>
      <Head>
        <title>Hotspots for Trout</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <header>
        <nav>
          <div>
          <div>
             <Link href="/">
            <a>
              <h1>Hotspots For Trout</h1>
            </a>
          </Link>
          </div>
          <div><h4>A Citizen Science Program for Roaring Fork Conservancy</h4></div>
          </div>
          <div>
            {!user ? (
              <>
                <Link href="/login">
                  <button>Log In </button>
                </Link>
                &nbsp;
                &nbsp;
                <Link href="/signup">
                  <button>Register</button>
                </Link>
              </>
            ) : (
              <>
                <Link href={`/user/${user._id}`}>
                  <button>My Posts</button>
                </Link>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <button onClick={handleLogout}>
                Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>© 2021 <Link href="http://roaringfork.org">Roaring Fork Conservancy</Link></footer>
    </>
  );
};
