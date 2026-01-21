import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axiosConfig';

const initialState = {
    products: [],
    currentProduct: null,
    featured: [],
    latest: [],
    filters: {
        category: '',
        minPrice: 0,
        maxPrice: 100000,
        search: '',
        sort: 'createdAt',
        order: 'desc'
    },
    pagination: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
        hasMore: false
    },
    isLoading: false,
    isError: false,
    message: ''
};

// Fetch all products with filters
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (params = {}, thunkAPI) => {
        try {
            const { page = 1, limit = 12, category, minPrice, maxPrice, search, sort, order } = params;

            let queryString = `?page=${page}&limit=${limit}`;
            if (category) queryString += `&category=${category}`;
            if (minPrice) queryString += `&minPrice=${minPrice}`;
            if (maxPrice) queryString += `&maxPrice=${maxPrice}`;
            if (search) queryString += `&search=${search}`;
            if (sort) queryString += `&sort=${sort}`;
            if (order) queryString += `&order=${order}`;

            const response = await axios.get(`/products${queryString}`);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
    'products/fetchById',
    async (productId, thunkAPI) => {
        try {
            const response = await axios.get(`/products/${productId}`);
            return response.data.data.product;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk(
    'products/fetchFeatured',
    async (limit = 8, thunkAPI) => {
        try {
            const response = await axios.get(`/products/featured?limit=${limit}`);
            return response.data.data.products;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch latest products
export const fetchLatestProducts = createAsyncThunk(
    'products/fetchLatest',
    async (limit = 8, thunkAPI) => {
        try {
            const response = await axios.get(`/products/latest?limit=${limit}`);
            return response.data.data.products;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Search products
export const searchProducts = createAsyncThunk(
    'products/search',
    async (searchQuery, thunkAPI) => {
        try {
            const response = await axios.get(`/products/search?q=${searchQuery}`);
            return response.data.data.products;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async ({ category, page = 1, limit = 12 }, thunkAPI) => {
        try {
            const response = await axios.get(`/products/category/${category}?page=${page}&limit=${limit}`);
            return response.data.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.currentProduct = null;
            })
            // Fetch featured products
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.featured = action.payload;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Fetch latest products
            .addCase(fetchLatestProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchLatestProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.latest = action.payload;
            })
            .addCase(fetchLatestProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Search products
            .addCase(searchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Fetch by category
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset, setFilters, clearFilters, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
