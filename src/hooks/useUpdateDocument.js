import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
   loading: null,
   error: null,
}

const updateReducer = (state, action) => {
   switch (action.type) {
      case "LOADING":
         return {
            loading: true, error: null
         }
      case "UPDATED_DOC":
         return {
            loading: false, error: null
         }
      case "ERROR":
         return {
            loading: false, error: action.payload
         }
      default:
         return state
   }
}

//Aqui vamos receber a coleção e o documento que queremos inserir, fazendo com que seja possivel inserir qualquer elemento que eu precisar.
export const useUpdateDocument = (docCollection) => {
   //Vamos criar nosso reducer, iniciando o hook utilizando o updateReducer e initialState
   const [response, dispatch] = useReducer(updateReducer, initialState);

   //deal with memory leak
   const [cancelled, setCancelled] = useState(false);

   const checkCancelBeforeDispatch = (action) => {
      if (!cancelled) {
         dispatch(action);
      }
   }

   //Funcao que vai inserir o documento que quero inserir no DB
   const updateDocument = async (id, data) => {

      checkCancelBeforeDispatch({
         type: "LOADING"
      });

      try {
         const docRef = await doc(db, docCollection, id);

         const updatedDocument = await updateDoc(docRef, data);

         checkCancelBeforeDispatch({
            type: "UPDATED_DOC",
            payload: updatedDocument
         })
      } catch (error) {
         checkCancelBeforeDispatch({
            type: "ERROR",
            payload: error.message,
         })
      }
   }

   useEffect(() => {
      return () => setCancelled(true)
   }, [])

   return {updateDocument, response }
}