import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../supabase/client';

interface Student {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  student_id: string;
  grade: string;
  created_at: string;
  updated_at: string;
}

export const useStudentStore = defineStore('students', () => {
  const students = ref<Student[]>([]);
  const loading = ref(false);

  async function fetchStudents() {
    try {
      loading.value = true;
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      students.value = data;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function addStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) {
    try {
      loading.value = true;
      const { data, error } = await supabase
        .from('students')
        .insert(student)
        .select()
        .single();

      if (error) throw error;
      students.value.unshift(data);
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function updateStudent(id: string, updates: Partial<Student>) {
    try {
      loading.value = true;
      const { data, error } = await supabase
        .from('students')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const index = students.value.findIndex(s => s.id === id);
      if (index !== -1) {
        students.value[index] = data;
      }
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function deleteStudent(id: string) {
    try {
      loading.value = true;
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', id);

      if (error) throw error;
      students.value = students.value.filter(s => s.id !== id);
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return {
    students,
    loading,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent
  };
});