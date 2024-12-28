import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { ProductsGalleryComponent } from "./comonents/products-gallery/products-gallery.component";
import { ProductDetailsComponent } from "./comonents/product-details/product-details.component";
import { CartComponent } from "./comonents/cart/cart.component";
import { UserSignupComponent } from "./comonents/users/user-signup/user-signup.component";
import { UserLoginComponent } from "./comonents/users/user-login/user-login.component";
import { PastOrdersComponent } from "./comonents/past-orders/past-orders.component";
import { authGuard } from "./guards/authguard";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: 'products',
            component: ProductsGalleryComponent
        },
        {
            path: 'product/:id',
            component: ProductDetailsComponent
        },
        {
            path: 'cart',
            component: CartComponent,
        },
        {
            path: 'signup',
            component: UserSignupComponent
        },
        {
            path: 'login',
            component: UserLoginComponent
        },
        {
            path: 'pastorders',
            component: PastOrdersComponent,
            canActivate:[authGuard]
        }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }