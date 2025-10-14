"use client";

import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Star, Filter, Search, Plus, Minus, X, CreditCard, Smartphone, Banknote, Calendar, Lock, User, MapPin, Phone, Building, Settings, Eye, EyeOff, Copy, Check, Tag, Zap, Clock } from 'lucide-react';
import { Product, CartItem, Category, PaymentMethod, CustomerData, PaymentData, BankAccount } from '@/lib/types';
import QRCode from 'qrcode';

// Produtos em OFERTAS ESPECIAIS
const ofertasProducts: Product[] = [
  {
    id: 'of1',
    name: 'Smart TV Samsung 55" 4K Crystal UHD',
    price: 1899.99,
    originalPrice: 2799.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.8,
    reviews: 456,
    discount: 32,
    installments: { count: 12, value: 158.33 }
  },
  {
    id: 'of2',
    name: 'Notebook Dell Inspiron 15 i5 8GB 256GB SSD',
    price: 2299.99,
    originalPrice: 3199.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.7,
    reviews: 234,
    discount: 28,
    installments: { count: 12, value: 191.66 }
  },
  {
    id: 'of3',
    name: 'iPhone 14 128GB Azul',
    price: 3499.99,
    originalPrice: 4299.99,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.9,
    reviews: 789,
    discount: 19,
    installments: { count: 12, value: 291.66 }
  },
  {
    id: 'of4',
    name: 'Geladeira Brastemp Frost Free 400L Inox',
    price: 2199.99,
    originalPrice: 2899.99,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.6,
    reviews: 345,
    discount: 24,
    installments: { count: 12, value: 183.33 }
  },
  {
    id: 'of5',
    name: 'Ar Condicionado Split Inverter 12000 BTUs',
    price: 1599.99,
    originalPrice: 2199.99,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.5,
    reviews: 267,
    discount: 27,
    installments: { count: 10, value: 159.99 }
  },
  {
    id: 'of6',
    name: 'Máquina de Lavar Electrolux 12kg Turbo Economia',
    price: 1399.99,
    originalPrice: 1899.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.4,
    reviews: 189,
    discount: 26,
    installments: { count: 10, value: 139.99 }
  },
  {
    id: 'of7',
    name: 'Micro-ondas Panasonic 32L Inox com Grill',
    price: 599.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.3,
    reviews: 156,
    discount: 33,
    installments: { count: 8, value: 75.00 }
  },
  {
    id: 'of8',
    name: 'Aspirador de Pó Robô Xiaomi Mi Robot',
    price: 899.99,
    originalPrice: 1399.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.6,
    reviews: 234,
    discount: 36,
    installments: { count: 8, value: 112.50 }
  },
  {
    id: 'of9',
    name: 'Soundbar JBL 2.1 120W Bluetooth',
    price: 399.99,
    originalPrice: 699.99,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.7,
    reviews: 178,
    discount: 43,
    installments: { count: 6, value: 66.66 }
  },
  {
    id: 'of10',
    name: 'Cafeteira Nespresso Essenza Mini Vermelha',
    price: 299.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.8,
    reviews: 123,
    discount: 40,
    installments: { count: 6, value: 50.00 }
  },
  {
    id: 'of11',
    name: 'Ventilador de Teto Spirit 203 Branco 3 Pás',
    price: 199.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.2,
    reviews: 89,
    discount: 43,
    installments: { count: 4, value: 50.00 }
  },
  {
    id: 'of12',
    name: 'Fritadeira Elétrica Sem Óleo Philco 4L',
    price: 249.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop',
    category: 'ofertas',
    rating: 4.4,
    reviews: 167,
    discount: 38,
    installments: { count: 5, value: 50.00 }
  }
];

// Configuração da conta Bradesco para PIX
const bradescoBankAccount: BankAccount = {
  bank: 'Bradesco',
  accountHolder: 'Leonardo Bezerra de Campos',
  pixKey: '11987654321',
  accountNumber: '12345-6',
  agency: '1234'
};

export default function OfertasPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('credit');
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    }
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    installments: 1
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pixQRCode, setPixQRCode] = useState<string>('');
  const [pixCode, setPixCode] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Função para gerar código PIX
  const generatePixCode = (value: number): string => {
    const pixKey = bradescoBankAccount.pixKey;
    const merchantName = bradescoBankAccount.accountHolder.toUpperCase();
    const merchantCity = 'SAO PAULO';
    const txid = Math.random().toString(36).substring(2, 15);
    
    // Formato EMV padrão para PIX
    const payload = [
      '00020126',
      '580014BR.GOV.BCB.PIX',
      `0114${pixKey}`,
      '52040000',
      '5303986',
      `54${String(value.toFixed(2)).padStart(2, '0').replace('.', '')}`,
      '5802BR',
      `59${String(merchantName.length).padStart(2, '0')}${merchantName}`,
      `60${String(merchantCity.length).padStart(2, '0')}${merchantCity}`,
      `62${String(txid.length + 4).padStart(2, '0')}05${String(txid.length).padStart(2, '0')}${txid}`,
      '6304'
    ].join('');
    
    // Calcular CRC16
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length - 4; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if (crc & 0x8000) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
      }
    }
    crc &= 0xFFFF;
    
    return payload.slice(0, -4) + crc.toString(16).toUpperCase().padStart(4, '0');
  };

  // Gerar QR Code PIX
  useEffect(() => {
    if (selectedPaymentMethod === 'pix' && cartTotal > 0) {
      const pixPayload = generatePixCode(cartTotal);
      setPixCode(pixPayload);
      
      QRCode.toDataURL(pixPayload, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(url => {
        setPixQRCode(url);
      });
    }
  }, [selectedPaymentMethod, cart]);

  const filteredProducts = useMemo(() => {
    return ofertasProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discount - a.discount;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setIsCartOpen(false);
  };

  const processPayment = () => {
    // Simular processamento do pagamento
    alert('Pagamento processado com sucesso!');
    setCart([]);
    setShowCheckout(false);
    setCustomerData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      }
    });
    setPaymentData({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      installments: 1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-2 rounded-xl">
                <Tag className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">OFERTAS ESPECIAIS</h1>
                <p className="text-red-100 text-sm">Descontos imperdíveis até 43% OFF</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Banner de Ofertas */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-red-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Zap className="h-6 w-6 animate-bounce" />
            <p className="font-bold text-lg">🔥 OFERTAS RELÂMPAGO - DESCONTOS DE ATÉ 43% OFF 🔥</p>
            <Clock className="h-6 w-6 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar ofertas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="rating">Melhor Avaliação</option>
              <option value="discount">Maior Desconto</option>
            </select>

            <div className="flex items-center justify-center bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-3">
              <Tag className="h-5 w-5 text-red-600 mr-2" />
              <span className="font-semibold text-red-800">{filteredProducts.length} ofertas encontradas</span>
            </div>
          </div>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              {/* Badge de Desconto */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  -{product.discount}% OFF
                </div>
                <div className="absolute top-3 right-3 bg-yellow-400 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                  OFERTA
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg font-bold text-red-600">
                      R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    ou {product.installments.count}x de R$ {product.installments.value.toFixed(2)}
                  </p>
                </div>
                
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrinho Lateral */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Carrinho ({cartItemsCount})</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Carrinho vazio</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-red-600 font-bold">R$ {item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-100 rounded text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total:</span>
                      <span className="text-xl font-bold text-red-600">
                        R$ {cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Checkout */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Finalizar Compra</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Dados do Cliente */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dados Pessoais
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={customerData.name}
                      onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={customerData.email}
                      onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Telefone"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="CPF"
                        value={customerData.cpf}
                        onChange={(e) => setCustomerData({...customerData, cpf: e.target.value})}
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Endereço de Entrega
                  </h3>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="CEP"
                      value={customerData.address.zipCode}
                      onChange={(e) => setCustomerData({
                        ...customerData,
                        address: {...customerData.address, zipCode: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Rua"
                        value={customerData.address.street}
                        onChange={(e) => setCustomerData({
                          ...customerData,
                          address: {...customerData.address, street: e.target.value}
                        })}
                        className="col-span-2 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Número"
                        value={customerData.address.number}
                        onChange={(e) => setCustomerData({
                          ...customerData,
                          address: {...customerData.address, number: e.target.value}
                        })}
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Complemento"
                      value={customerData.address.complement}
                      onChange={(e) => setCustomerData({
                        ...customerData,
                        address: {...customerData.address, complement: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={customerData.address.neighborhood}
                        onChange={(e) => setCustomerData({
                          ...customerData,
                          address: {...customerData.address, neighborhood: e.target.value}
                        })}
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={customerData.address.city}
                        onChange={(e) => setCustomerData({
                          ...customerData,
                          address: {...customerData.address, city: e.target.value}
                        })}
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Pagamento */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Forma de Pagamento</h3>
                  
                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => setSelectedPaymentMethod('credit')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                        selectedPaymentMethod === 'credit'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="h-6 w-6" />
                      <span className="font-semibold">Cartão de Crédito</span>
                    </button>
                    
                    <button
                      onClick={() => setSelectedPaymentMethod('pix')}
                      className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                        selectedPaymentMethod === 'pix'
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Smartphone className="h-6 w-6" />
                      <span className="font-semibold">PIX</span>
                      <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full ml-auto">
                        Instantâneo
                      </span>
                    </button>
                  </div>

                  {/* Formulário de Cartão */}
                  {selectedPaymentMethod === 'credit' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Número do cartão"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      
                      <input
                        type="text"
                        placeholder="Nome no cartão"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      
                      <select
                        value={paymentData.installments}
                        onChange={(e) => setPaymentData({...paymentData, installments: Number(e.target.value)})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value={1}>À vista - R$ {cartTotal.toFixed(2)}</option>
                        <option value={2}>2x de R$ {(cartTotal / 2).toFixed(2)}</option>
                        <option value={3}>3x de R$ {(cartTotal / 3).toFixed(2)}</option>
                        <option value={6}>6x de R$ {(cartTotal / 6).toFixed(2)}</option>
                        <option value={12}>12x de R$ {(cartTotal / 12).toFixed(2)}</option>
                      </select>
                    </div>
                  )}

                  {/* PIX */}
                  {selectedPaymentMethod === 'pix' && (
                    <div className="text-center space-y-4">
                      <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300">
                        {pixQRCode ? (
                          <div className="space-y-4">
                            <img
                              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/58ccafe2-4abc-48d9-84c0-0fe65eeae2c5.jpg"
                              alt="QR Code PIX Bradesco"
                              className="w-48 h-48 mx-auto rounded-xl shadow-lg"
                            />
                            <div className="bg-gray-50 p-4 rounded-xl">
                              <img
                                src={pixQRCode}
                                alt="QR Code PIX Dinâmico"
                                className="w-32 h-32 mx-auto"
                              />
                              <p className="text-sm text-gray-600 mt-2">QR Code Dinâmico</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                            <Smartphone className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">Código PIX (Copia e Cola):</p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={pixCode}
                            readOnly
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-mono"
                          />
                          <button
                            onClick={copyPixCode}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            <span className="text-sm">{copied ? 'Copiado!' : 'Copiar'}</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-blue-800 mb-2">Dados da Conta:</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><strong>Banco:</strong> {bradescoBankAccount.bank}</p>
                          <p><strong>Favorecido:</strong> {bradescoBankAccount.accountHolder}</p>
                          <p><strong>Chave PIX:</strong> {bradescoBankAccount.pixKey}</p>
                          <p><strong>Valor:</strong> R$ {cartTotal.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Resumo do Pedido */}
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold mb-3">Resumo do Pedido</h4>
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-red-600">R$ {cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={processPayment}
                    className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
                  >
                    {selectedPaymentMethod === 'pix' ? 'Confirmar Pagamento PIX' : 'Finalizar Compra'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}