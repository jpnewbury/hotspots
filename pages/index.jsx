import React from 'react';
import { useCurrentUser } from '@/hooks/index';
import PostEditor from '@/components/post/editor';
import Posts from '@/components/post/posts';
import Geo from '../components/geolocation'
import Splash from "../components/splash"

const IndexPage = () => {
  const [user] = useCurrentUser();

  return (
    <div className="container">
     <Geo/>
        <div>
          <div>
          {user ?  (
          <>
            <PostEditor />
            <Posts />
          </>)
          : <Splash />}
          </div>
        </div>
      </div>
  );
};

export default IndexPage;
