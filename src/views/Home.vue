<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900">Students</h1>
      <Button label="Add Student" icon="pi pi-plus" @click="showDialog = true" />
    </div>

    <DataTable :value="studentStore.students" :loading="studentStore.loading" stripedRows>
      <Column field="student_id" header="Student ID"></Column>
      <Column field="first_name" header="First Name"></Column>
      <Column field="last_name" header="Last Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="grade" header="Grade"></Column>
      <Column header="Actions">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-text" @click="editStudent(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="deleteStudent(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="showDialog" :header="editMode ? 'Edit Student' : 'Add Student'" modal>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <InputText v-model="form.first_name" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <InputText v-model="form.last_name" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <InputText v-model="form.email" type="email" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Student ID</label>
          <InputText v-model="form.student_id" class="w-full" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Grade</label>
          <InputText v-model="form.grade" class="w-full" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
        <Button :label="editMode ? 'Update' : 'Save'" icon="pi pi-check" @click="saveStudent" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useStudentStore } from '../stores/students';
import { useAuthStore } from '../stores/auth';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const studentStore = useStudentStore();
const authStore = useAuthStore();
const showDialog = ref(false);
const editMode = ref(false);
const editId = ref('');

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  student_id: '',
  grade: '',
  user_id: ''
});

onMounted(async () => {
  if (authStore.user) {
    await studentStore.fetchStudents();
  }
});

function editStudent(student: any) {
  editMode.value = true;
  editId.value = student.id;
  form.value = { ...student };
  showDialog.value = true;
}

async function saveStudent() {
  try {
    console.log('abc');
    console.log(authStore.user);
    if (!authStore.user) {
      return;
    }
    
    form.value.user_id = authStore.user.id;
    
    if (editMode.value) {
      await studentStore.updateStudent(editId.value, form.value);
    } else {
      console.log(form.value)
      await studentStore.addStudent(form.value);
    }
    closeDialog();
  } catch (error) {
    console.error('Error saving student:', error);
  }
}

async function deleteStudent(id: string) {
  try {
    await studentStore.deleteStudent(id);
  } catch (error) {
    console.error('Error deleting student:', error);
  }
}

function closeDialog() {
  showDialog.value = false;
  editMode.value = false;
  editId.value = '';
  form.value = {
    first_name: '',
    last_name: '',
    email: '',
    student_id: '',
    grade: '',
    user_id: ''
  };
}
</script>