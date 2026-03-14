'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, CreditCard, Truck, Package, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import Header from '@/components/Header';
import { Address } from '@/lib/types';

const steps = [
  { id: 1, name: 'Cart', icon: Package },
  { id: 2, name: 'Shipping', icon: Truck },
  { id: 3, name: 'Payment', icon: CreditCard },
  { id: 4, name: 'Review', icon: CheckCircle },
];

const shippingMethods = [
  { id: 'standard', name: 'Standard Shipping', price: 0, days: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 29.99, days: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 59.99, days: 'Next business day' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useUserStore();
  const [currentStep, setCurrentStep] = useState(2);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingAddress, setShippingAddress] = useState<Address>({
    id: '',
    name: user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: true,
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const shippingCost = shippingMethods.find(m => m.id === shippingMethod)?.price || 0;
  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleSubmitOrder = async () => {
    const orderData = {
      userId: user?.id || 'guest',
      items,
      shippingAddress,
      total,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      
      const order = await res.json();
      setOrderId(order.id);
      setOrderComplete(true);
      clearCart();
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background-alt">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <Package className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
            <Link href="/products" className="text-accent hover:text-accent-hover">
              Continue shopping
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background-alt">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">Order Confirmed!</h1>
            <p className="text-text-secondary mb-2">Order ID: {orderId}</p>
            <p className="text-text-secondary mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/products"
                className="px-6 py-3 border border-border bg-white hover:bg-background-alt transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                href="/account"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white transition-colors"
              >
                View Orders
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-alt">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 ${
                      currentStep >= step.id ? 'text-primary' : 'text-text-muted'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center border-2 ${
                        currentStep > step.id
                          ? 'bg-success border-success text-white'
                          : currentStep >= step.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-border'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-0.5 mx-2 ${
                        currentStep > step.id ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {currentStep === 2 && (
                <div className="bg-white border border-border p-6">
                  <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        value={shippingAddress.name}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                        className="w-full h-10 px-3 border border-border focus:border-accent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Street Address</label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        className="w-full h-10 px-3 border border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full h-10 px-3 border border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="w-full h-10 px-3 border border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className="w-full h-10 px-3 border border-border focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Country</label>
                      <input
                        type="text"
                        value={shippingAddress.country}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                        className="w-full h-10 px-3 border border-border focus:border-accent"
                      />
                    </div>
                  </div>

                  <h3 className="font-semibold mt-6 mb-3">Shipping Method</h3>
                  <div className="space-y-2">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 border cursor-pointer ${
                          shippingMethod === method.id
                            ? 'border-accent bg-accent/5'
                            : 'border-border hover:border-primary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={() => setShippingMethod(method.id)}
                            className="w-4 h-4 accent-accent"
                          />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-text-secondary">{method.days}</p>
                          </div>
                        </div>
                        <span className="font-medium">
                          {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="bg-white border border-border p-6">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  
                  <div className="space-y-2 mb-6">
                    <label
                      className={`flex items-center p-4 border cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 accent-accent mr-3"
                      />
                      <CreditCard className="w-5 h-5 mr-2" />
                      <span>Credit / Debit Card</span>
                    </label>
                    <label
                      className={`flex items-center p-4 border cursor-pointer ${
                        paymentMethod === 'invoice'
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="invoice"
                        checked={paymentMethod === 'invoice'}
                        onChange={() => setPaymentMethod('invoice')}
                        className="w-4 h-4 accent-accent mr-3"
                      />
                      <span>Invoice (Net 30)</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full h-10 px-3 border border-border focus:border-accent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiry Date</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full h-10 px-3 border border-border focus:border-accent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVC</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="123"
                            className="w-full h-10 px-3 border border-border focus:border-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="bg-white border border-border p-6">
                    <h3 className="font-semibold mb-3">Shipping Address</h3>
                    <p className="text-text-secondary">{shippingAddress.name}</p>
                    <p className="text-text-secondary">{shippingAddress.street}</p>
                    <p className="text-text-secondary">
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                    </p>
                    <p className="text-text-secondary">{shippingAddress.country}</p>
                  </div>

                  <div className="bg-white border border-border p-6">
                    <h3 className="font-semibold mb-3">Payment Method</h3>
                    <p className="text-text-secondary">
                      {paymentMethod === 'card'
                        ? `Card ending in ${cardNumber.slice(-4) || '****'}`
                        : 'Invoice (Net 30)'}
                    </p>
                  </div>

                  <div className="bg-white border border-border p-6">
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.productId} className="flex gap-3">
                          <div className="w-12 h-12 bg-background-alt shrink-0">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-sm text-text-secondary">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 2 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex items-center gap-2 px-6 py-3 border border-border bg-white hover:bg-background-alt transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 px-6 py-3 border border-border bg-white hover:bg-background-alt transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                  </Link>
                )}
                
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    className="flex items-center gap-2 px-6 py-3 bg-success hover:bg-success/90 text-white transition-colors"
                  >
                    Place Order
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-border p-6 sticky top-24">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex gap-3">
                      <div className="w-12 h-12 bg-background-alt shrink-0 relative">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.product.name}</p>
                        <p className="text-sm text-text-secondary">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Shipping</span>
                    <span>
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
