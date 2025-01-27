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

// Define the context's value type, including both products and vendors
interface DataContextType {
  products: Product[];
  vendors: Vendor[];
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined,
);

export function AppWrapper({ children }) {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await ApiFunction({ url: 'products' });
      setProducts(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch data in context:', error);
    }
  };

  const fetchVendorData = async () => {
    try {
      const response = await ApiFunction({ url: 'vendors' });
      setVendors(response?.data || []);
    } catch (error) {
      console.error('Failed to fetch data in context:', error);
    }
  };

  useEffect(() => {
    fetchProductData();
    fetchVendorData();
  }, []);
  return (
    <DataContext.Provider value={{ products, vendors }}>
      {children}
    </DataContext.Provider>
  );
}
