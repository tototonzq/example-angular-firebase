import { RoleType } from 'src/app/shared/types/role.type';
import { Layout } from './layout.model';

/* -------------------------------------------------------------------------- */
/*                                Change Layout                               */
/* -------------------------------------------------------------------------- */
export type ChangeLayoutPayload = { role: RoleType , layout: Layout };
export type ChangeRolePayload = { role: RoleType , layout: Layout };
