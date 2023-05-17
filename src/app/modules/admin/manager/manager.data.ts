import { DropdownRole } from './store/models/manager.model';

/* -------------------------------------------------------------------------- */
/*                                  Database                                  */
/* -------------------------------------------------------------------------- */
export const MENU_DROPDOWN_MANAGER_ADMIN: DropdownRole[] = [
  { id: '00', name: 'เเอดมิน', value: 'admin' },
  { id: '01', name: 'อาจารย์', value: 'teacher' },
  { id: '02', name: 'นิสิต', value: 'student' },
];

export const MENU_DROPDOWN_MANAGER_ADMIN_FILTER: DropdownRole[] = [
  { id: '00', name: 'เเอดมิน', value: 'admin' },
  { id: '01', name: 'อาจารย์', value: 'teacher' },
  { id: '02', name: 'นิสิต', value: 'student' },
  { id: '03', name: 'ทั้งหมด', value: '' },
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
    name: 'สาขาวิชาการคอมพิวเตอร์',
    value: 'สาขาวิชาการคอมพิวเตอร์',
  },
  {
    id: '01',
    name: 'สาชาวิชาวิทยาการข้อมูลและการประยุกต์',
    value: 'สาชาวิชาวิทยาการข้อมูลและการประยุกต์',
  },
  {
    id: '02',
    name: 'สาขาวิชาวิศวกรรมคอมพิวเตอร์',
    value: 'สาขาวิชาวิศวกรรมคอมพิวเตอร์',
  },
  {
    id: '03',
    name: 'สาขาวิชาวิศวกรรมซอฟต์แวร์',
    value: 'สาขาวิชาวิศวกรรมซอฟต์แวร์',
  },
  {
    id: '04',
    name: 'สาขาวิชาคอมพิวเตอร์กราฟิกและมัลติมีเดีย',
    value: 'สาขาวิชาคอมพิวเตอร์กราฟิกและมัลติมีเดีย',
  },
  {
    id: '05',
    name: 'สาขาวิชาภูมิศาสตร์',
    value: 'สาขาวิชาภูมิศาสตร์',
  },
  {
    id: '06',
    name: 'สาขาวิชาเทคโนโลยีสารสนเทศ',
    value: 'สาขาวิชาเทคโนโลยีสารสนเทศ',
  },
  {
    id: '07',
    name: 'สาขาวิชาธุรกิจดิจิทัล',
    value: 'สาขาวิชาธุรกิจดิจิทัล',
  },
];
