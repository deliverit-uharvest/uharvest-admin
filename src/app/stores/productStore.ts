// src/app/stores/productStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import { fetchProducts } from "../services/ProductService";
import CategoryFilter from "../interfaces/filters";

interface ProductResponse {
  status: string;
  data: any[];
  message?: string;
}

export default class productStore {
  products: any[] = [];
  searchTerm: string = "";
  selectedCategoryFilters: CategoryFilter[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadProducts = async () => {
    this.loading = true;
    try {
      const res = (await fetchProducts()) as ProductResponse; // ✅ proper type
      if (res.status === "success") {
        runInAction(() => {
          this.products = res.data;
        });
      } else {
        toast.error(res.message || "Failed to load products");
      }
    } catch (error) {
      toast.error("Could not load products");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  setSearchTerm = (term: string) => {
    this.searchTerm = term;
  };

  get filteredproducts() {
    const term = this.searchTerm.toLowerCase();
    const categoryIds = this.selectedCategoryFilters.map((c) => c.id);

    return this.products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(term);
      const matchesCategory =
        categoryIds.length === 0 ||
        categoryIds.includes(Number(product.category_id));

      return matchesSearch && matchesCategory;
    });
  }

  setSelectedFilters = (filters: CategoryFilter[]) => {
    this.selectedCategoryFilters = filters;
  };
}
