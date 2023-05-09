import { MenuItem } from './store/models/sidebar.interface';

// TODO : ADMIN
export const MENU_LIST_ADMIN_DATA: MenuItem[] = [
  { id: '', value: 'admin-dashboard', name: 'แผงควบคุม' },
  { id: '', value: 'admin-manager', name: 'จัดการผู้ใช้งาน' },
  { id: '', value: 'admin-manager-table', name: 'ข้อมูลผู้ใช้งาน' },
  { id: '', value: 'manager-petition', name: 'จัดการคำร้อง' },
  // { id: '', value: 'manager-petition-setting', name: 'ตั้งค่าการคำร้อง' },
];

// TODO : STUDENT
export const MENU_LIST_STUDENT_DATA: MenuItem[] = [
  { id: '', value: 'student-dashboard', name: 'แผงควบคุม' },
  { id: '', value: 'student-manager-petition', name: 'จัดการคำร้อง' },
  { id: '', value: 'student-petition-table', name: 'ตรวจสอบคำร้อง' },
];

// TODO : TEACHER
export const MENU_LIST_TEACHER_DATA: MenuItem[] = [
  { id: '', value: 'teacher-dashboard', name: 'แผงควบคุม' },
  { id: '', value: 't-manager', name: 'ตรวจสอบคำร้อง' },
];
