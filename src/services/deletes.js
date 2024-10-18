import { show_alert } from "@/js/swal";
import axios from "axios"
import Swal from "sweetalert2";

export const deletePermission = (id, firstName, lastName) => {
   Swal.fire({
      title: `Seguro de eliminar el permiso de: ${firstName} ${lastName}?`,
      text: 'No se podra dar marcha a tras',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'cancelar'
   }).then(async (result) => {
      if (result.isConfirmed) {
         const res = await axios.put(`https://localhost:5001/api/Permission/Delete/${id}`, {
            PermissionId: id
         });

         if (res.status === 200 || res.status === 204) {
            show_alert('Permiso eliminado con exito.', 'success');
         }
      } else {
         show_alert('El Permiso NO Fue Eliminado', 'info');
      }
   })
}