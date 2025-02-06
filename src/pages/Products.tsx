import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  { id: 1, name: "Premium Widget", price: 99.99, quantity: 0 },
  { id: 2, name: "Basic Gadget", price: 49.99, quantity: 0 },
  { id: 3, name: "Deluxe Package", price: 199.99, quantity: 0 },
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 0) return;
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    ));
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  const handleCheckout = () => {
    if (calculateTotal() > 0) {
      toast({
        title: "Order Placed!",
        description: `Total amount: $${calculateTotal().toFixed(2)}`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please select at least one product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Selection</h1>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Quantity</th>
                <th className="text-left p-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-12 text-center">{product.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <Button onClick={handleCheckout} className="bg-primary hover:bg-primary/90">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;