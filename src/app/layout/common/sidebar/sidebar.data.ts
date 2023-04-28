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
  { id: '01', value: 'card', name: 'Card' },
  { id: '02', value: 'form-input', name: 'From Input' },
  { id: '03', value: 'routes-compo', name: 'Routes Component' },
  { id: '04', value: 'table-data', name: 'Table' },
  { id: '05', value: 'manager-user', name: 'การจัดการผู้ใช้งาน' },
  { id: '06', value: 'users', name: 'ตรวจสอบคำร้อง' },
  { id: '07', value: 'user-form', name: 'จัดการคำร้อง' },
];

export const MENU_LIST_TEACHER_DATA: MenuItem[] = [
  { id: '00', value: 'teacher-dashboard', name: 'แผงควบคุม' },
  { id: '01', value: 't-manager', name: 'ตรวจสอบคำร้อง' },
];
