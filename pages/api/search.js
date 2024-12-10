export default async function handler(req, res) {
    const { email } = req.query;
  
    const API_KEY = "d2830a151e2d5ae79ee56b3bf8035c9728d27a1c75fbd2fe89eff5f11c57f078c0f93ae1";
    const API_URL = "https://sedsa.api-us1.com/api/3/contacts";
  
    try {
      const response = await fetch(`${API_URL}?email=${email}`, {
        headers: { "Api-Token": API_KEY },
      });
  
      const data = await response.json();
  
      if (data.contacts && data.contacts.length > 0) {
        const phone = data.contacts[0].phone || "Teléfono no disponible";
        return res.status(200).json({ phone });
      } else {
        return res.status(404).json({ message: "No se encuentra el alumno." });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al conectar con la API." });
    }
  }
  