    import React, { useContext } from 'react';
    import { AuthContext } from '../context/AuthContext';
    import { db } from '../firebaseConfig';
    import { collection, addDoc } from 'firebase/firestore';
    import { useNavigate } from 'react-router-dom';
    import '../css/register.css';

    const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
        const userCredential = await register(email, password);
        const user = userCredential.user;

        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            firstName,
            lastName,
            email,
        });

        navigate('/create-post');
        } catch (error) {
        alert('Error al registrarse:', error);
        }
    };

    return (
        <div className="register-container">
        <form className="register-form" onSubmit={handleRegister}>
            <h2 className="register-title">Registrarse</h2>
            <input type="text" name="firstName" placeholder="Nombre" required className="register-input" />
            <input type="text" name="lastName" placeholder="Apellido" required className="register-input" />
            <input type="email" name="email" placeholder="Correo" required className="register-input" />
            <input type="password" name="password" placeholder="Contraseña" required className="register-input" />
            <button type="submit" className="register-button">Registrarse</button>
            <button type="button" className="back-button" onClick={() => navigate(-1)}>
            Volver
            </button>
        </form>
        </div>
    );
    };

    export default Register;
