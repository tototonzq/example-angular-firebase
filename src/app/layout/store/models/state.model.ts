import { RoleType } from 'src/app/shared/types/role.type';
import { Layout } from './layout.model';

export interface LayoutStateModel {
  sidebar_open: boolean;
  role: RoleType;
  layout: Layout;
}
