import { StateClass } from '@ngxs/store/internals';
import { LayoutState } from './layout/store/layout.state';

export const Stores: StateClass<any>[] | undefined = [LayoutState];
