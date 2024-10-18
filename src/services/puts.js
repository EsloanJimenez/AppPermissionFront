import { show_alert } from "@/js/swal"
import axios from "axios"

export const putPermision = async (id, firstName, lastName, permissionTypeId, permissionDate) => {
   if (firstName === '')
      show_alert('El campo nombre es obligatorio.', 'warning')
   else if (lastName === '')
      show_alert('El campo apellido es obligatorio.', 'warning')
   else if (permissionTypeId == undefined)
      show_alert('El campo tipo permiso es obligatorio.', 'warning')
   else if (permissionDate === '')
      show_alert('El campo fecha es obligatorio.', 'warning')
   const res = await axios.put(`https://localhost:5001/api/Permission/${id}`, {
      PermissionId: id,
      FirstName: firstName,
      LastName: lastName,
      PermissionType: permissionTypeId,
      PermissionDate: permissionDate
   });

   if (res.status === 200 || res.status === 204)
      show_alert('Permiso actualizado con exito.', 'success');
}