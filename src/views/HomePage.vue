<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Lista de permisos</h3>
      <NewBotton
        title="+"
        btnStyle="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
        @update-title="openModal('Registrar', {})"
      />
    </div>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Permiso</th>
          <th>Fecha de permiso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in datosPermission" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.permissionDate }}</td>
          <td>
            <NewBotton
              title="Actualizar"
              btnStyle="btn btn-warning btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              @click="openModal('Actualizar', item)"
            />
            <NewBotton
              title="Eliminar"
              btnStyle="btn btn-danger btn-sm"
              @click="
                deletePermission(
                  item.permissionId,
                  item.firstName,
                  item.lastName
                )
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <ModalForm
    :title="modalTitle"
    :form-data="selectedPermission"
    @send-data="onSubmit"
  />
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import ModalForm from "@/components/ModalForm.vue";
import NewBotton from "@/components/NewBotton.vue";
import { getPermission } from "@/services/gets";
import { postPermission } from "@/services/posts";
import { deletePermission } from "@/services/deletes";

const receivedData = ref({});
const datosPermission = ref([]);
const modalTitle = ref("");
const selectedPermission = ref({});

onMounted(async () => {
  datosPermission.value = await getPermission();
});

onUpdated(async () => {
  datosPermission.value = await getPermission();
});

const openModal = (title, permission) => {
  modalTitle.value = title;
  selectedPermission.value = permission;
};

const onSubmit = async (data) => {
  receivedData.value = data;

  console.log(receivedData.value);

  await postPermission(
    receivedData.value.firstName,
    receivedData.value.lastName,
    receivedData.value.permissionType,
    receivedData.value.permissionDate
  );
};
</script>

<style scoped></style>
