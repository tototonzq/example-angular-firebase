import { MenuItem } from './store/models/sidebar.interface';

// TODO : menu
export const MENU_LIST_ADMIN_DATA: MenuItem[] = [
  { id: '00', value: 'admin-dashboard', name: 'แผงควบคุม' },
  { id: '01', value: 'admin-manager', name: 'จัดการผู้ใช้งาน' },
  { id: '02', value: 'admin-manager-table', name: 'ข้อมูลผู้ใช้งาน' },
  { id: '03', value: 'manager-petition', name: 'จัดการคำร้อง' },
];

export const MENU_LIST_STUDENT_DATA: MenuItem[] = [
  { id: '00', value: 'student-dashboard', name: 'แผงควบคุม' },
  { id: '01', value: 'users', name: 'ตรวจสอบคำร้อง' },
  { id: '02', value: 'manager-petition', name: 'จัดการคำร้อง' },
];

export const MENU_LIST_TEACHER_DATA: MenuItem[] = [
  { id: '00', value: 'teacher-dashboard', name: 'แผงควบคุม' },
  { id: '01', value: 't-manager', name: 'ตรวจสอบคำร้อง' },
];
