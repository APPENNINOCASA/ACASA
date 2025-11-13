import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import '../styles/AddProperty.css'

function AddProperty() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'appartamento',
    price: '',
    price_type: 'vendita',
    surface_area: '',
    rooms: '',
    bathrooms: '',
    floor: '',
    address: '',
    city: '',
    postal_code: '',
    province: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('properties')
      .insert([{
        ...formData,
        user_id: user.id,
        price: parseFloat(formData.price),
        surface_area: parseFloat(formData.surface_area),
        rooms: parseInt(formData.rooms),
        bathrooms: parseInt(formData.bathrooms),
        floor: parseInt(formData.floor)
      }])
      .select()

    if (error) {
      alert('Errore durante il salvataggio: ' + error.message)
      setLoading(false)
    } else {
      alert('Immobile aggiunto con successo!')
      navigate('/dashboard')
    }
  }

  return (
    <div className="add-property-container">
      <div className="add-property-header">
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          ← Torna alla Dashboard
        </button>
        <h1>Aggiungi Nuovo Immobile</h1>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-section">
          <h2>Informazioni Generali</h2>
          
          <div className="form-group">
            <label htmlFor="title">Titolo Annuncio *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Es: Bellissimo appartamento in centro"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrizione</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrivi l'immobile in dettaglio..."
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="property_type">Tipo Immobile *</label>
              <select
                id="property_type"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                required
              >
                <option value="appartamento">Appartamento</option>
                <option value="villa">Villa</option>
                <option value="attico">Attico</option>
                <option value="monolocale">Monolocale</option>
                <option value="bilocale">Bilocale</option>
                <option value="trilocale">Trilocale</option>
              </select>
            </div>

            <div className="form-group">
  <label htmlFor="price_type">Tipologia *</label>
  <select
    id="price_type"
    name="price_type"
    value={formData.price_type}
    onChange={handleChange}
    required
  >
    <option value="vendita">Vendita</option>
    <option value="affitto_giornaliero">Affitto Breve</option>
    <option value="affitto_mensile">Affitto Classico</option>
  </select>
</div>


          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Prezzo (€) *</label>
              <input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="150000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="surface_area">Superficie (m²) *</label>
              <input
                id="surface_area"
                name="surface_area"
                type="number"
                value={formData.surface_area}
                onChange={handleChange}
                placeholder="85"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rooms">Numero Stanze *</label>
              <input
                id="rooms"
                name="rooms"
                type="number"
                value={formData.rooms}
                onChange={handleChange}
                placeholder="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bathrooms">Numero Bagni *</label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="2"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="floor">Piano</label>
              <input
                id="floor"
                name="floor"
                type="number"
                value={formData.floor}
                onChange={handleChange}
                placeholder="2"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Posizione</h2>
          
          <div className="form-group">
            <label htmlFor="address">Indirizzo *</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Via Roma, 123"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">Città *</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Bologna"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="province">Provincia *</label>
              <input
                id="province"
                name="province"
                type="text"
                value={formData.province}
                onChange={handleChange}
                placeholder="BO"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code">CAP</label>
              <input
                id="postal_code"
                name="postal_code"
                type="text"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="40100"
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Salvataggio...' : 'Salva Immobile'}
        </button>
      </form>
    </div>
  )
}

export default AddProperty
