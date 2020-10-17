import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'

import { FiPlus } from "react-icons/fi";

import './CreateOrphanage.css';
import Sidebar from "../../components/sidebar/Sidebar";
import happyMapIcon from "../../utils/mapIcon";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({longitude: 0, latitude: 0})
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  function handlerMapClick(event : LeafletMouseEvent){

    const { lat, lng} = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  async function handlerSubmit(event: FormEvent){
    event.preventDefault()

    const { longitude, latitude } = position

    const data = new FormData();

    data.append('longitude', String(longitude))
    data.append('latitude', String(latitude))
    data.append('name', name)
    data.append('instructions', instructions)
    data.append('about', about)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach(image =>{
      data.append('images', image)
    })

    await api.post('orphanages', data)

    alert('Cadastro realizado com sucesso!')

    history.push('/app')
  }

  function handlerSelectImages(event: ChangeEvent<HTMLInputElement>){

    if (!event.target.files){
      return
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const previewImages = selectedImages.map(image =>{
      return URL.createObjectURL(image)
    })

    setPreviewImages(previewImages)
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Novo Orfanato</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handlerMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {
                position.latitude !== 0 && (
                  <Marker 
                    interactive={false} 
                    icon={happyMapIcon} 
                    position={[position.latitude,position.longitude]} />
                )
              }
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>
              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handlerSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit" onClick={handlerSubmit}>
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}