import { DropdownRole } from './store/models/manager.model';

/* -------------------------------------------------------------------------- */
/*                                  Database                                  */
/* -------------------------------------------------------------------------- */
export const MENU_DROPDOWN_MANAGER_ADMIN: DropdownRole[] = [
  { id: '00', name: 'เเอดมิน', value: 'admin' },
  { id: '01', name: 'อาจารย์', value: 'teacher' },
  { id: '02', name: 'นิสิต', value: 'student' },
];

export const MENU_DROPDOWN_GROUP_ADMIN: any[] = [
  {
    id: '00',
    name: 'เทคโนโลยีสารสนเทศและการสื่อสาร',
    value: 'เทคโนโลยีสารสนเทศและการสื่อสาร',
  },
  // {
  //   id: '01',
  //   name: '',
  //   value: '',
  // },
  // {
  //   id: '02',
  //   name: '',
  //   value: '',
  // },
];

export const MENU_DROPDOWN_MAJOR_ADMIN: any[] = [
  {
    id: '00',
    name: 'วิศวกรรมคอมพิวเตอร์',
    value: 'วิศวกรรมคอมพิวเตอร์',
  },
  // {
  //   id: '01',
  //   name: '',
  //   value: '',
  // },
  // {
  //   id: '02',
  //   name: '',
  //   value: '',
  // },
];
