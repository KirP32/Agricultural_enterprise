import { Routes } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';
import { FinancesComponent } from './finances/finances.component';

export const routes: Routes = [
    {
        path: 'main',
        component: MyComponentComponent,
    },
    {
        path: 'finance',
        component: FinancesComponent,
    }
];
