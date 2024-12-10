import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const CLAVE_CORRECTA = "BESTWORK2024";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clave, setClave] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    celular: "",
    profesor: "",
    link: "",
    sesion: "Onboarding",
  });
  const [consoleOutput, setConsoleOutput] = useState([]);

  // Login Function
  const handleLogin = () => {
    if (clave === CLAVE_CORRECTA) {
      setIsAuthenticated(true);
      logToConsole("Login exitoso.");
    } else {
      alert("Clave incorrecta");
    }
  };

  // Search Function
  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?email=${email}`);
      setPhone(response.data.phone);
      setFormData({
        ...formData,
        celular: cleanCelular(response.data.phone),
      });
      setError("");
      logToConsole(`Número encontrado: ${response.data.phone}`);
    } catch (err) {
      setError("No se encuentra el alumno. Conecta con Académico.");
      logToConsole("Error al buscar el número del alumno.");
    }
  };

  // Send Message Function
  const handleSend = async () => {
    const flow = "5fe2da67-3c08-484e-8dda-55374024219e";
    const url = `https://flows.messagebird.com/flows/${flow}/invoke`;

    try {
      await axios.post(url, null, {
        params: {
          CELULAR: formData.celular,
          NOMBRE: formData.nombre,
          PROFESOR: formData.profesor,
          SESION: formData.sesion,
          LINK: formData.link,
        },
      });
      logToConsole(
        `Mensaje enviado a ${formData.nombre} (${formData.celular}) con sesión ${formData.sesion}`
      );
    } catch (error) {
      logToConsole("Error enviando mensaje: " + error.message);
    }
  };

  // Limpieza del número de celular
  const cleanCelular = (value) => value.replace(/\D/g, "");

  // Logging Function
  const logToConsole = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setConsoleOutput((prev) => [...prev, `[${timestamp}] ${message}`]);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: "#f4f4f9",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "4cm",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <img
          src="https://bestwork.cl/wp-content/uploads/2023/05/Logo.png"
          alt="Logo Bestwork"
          style={{ maxWidth: "100px", margin: "0 auto 20px" }}
        />

        {!isAuthenticated ? (
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Iniciar Sesión
            </h2>
            <input
              type="password"
              placeholder="Clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              style={inputStyle}
            />
            <button
              onClick={handleLogin}
              style={buttonStyle("#FF7F50")}
            >
              Ingresar
            </button>
          </div>
        ) : (
          <div>
            {/* Panel de Búsqueda */}
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: "bold" }}>
                ¿No sabes el número del alumno?
              </h3>
              <input
                type="email"
                placeholder="Correo del Alumno"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={handleSearch}
                style={buttonStyle("#60A5FA")}
              >
                Buscar
              </button>
              {phone && <p style={{ color: "green" }}>Teléfono: {phone}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            {/* Formulario Principal */}
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Enviar Mensaje
            </h2>
            <input
              type="text"
              placeholder="Nombre del Alumno"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Celular"
              value={formData.celular}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  celular: cleanCelular(e.target.value),
                })
              }
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Profesor"
              value={formData.profesor}
              onChange={(e) =>
                setFormData({ ...formData, profesor: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              style={inputStyle}
            />
            <select
              value={formData.sesion}
              onChange={(e) =>
                setFormData({ ...formData, sesion: e.target.value })
              }
              style={inputStyle}
            >
              <option value="Onboarding">Onboarding</option>
              <option value="Taller">Taller</option>
              <option value="Level Closure">Level Closure</option>
              <option value="Apoyo Académico">Apoyo Académico</option>
            </select>
            <button
              onClick={handleSend}
              style={buttonStyle("#FF7F50")}
            >
              Enviar Mensaje
            </button>

            {/* Mini Consola */}
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#333",
                color: "#0F0",
                padding: "10px",
                borderRadius: "8px",
                height: "100px",
                overflowY: "auto",
                textAlign: "left",
              }}
            >
              {consoleOutput.map((line, index) => (
                <p key={index} style={{ margin: 0 }}>
                  {line}
                </p>
              ))}
            </div>

            {/* Nuevo Botón */}
            <a
              href="https://docs.google.com/spreadsheets/d/1Stu6xH_tgvEhkkEmj5lV3jTVyDzkHEslCrobHNW6cR0/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                marginTop: "20px",
                backgroundColor: "#4CAF50",
                color: "white",
                textAlign: "center",
                padding: "10px",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              Respaldo de Envios y Respuesta
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  border: "2px solid #60A5FA",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "10px",
  width: "calc(100% - 24px)",
};

const buttonStyle = (color) => ({
  backgroundColor: color,
  color: "white",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  width: "100%",
});
