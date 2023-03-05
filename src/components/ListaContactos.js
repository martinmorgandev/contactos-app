import React, { useState, useEffect } from "react";
import styled from "styled-components";
import db from "./../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import Contacto from "./Contacto";

const ListaContactos = () => {
  const [contactos, cambiarContactos] = useState([]);

  useEffect(() => {
    onSnapshot(
      collection(db, 'usuarios'),
      (snaposhot) => {
        // console.log('snaposhoot!')
        // console.log(snaposhot.docs[0].data())
        const arregloUsuarios = snaposhot.docs.map((documento) => {
          return {...documento.data(), id: documento.id}
        })
        console.log(arregloUsuarios)
        cambiarContactos(arregloUsuarios)
      },
      (error) => {
        console.log(error)
      }
      );
  },[])

  return (
    contactos.length > 0 && (
      <ContenedorContactos>
        {contactos.map((contacto) => {
          return (
            <Contacto
              key={contacto.id}
              id={contacto.id}
              nombre={contacto.nombre}
              correo={contacto.correo}
            ></Contacto>
          );
        })}
      </ContenedorContactos>
    )
  );
};

const ContenedorContactos = styled.div`
  margin-top: 40px;
`;

export default ListaContactos;
