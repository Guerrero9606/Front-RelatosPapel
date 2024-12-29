import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../assets/Landing.gif'

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige al sitio principal después de 5 segundos
    const timer = setTimeout(() => {
      navigate('/Home');
    }, 5000);

    // Limpieza del timer en caso de que el componente se desmonte antes de tiempo
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="landing-page">
      <div>
        <img id='img-landing' src={image} alt="Bienvenida a la librería" />
      </div>
    </div>
  );
};

export default LandingPage;
