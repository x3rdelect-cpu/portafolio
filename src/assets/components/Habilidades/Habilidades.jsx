import './Habilidades.css';

const Habilidades = () => {
  const skillsData = [
    {
      id: 1,
      titulo: "Power BI",
      descripcion: "DAX, Data Modeling, Power Query, Governance.",
      nivel: "Avanzado",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 2,
      titulo: "SQL Server / MySQL / PostGreSQL / Oracle",
      descripcion: "SQL, T-SQL, Optimización, Procedimientos Almacenados.",
      nivel: "Avanzado",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 3,
      titulo: "Python for Data Analyst",
      descripcion: "Pandas, NumPy, Matplotlib, Automatización, Keras.",
      nivel: "Avanzado",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 4,
      titulo: "Excel / VBA",
      descripcion: "Macros, Power Pivot, Power Query, Pivot Tables, Dashboards complejos.",
      nivel: "Experto",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 5,
      titulo: "Laravel",
      descripcion: "Backend Developer",
      nivel: "Avanzado",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 6,
      titulo: "React",
      descripcion: "Construcción de Interfaces de Usuario Modernas a partir de Componentes",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 7,
      titulo: "Angular",
      descripcion: "Construcción de aplicaciones web de una sola página.",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 8,
      titulo: "Git",
      descripcion: "Sistema de Control de Versiones.",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 9,
      titulo: "GitHub",
      descripcion: "Repositorio en la nube.",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 10,
      titulo: "JavaScript",
      descripcion: "Lenguaje de programación interpretado, dialecto del estándar ECMAScript.",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 11,
      titulo: "Grid",
      descripcion: "Construcción de rejillas responsivas.",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    },
    {
      id: 12,
      titulo: "Flexbox",
      descripcion: "Método de diseño de página unidimensional para compaginar elementos en filas o columnas.",
      nivel: "Aprendizaje Activo",
      botonTexto: "VER CERTIFICADO",
      estado: "completado"
    }
  ];

  return (
    <section id="tech-stack" className="habilidades-section">
      <div className="habilidades-container">
        <div className="habilidades-grid">
          {skillsData.map((skill) => (
            <div key={skill.id} className="skill-card">
              <div className="skill-header">
                <div className="skill-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <span className={`skill-badge ${skill.estado === 'proceso' ? 'badge-yellow' : 'badge-green'}`}>
                  {skill.botonTexto}
                </span>
              </div>
              <div className="skill-body">
                <h3 className="skill-title">{skill.titulo}</h3>
                <p className="skill-desc">{skill.descripcion}</p>
                <span className="skill-level">{skill.nivel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Habilidades;