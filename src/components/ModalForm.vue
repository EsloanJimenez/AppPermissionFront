<template>
  <div
    class="modal fade"
    id="myModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            {{ props.title }} Permiso
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="firstName" class="form-label">Nombre</label>
            <input
              type="text"
              v-model="formData.firstName"
              id="firstName"
              class="form-control"
              name="firstName"
              placeholder=" "
            />
          </div>

          <div class="mb-3">
            <label for="lastName" class="form-label">Apellido</label>
            <input
              type="text"
              v-model="formData.lastName"
              id="lastName"
              class="form-control"
              name="lastName"
              placeholder=" "
            />
          </div>

          <div class="mb-3">
            <label for="permissionType" class="form-label">Tipo Permiso</label>
            <select
              v-model="formData.permissionType"
              name="permissionType"
              id="permissionType"
              class="form-select"
            >
              <option
                v-for="(item, i) in datosPermissionType"
                :key="i"
                :value="item.permissionTypeId"
              >
                {{ item.description }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="permissionDate" class="form-label"
              >Fecha del permiso</label
            >
            <input
              type="date"
              v-model="formData.permissionDate"
              id="permissionDate"
              class="form-control"
              name="permissionDate"
              placeholder=" "
            />
          </div>
        </div>
        <div class="modal-footer">
          <NewBotton
            :title="title"
            btnStyle="btn btn-primary"
            data-bs-dismiss="modal"
            @click="handleAction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits, defineProps, watch } from "vue";
import NewBotton from "./NewBotton.vue";
import { getPermissionType } from "@/services/gets";
import { putPermision } from "@/services/puts";

const datosPermissionType = ref([]);

onMounted(async () => {
  datosPermissionType.value = await getPermissionType();
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
  },
});

const formData = ref({ ...props.formData });

watch(
  () => props.formData,
  (newData) => {
    formData.value = { ...newData };
  }
);

const emit = defineEmits(["send-data"]);

const sendData = () => {
  emit("send-data", {
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    permissionType: formData.value.permissionType,
    permissionDate: formData.value.permissionDate,
  });
};

const handleAction = () => {
  if (props.title === "Registrar") {
    sendData();
  } else if (props.title === "Actualizar") {
    putPermision(
      formData.value.permissionId,
      formData.value.firstName,
      formData.value.lastName,
      formData.value.permissionType,
      formData.value.permissionDate
    );
  }
};
</script>

<style scoped>
.modal-body input,
.modal-body select {
  width: 100%;
  margin-bottom: 15px;
}
</style>
