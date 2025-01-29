import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
   loading: null,
   error: null,
}

const insertReducer = (state, action) => {
   switch (action.type) {
      case "LOADING":
         return {
            loading: true, error: null
         }
      case "INSERTED_DOC":
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
export const useInsertDocument = (docCollection) => {
   //Vamos criar nosso reducer, iniciando o hook utilizando o insertReducer e initialState
   const [response, dispatch] = useReducer(insertReducer, initialState);

   //deal with memory leak
   const [cancelled, setCancelled] = useState(false);

   const checkCancelBeforeDispatch = (action) => {
      if (!cancelled) {
         dispatch(action);
      }
   }

   //Funcao que vai inserir o documento que quero inserir no DB
   const insertDocument = async (document) => {

      checkCancelBeforeDispatch({
         type: "LOADING"
      });

      try {
         const newDocument = { ...document, createdAt: Timestamp.now() }

         //Essa funcao contem o resultado da insercao, usando o await addDoc passando a collection que eh o metodo, que vai ter como parametro o db e a colecao que eu quero inserir o documento. 
         const insertedDocument = await addDoc(
            //basicamente ele vai procurar no nosso banco de dados aquela colecao que eu passei como argumento da funcao
            collection(db, docCollection),
            //como proximo argumento do meu doc, eu passo o:
            newDocument
         )

         checkCancelBeforeDispatch({
            type: "INSERTED_DOC",
            payload: insertedDocument
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

   return {insertDocument, response }
}