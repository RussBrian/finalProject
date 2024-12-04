import React, { useState, useContext, useEffect } from "react";
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import InfoCard from './InfoCard';
import '../css/createpost.css';

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userName, setUserName] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      console.log(user)
      if (user) {
        try {
          const q1 = query(collection(db, "users"), where("uid", "==", user.uid));
          const querySnapshot1 = await getDocs(q1);

          if (querySnapshot1.empty) {
            const q2 = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot2 = await getDocs(q2);
            if (!querySnapshot2.empty) {
              querySnapshot2.forEach((doc) => {
                setUserFirstName(doc.data().firstName);
                setUserLastName(doc.data().lastName);
                setUserName(`${doc.data().firstName} ${doc.data().lastName}`);
              });
            } else {
              alert("Usuario no encontrado por email");
              navigate('/login');
            }
          } else {
            querySnapshot1.forEach((doc) => {
              setUserFirstName(doc.data().firstName);
              setUserLastName(doc.data().lastName);
              setUserName(`${doc.data().firstName} ${doc.data().lastName}`);
            });
          }
        } catch (error) {
          alert("Error al obtener los datos del usuario:", error);
          navigate('/login');
        }
      }
    };
    fetchUserData();
  }, [user, db, navigate]);

  if (!user) {
    return (
      <div>
        <button onClick={() => navigate('/login')}>Ir al Login</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("no puede crear una publicación vacia.");
      return; }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        description,
        userName,
        userFirstName,
        userLastName,
      });
      alert("Publicación creada con éxito");
      setTitle(""); 
      setDescription("");
    } catch (error) {
      alert("Error al crear la publicación:", error);
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-form">
        <h2 className="create-post-title">
          Crea una publicación - {userName && <span>{userName}</span>}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="create-post-input"
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="create-post-input"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="create-post-button" type="submit">
            Crear Publicación
          </button>
        </form>
      </div>
      <InfoCard />
    </div>
  );
};

export default CreatePost;
