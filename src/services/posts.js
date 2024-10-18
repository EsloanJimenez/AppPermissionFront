import axios from "axios";
import { show_alert } from "@/js/swal";

export const postPermission = async (firstName, lastName, permissionTypeId, permissionDate) => {
   if (firstName === '')
      show_alert('El campo nombre es obligatorio.', 'warning')
   else if (lastName === '')
      show_alert('El campo apellido es obligatorio.', 'warning')
   else if (permissionTypeId == undefined)
      show_alert('El campo tipo permiso es obligatorio.', 'warning')
   else if (permissionDate === '')
      show_alert('El campo fecha es obligatorio.', 'warning')
   else {
      try {
         const res = await axios.post(`https://localhost:5001/api/Permission`, {
            FirstName: firstName,
            LastName: lastName,
            PermissionType: permissionTypeId,
            PermissionDate: permissionDate
         });

         if (res.status === 200)
            show_alert('Permiso registrado con exito.', 'success');

      } catch (err) {
         if (err.response.data.errors.FirstName)
            show_alert(err.response.data.errors.FirstName, 'warning')
         else if (err.response.data.errors.LastName)
            show_alert(err.response.data.errors.LastName, 'warning')
         else if (err.response.data.errors.PermissionDate)
            show_alert(err.response.data.errors.PermissionDate, 'warning')
      }
   }

}