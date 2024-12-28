import { StoreItem } from "src/app/shared/storeItem";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { CategoryService } from "./category.service";
import { Category } from "../../types/category.types";
@Injectable()
export class CategoriesStoreItem extends StoreItem<Category[]> {
    constructor(private categoryService: CategoryService) {
        super([]);
        // this.loadCategories(); // Ensure this is called

    }

    async loadCategories() {
        this.categoryService.getAllCategories().subscribe(categories => { this.setValue(categories) });
    }

    get categories$(): Observable<Category[]> {
        return this.value$;
    }

    get topLevelCategories$(): Observable<Category[]> {
        return this.value$.pipe(map(categories =>
            categories.filter(category => category.parent_category_id === null)
        ));
    }
}