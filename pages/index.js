import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [showCopy, setShowCopy] = useState(false);
    const [showFormSelection, setShowFormSelection] = useState(false);

    useEffect(() => {
        setShowCopy(false);
        setShowFormSelection(false);
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setResult('');
        setShowCopy(false);
        setShowFormSelection(false);

        try {
            const res = await fetch(`/api/search?email=${encodeURIComponent(email)}`);
            const data = await res.json();

            if (res.ok) {
                setResult(data.message);
                setShowCopy(true);
                setShowFormSelection(true);
            } else {
                setResult(data.message || 'Error al buscar contacto.');
            }
        } catch (error) {
            setResult('Error al conectar con la API.');
            console.error('Error al realizar la búsqueda:', error);
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        alert('Correo copiado al portapapeles');
    };

    const openExternal = (url) => {
        window.open(url, '_blank');
    };

    const showForm = (url) => {
        window.open(url, '_blank');
    };

    return (
        <>
            <Head>
                <title>Best Work</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>{`
                    body, html {
                        font-family: Arial, sans-serif;
                        background-color: #f7f8fc;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height: 100%;
                        width: 100%;
                        overflow: auto;
                    }

                    .container {
                        width: 100%;
                        max-width: 400px;
                        background: white;
                        padding: 20px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border-radius: 8px;
                        text-align: center;
                        margin-bottom: 20px;
                    }

                    .main-buttons, .additional-buttons {
                        display: flex;
                        flex-wrap: wrap; 
                        justify-content: center;
                        gap: 10px;
                        margin-bottom: 20px;
                    }

                    .main-buttons button, .additional-buttons button {
                        flex: 1 0 22%;
                        max-width: 100px;
                    }

                    .grid-section {
                        display: flex;
                        justify-content: space-between;
                        gap: 20px;
                        margin-bottom: 20px;
                    }

                    .left-column, .right-column {
                        flex: 1;
                    }

                    .left-column button {
                        display: block;
                        width: 100%;
                        margin-bottom: 10px;
                    }

                    .right-column button {
                        display: block;
                        width: 100%;
                        margin-bottom: 20px;
                    }

                    input[type="text"], input[type="email"], button, select {
                        width: 100%;
                        padding: 10px;
                        margin: 10px 0;
                        box-sizing: border-box;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                    }

                    button {
                        background-color: #ff7f50;
                        color: white;
                        border: none;
                        cursor: pointer;
                    }

                    button:hover {
                        background-color: #e06a3d;
                    }

                    .additional-buttons .webmail { background-color: #ff7f50; }
                    .additional-buttons .reloj-control { background-color: #95CEEB; }
                    .left-column .messagebird { background-color: #0000FF; }
                    .left-column .serpo { background-color: #FF6380; }
                    .left-column .drive { background-color: #32CD32; }
                    .left-column .active-campaign { background-color: #007BFF; color: white; }

                    .additional-buttons button:hover,
                    .left-column button:hover,
                    .right-column button:hover {
                        opacity: 0.9;
                    }

                    .form-selection button {
                    width: 100px;
                    margin: 10px;
                    padding: 10px;
                    font-size: 12px;
                    margin-bottom: 5cm; /* Separación del borde inferior */
}

                    .logo {
                        max-width: 150px;
                        margin: 0 auto 20px;
                    }
                `}</style>
            </Head>
            <main>
                <div className="container">
                    <img src="https://bestwork.cl/wp-content/uploads/2023/05/Logo.png" alt="Best Work Logo" className="logo" />
                    <h2>Bienvenida a tu Panel de Trabajo</h2>

                    {/* Botones principales */}
                    <div className="main-buttons">
                        <button onClick={() => openExternal('https://www.riddle.com/view/357576')}>Test Posiciona</button>
                        <button onClick={() => openExternal('https://www.youtube.com/watch?time_continue=9&v=ws7VZnz70Ec')}>Video Campus</button>
                        <button onClick={() => openExternal('https://drive.google.com/drive/folders/1efbd3lupHso7R7uiJbUZhQJgZZFOYe4h')}>Imágenes Apoyo</button>
                        <button onClick={() => openExternal('https://mensajes-adm.vercel.app/')}>Soporte Académico</button>
                        <button onClick={() => openExternal('https://www.flow.cl/app/web/pagarBtnPago.php?token=wtw8dvv')}>Pago $39.990</button>
                        <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=uk6tvce')}>Pago $29.990</button>
                        <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=y0hliy3')}>Pago $20.000</button>
                        <button onClick={() => openExternal('https://www.flow.cl/btn.php?token=qd9nyjy')}>Pago Oral Placement</button>
                    </div>

                    {/* Sección de botones en dos columnas */}
                    <div className="grid-section">
                        <div className="left-column">
                            <button className="messagebird" onClick={() => openExternal('https://inbox.messagebird.com/workspace')}>MESSAGEBIRD</button>
                            <button className="serpo" onClick={() => openExternal('https://ventab.serpo.cl/inicio/bestwork')}>SERPO</button>
                            <button className="drive" onClick={() => openExternal('https://drive.google.com/drive/folders/1_u7MwZwVaBiJh4eoJdV7JPBGrJCco57h')}>DRIVE</button>
                            <button className="active-campaign" onClick={() => openExternal('https://sedsa.activehosted.com/')}>ACTIVE CAMPAIGN</button>
                        </div>
                        <div className="right-column">
                            <button className="webmail" onClick={() => openExternal('https://www.bestwork.cl:2096/')}>WEBMAIL</button>
                            <button className="reloj-control" onClick={() => openExternal('https://trabajador.relojcontrol.com')}>RELOJ CONTROL</button>
                        </div>
                    </div>

                    {/* Formulario de búsqueda */}
                    <form onSubmit={handleSearch}>
                        <h3>Verifica correo del contacto para ingresar a los formularios</h3>
                        <h5>REFERIDOS - BIENVENIDA - ONBOARDING</h5>
                        <input
                            type="email"
                            placeholder="Introduce el correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Buscar</button>
                    </form>

                    {/* Resultados */}
                    <div>
                        <p>{result}</p>
                        {showCopy && <button onClick={copyEmail}>Copiar correo</button>}
                    </div>

                    {/* Selección de formularios */}
                    {showFormSelection && (
                        <div className="form-selection">
                            <button onClick={() => showForm('https://sedsa.activehosted.com/f/38')}>REFERIDOS</button>
                            <button onClick={() => showForm('https://sedsa.activehosted.com/f/114')}>BIENVENIDA</button>
                            <button onClick={() => showForm('https://calendly.com/onboarding_bestwork/onboarding')}>ONBOARDING</button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
