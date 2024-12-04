import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import InfoCard from './InfoCard';
import '../css/posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <h2>Cargando publicaciones...</h2>;
  }

  return (
    <div className="posts-container">
      <div className="posts-main">
        <h1 className="main-title">Publicaciones</h1>
        {posts.length === 0 ? (
          <h2>No hay publicaciones disponibles</h2>
        ) : (
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <div className="post-content">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <p className="post-author">
                    Por: {post.userName} {post.userLastName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <InfoCard />
    </div>
  );
};

export default Posts;
