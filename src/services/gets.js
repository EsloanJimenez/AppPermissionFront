import axios from "axios";

const url = 'https://localhost:5001/api/';

export const getPermissionType = async () => {
   try {
      const res = await axios(`${url}PermissionType`);

      const viewRes = await res.data;

      return viewRes;
   } catch (err) {
      console.log(`Error al obtener los tipos de permiso: ${err}`);
      throw err;
   }
}

export const getPermission = async () => {
   try {
      const res = await axios(`${url}Permission`);

      const viewRes = await res.data;

      return viewRes;
   } catch (err) {
      console.log(`Error al obtener los tipos de permiso: ${err}`);
      throw err;
   }
}