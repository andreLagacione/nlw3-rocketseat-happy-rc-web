import React, { useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';
import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidenar";
import mapIcon from "../utils/mapIcon";

export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng
    });

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-26.9015848,-49.0918178]}
              style={{ width: '100%', height: 280 }}
              zoom={14}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <input id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp_number">Número de WhatsApp</label>
              {/* <InputMask
                mask="+55\ (\099)\ 99999-9999"
                maskChar=" "
                id="whatsapp_number"
                value={whatsapp_number}
                onChange={e => setWhatsappNumber(e.target.value)}
              /> */}
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {/* {previewImages.map((image, index) => {
                  return (
                    <div className="image-item" key={image}>
                      <button type="button" onClick={() => handleCancelImage(image, index)} className="close-button">
                        <FiPlus id="close-icon" size={24} color="#FF669D" />
                      </button>
                      <img src={image} alt={name} />
                    </div>
                  )
                })} */}
                
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              {/* <input multiple onChange={handleSelectImages} type="file" id="image[]"/> */}
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                // value={instructions}
                // onChange={e => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                // value={opening_hours}
                // onChange={e => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  // className={open_on_weekends ? 'active' : ''}
                  // onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  // className={!open_on_weekends ? 'active-closed' : ''}
                  // onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}