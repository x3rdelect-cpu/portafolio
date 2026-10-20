import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  // Estado para controlar el menú hamburguesa en móviles
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Sección del Logo */}
      <div className="navbar-logo">
        <span className="text-cyan">Renato</span> Ramos
      </div>

      {/* Enlaces de Navegación */}
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <a href="#sobre-mi" onClick={() => setIsOpen(false)}>Perfil</a>
        <a href="#tech-stack" onClick={() => setIsOpen(false)}>Tech Stack</a>
        <a href="#proyectos" onClick={() => setIsOpen(false)}>Proyectos</a>
        <a href="#servicios" onClick={() => setIsOpen(false)}>Servicios</a>
        <a href="#contacto" onClick={() => setIsOpen(false)}>Contacto</a>
      </div>

      {/* Ícono de Menú Hamburguesa (Solo visible en móviles) */}
      <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;