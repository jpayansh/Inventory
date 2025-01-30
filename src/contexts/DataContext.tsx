import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ApiFunction from 'utils/useApi';

interface Product {
  id: any;
  product_name: string;
  sku_id: string;
  created_at: string;
  updated_at: string;
  // Add other product fields as needed
}

interface Vendor {
  id: any;
  company_name: string;
  company_address: string;
  phone_number: string;
  gst_number: string;
  created_at: string;
  updated_at: string;
  // Add other vendor fields as needed
}

interface Stock {
  units: number;
  batch_number: number;
  product_id: number;
  product_name: string;
}

// Define the context's value type, including both products and vendors
interface DataContextType {
  products: Product[];
  vendors: Vendor[];
  stocks: Stock[];
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export function AppWrapper({ children }) {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [stocks, setStocks] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await ApiFunction({ url: 'products' });
      setProducts(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch product data in context:', error);
    }
  };

  const fetchStockData = async () => {
    try {
      const response = await ApiFunction({
        url: 'inventory?forOrderPage=true',
      });
      setStocks(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch stock data in context:', error);
    }
  };

  const fetchVendorData = async () => {
    try {
      const response = await ApiFunction({ url: 'vendors' });
      setVendors(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch vendor data in context:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchVendorData();
    fetchStockData();
  }, []);
  return (
    <DataContext.Provider value={{ products, vendors, stocks }}>
      {children}
    </DataContext.Provider>
  );
}
