import { Routes } from '@angular/router';
import { MyComponentComponent } from './my-component/my-component.component';
import { FinancesComponent } from './finances/finances.component';
import { CareerComponent } from './career/career.component';
import { OffspringComponent } from './offspring/offspring.component';

export const routes: Routes = [
    {
        path: 'main',
        component: MyComponentComponent,
    },
    {
        path: 'finance',
        component: FinancesComponent,
    },
    {
        path: 'employe',
        component: CareerComponent,
    },
    {
        path: 'offspring',
        component: OffspringComponent,
    }
];
