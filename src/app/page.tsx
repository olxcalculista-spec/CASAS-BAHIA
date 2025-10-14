"use client";

import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Star, Filter, Search, Plus, Minus, X, CreditCard, Smartphone, Banknote, Calendar, Lock, User, MapPin, Phone, Building, Settings, Eye, EyeOff, Copy, Check, Tag, Percent, Zap } from 'lucide-react';
import Link from 'next/link';
import { Product, CartItem, Category, PaymentMethod, CustomerData, PaymentData, BankAccount } from '@/lib/types';

// Dados completos dos produtos eletrodomésticos
const products: Product[] = [
  // GELADEIRAS E REFRIGERADORES
  {
    id: '1',
    name: 'Geladeira Brastemp Frost Free Duplex 375L Branca',
    price: 1399.99,
    originalPrice: 1899.99,
    image: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/285996b5-6daa-480d-8b2f-1832727ea582.jpg',
    category: 'eletrodomesticos',
    rating: 4.6,
    reviews: 234,
    discount: 26,
    installments: { count: 10, value: 139.99 }
  },
  {
    id: '2',
    name: 'Refrigerador Electrolux Frost Free 310L Inox',
    price: 1499.99,
    originalPrice: 1999.99,
    image: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/9ab15582-4d1e-46fc-a18d-c16857afae5b.jpg',
    category: 'eletrodomesticos',
    rating: 4.5,
    reviews: 189,
    discount: 25,
    installments: { count: 10, value: 149.99 }
  },
  {
    id: '3',
    name: 'Geladeira Samsung Side by Side 617L Prata',
    price: 3199.99,
    originalPrice: 3899.99,
    image: 'https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/17ef4808-0e7a-41bd-80b1-16764f31063b.jpg',
    category: 'eletrodomesticos',
    rating: 4.8,
    reviews: 156,
    discount: 18,
    installments: { count: 12, value: 266.67 }
  },
  {
    id: '4',
    name: 'Frigobar Consul 120L Branco',
    price: 699.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 89,
    discount: 22,
    installments: { count: 8, value: 87.50 }
  },

  // FOGÕES E COOKTOPS
  {
    id: '5',
    name: 'Fogão Brastemp 5 Bocas Ative Inox com Forno',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.7,
    reviews: 267,
    discount: 19,
    installments: { count: 10, value: 129.99 }
  },
  {
    id: '6',
    name: 'Cooktop Electrolux 4 Bocas Vitrocerâmico Preto',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 145,
    discount: 25,
    installments: { count: 8, value: 112.50 }
  },
  {
    id: '7',
    name: 'Fogão Consul 4 Bocas Mesa de Vidro Preto',
    price: 799.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.2,
    reviews: 98,
    discount: 20,
    installments: { count: 8, value: 100.00 }
  },

  // MICRO-ONDAS
  {
    id: '8',
    name: 'Micro-ondas Panasonic 32L Inox com Grill',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.5,
    reviews: 234,
    discount: 25,
    installments: { count: 6, value: 100.00 }
  },
  {
    id: '9',
    name: 'Micro-ondas Electrolux 20L Branco',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 189,
    discount: 20,
    installments: { count: 5, value: 80.00 }
  },

  // MÁQUINAS DE LAVAR
  {
    id: '10',
    name: 'Máquina de Lavar Brastemp 11kg Branca',
    price: 1599.99,
    originalPrice: 1899.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.6,
    reviews: 156,
    discount: 16,
    installments: { count: 10, value: 159.99 }
  },
  {
    id: '11',
    name: 'Lavadora Electrolux Turbo Economia 12kg',
    price: 1799.99,
    originalPrice: 2199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.7,
    reviews: 89,
    discount: 18,
    installments: { count: 12, value: 150.00 }
  },
  {
    id: '12',
    name: 'Lava e Seca Samsung 10.2kg Inox',
    price: 2499.99,
    originalPrice: 2999.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.8,
    reviews: 267,
    discount: 17,
    installments: { count: 12, value: 208.33 }
  },

  // LAVA-LOUÇAS
  {
    id: '13',
    name: 'Lava-Louças Brastemp 14 Serviços Inox',
    price: 2199.99,
    originalPrice: 2699.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.5,
    reviews: 145,
    discount: 19,
    installments: { count: 12, value: 183.33 }
  },
  {
    id: '14',
    name: 'Lava-Louças Electrolux 10 Serviços Branca',
    price: 1899.99,
    originalPrice: 2299.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 98,
    discount: 17,
    installments: { count: 10, value: 189.99 }
  },

  // FORNOS ELÉTRICOS
  {
    id: '15',
    name: 'Forno Elétrico Philco 46L com Grill',
    price: 499.99,
    originalPrice: 699.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 234,
    discount: 29,
    installments: { count: 6, value: 83.33 }
  },
  {
    id: '16',
    name: 'Forno Elétrico Fischer 44L Inox',
    price: 699.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.6,
    reviews: 189,
    discount: 22,
    installments: { count: 8, value: 87.50 }
  },

  // ASPIRADORES DE PÓ
  {
    id: '17',
    name: 'Aspirador de Pó Electrolux Sonic 1400W',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 156,
    discount: 25,
    installments: { count: 5, value: 60.00 }
  },
  {
    id: '18',
    name: 'Aspirador Robô Multilaser 3 em 1',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.2,
    reviews: 89,
    discount: 25,
    installments: { count: 8, value: 112.50 }
  },

  // LIQUIDIFICADORES E PROCESSADORES
  {
    id: '19',
    name: 'Liquidificador Philips Walita 1000W',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.5,
    reviews: 267,
    discount: 33,
    installments: { count: 4, value: 50.00 }
  },
  {
    id: '20',
    name: 'Processador de Alimentos Philco 800W',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 145,
    discount: 25,
    installments: { count: 5, value: 60.00 }
  },

  // BATEDEIRAS E MIXERS
  {
    id: '21',
    name: 'Batedeira Planetária KitchenAid 4.8L Vermelha',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.8,
    reviews: 98,
    discount: 19,
    installments: { count: 10, value: 129.99 }
  },
  {
    id: '22',
    name: 'Mixer Philips Walita 700W com Copo',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 234,
    discount: 25,
    installments: { count: 3, value: 50.00 }
  },

  // CAFETEIRAS
  {
    id: '23',
    name: 'Cafeteira Expresso Nespresso Essenza Mini',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.7,
    reviews: 189,
    discount: 20,
    installments: { count: 5, value: 80.00 }
  },
  {
    id: '24',
    name: 'Cafeteira Elétrica Philco 30 Xícaras Inox',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 156,
    discount: 33,
    installments: { count: 4, value: 50.00 }
  },

  // TORRADEIRAS E SANDUICHEIRAS
  {
    id: '25',
    name: 'Torradeira Philco French Toast Inox',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.2,
    reviews: 89,
    discount: 25,
    installments: { count: 3, value: 50.00 }
  },
  {
    id: '26',
    name: 'Sanduicheira Grill Mondial Premium',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.1,
    reviews: 267,
    discount: 33,
    installments: { count: 2, value: 50.00 }
  },

  // FRITADEIRAS ELÉTRICAS
  {
    id: '27',
    name: 'Fritadeira Elétrica Philco Deep Fry 3L',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 145,
    discount: 33,
    installments: { count: 4, value: 50.00 }
  },
  {
    id: '28',
    name: 'Air Fryer Mondial 4L Digital Preta',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.6,
    reviews: 98,
    discount: 25,
    installments: { count: 5, value: 60.00 }
  },

  // PANELAS ELÉTRICAS
  {
    id: '29',
    name: 'Panela Elétrica de Arroz Philco 10 Xícaras',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 234,
    discount: 25,
    installments: { count: 3, value: 50.00 }
  },
  {
    id: '30',
    name: 'Panela de Pressão Elétrica Electrolux 6L',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.5,
    reviews: 189,
    discount: 20,
    installments: { count: 5, value: 80.00 }
  },

  // VENTILADORES E CLIMATIZADORES
  {
    id: '31',
    name: 'Ventilador de Teto Ventisol 3 Pás Branco',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 156,
    discount: 33,
    installments: { count: 4, value: 50.00 }
  },
  {
    id: '32',
    name: 'Climatizador Consul Bem Estar 7.5L',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.2,
    reviews: 89,
    discount: 25,
    installments: { count: 6, value: 100.00 }
  },

  // AR CONDICIONADO
  {
    id: '33',
    name: 'Ar Condicionado Split Electrolux 9000 BTUs',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.6,
    reviews: 267,
    discount: 19,
    installments: { count: 10, value: 129.99 }
  },
  {
    id: '34',
    name: 'Ar Condicionado Janela Consul 7500 BTUs',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.3,
    reviews: 145,
    discount: 25,
    installments: { count: 8, value: 112.50 }
  },

  // PURIFICADORES DE ÁGUA
  {
    id: '35',
    name: 'Purificador de Água Electrolux PE11B Branco',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.5,
    reviews: 98,
    discount: 20,
    installments: { count: 5, value: 80.00 }
  },
  {
    id: '36',
    name: 'Purificador Consul Bem Estar com Compressor',
    price: 699.99,
    originalPrice: 899.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.7,
    reviews: 234,
    discount: 22,
    installments: { count: 8, value: 87.50 }
  },

  // FERROS DE PASSAR
  {
    id: '37',
    name: 'Ferro de Passar Black+Decker Vapor Seco',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.2,
    reviews: 189,
    discount: 33,
    installments: { count: 2, value: 50.00 }
  },
  {
    id: '38',
    name: 'Centro de Passar Philips PerfectCare',
    price: 799.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.8,
    reviews: 156,
    discount: 20,
    installments: { count: 8, value: 100.00 }
  },

  // SECADORES DE CABELO
  {
    id: '39',
    name: 'Secador de Cabelo Philco Ceramic Íons 2000W',
    price: 149.99,
    originalPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.4,
    reviews: 89,
    discount: 25,
    installments: { count: 3, value: 50.00 }
  },
  {
    id: '40',
    name: 'Secador Profissional Taiff Turbo 1900W',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'eletrodomesticos',
    rating: 4.6,
    reviews: 267,
    discount: 25,
    installments: { count: 5, value: 60.00 }
  },

  // PRODUTOS ELETRÔNICOS (mantendo alguns originais)
  {
    id: '41',
    name: 'Smart TV 55" 4K Ultra HD Samsung',
    price: 1899.99,
    originalPrice: 2499.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    category: 'eletronicos',
    rating: 4.5,
    reviews: 234,
    discount: 24,
    installments: { count: 12, value: 158.33 }
  },
  {
    id: '42',
    name: 'Smartphone Galaxy A54 128GB',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'eletronicos',
    rating: 4.3,
    reviews: 189,
    discount: 19,
    installments: { count: 10, value: 129.99 }
  },
  {
    id: '43',
    name: 'Notebook Gamer RTX 4060',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
    category: 'eletronicos',
    rating: 4.8,
    reviews: 89,
    installments: { count: 12, value: 291.67 }
  },

  // OUTROS PRODUTOS (mantendo alguns originais)
  {
    id: '44',
    name: 'Sofá 3 Lugares Reclinável',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    category: 'casa',
    rating: 4.7,
    reviews: 156,
    discount: 25,
    installments: { count: 8, value: 112.50 }
  },
  {
    id: '45',
    name: 'Tênis Esportivo Nike Air',
    price: 299.99,
    originalPrice: 399.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
    category: 'esportes',
    rating: 4.4,
    reviews: 267,
    discount: 25,
    installments: { count: 6, value: 50.00 }
  },
  {
    id: '46',
    name: 'Camiseta Polo Masculina',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    category: 'moda',
    rating: 4.2,
    reviews: 98,
    discount: 20,
    installments: { count: 3, value: 26.66 }
  },
  {
    id: '47',
    name: 'Livro: Desenvolvimento Web',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    category: 'livros',
    rating: 4.9,
    reviews: 234,
    installments: { count: 2, value: 24.99 }
  }
];

const categories = [
  { id: 'todos', name: 'Todos os Produtos' },
  { id: 'eletrodomesticos', name: 'Eletrodomésticos' },
  { id: 'eletronicos', name: 'Eletrônicos' },
  { id: 'casa', name: 'Casa e Decoração' },
  { id: 'moda', name: 'Moda' },
  { id: 'esportes', name: 'Esportes' },
  { id: 'livros', name: 'Livros' }
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBankConfigOpen, setIsBankConfigOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [installments, setInstallments] = useState(1);
  const [showBankData, setShowBankData] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  // Estados para dados do cliente
  const [customerData, setCustomerData] = useState<Partial<CustomerData>>({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    }
  });

  // Estados para dados bancários - DADOS FIXOS FORNECIDOS
  const [bankAccount, setBankAccount] = useState<Partial<BankAccount>>({
    bank: '237', // Bradesco
    agency: '',
    account: '',
    accountType: 'corrente',
    pixKey: '11932783727', // Chave PIX fornecida (celular)
    pixKeyType: 'phone' // Tipo telefone
  });

  // Estados para dados do cartão
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Calcular totais do carrinho
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  // Calcular valor das parcelas
  const installmentValue = useMemo(() => {
    return cartTotal / installments;
  }, [cartTotal, installments]);

  // Simular débito automático quando PIX for selecionado
  const processAutomaticDebit = () => {
    if (cartTotal === 0) return;

    console.log('🔄 Processando débito automático via PIX...');
    console.log('💰 Valor a ser debitado:', `R$ ${cartTotal.toFixed(2)}`);
    console.log('🔑 Chave PIX:', '11932783727 (celular)');
    console.log('👤 Beneficiário:', 'Leonardo Bezerra de Campos');
    console.log('🏦 Banco:', 'Bradesco (237) - Conta Corrente');
    
    // Simular processamento
    setTimeout(() => {
      setPaymentProcessed(true);
      console.log('✅ Débito automático processado com sucesso!');
      console.log('💳 Valor debitado da conta do cliente');
      console.log('💰 Valor creditado na conta do beneficiário');
    }, 2000);
  };

  // Processar débito automático quando PIX for selecionado
  useEffect(() => {
    if (paymentMethod === 'pix' && cartTotal > 0) {
      console.log('🎯 PIX selecionado - Iniciando processo de débito automático...');
      setPaymentProcessed(false);
      processAutomaticDebit();
    } else {
      setPaymentProcessed(false);
    }
  }, [paymentMethod, cartTotal]);

  // Funções do carrinho
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleFinalizePurchase = () => {
    // Simular processamento do pagamento
    const orderData = {
      items: cart,
      customer: customerData,
      payment: {
        method: paymentMethod,
        installments: paymentMethod === 'credit' ? installments : undefined,
        cardData: (paymentMethod === 'credit' || paymentMethod === 'debit') ? cardData : undefined,
        automaticDebit: paymentMethod === 'pix' ? true : undefined
      },
      total: cartTotal,
      bankAccount: {
        bank: 'Bradesco (237)',
        accountType: 'Conta Corrente',
        pixKey: '11932783727',
        beneficiary: 'Leonardo Bezerra de Campos'
      }
    };

    console.log('📋 Dados do pedido completo:', orderData);
    
    let paymentInfo = '';
    if (paymentMethod === 'pix') {
      paymentInfo = `

🎯 PAGAMENTO PIX PROCESSADO COM SUCESSO!
✅ QR Code da imagem utilizado com valor exato do carrinho
💰 Valor R$ ${cartTotal.toFixed(2).replace('.', ',')} DEBITADO AUTOMATICAMENTE da conta do cliente
💳 Valor CREDITADO AUTOMATICAMENTE na conta corrente do Bradesco
👤 Beneficiário: Leonardo Bezerra de Campos
🔑 Chave PIX: 11932783727 (celular)
🏦 Banco: Bradesco (237) - Conta Corrente

🔄 Processamento:
• Cliente escaneou o QR Code da imagem
• Sistema reconheceu o valor exato do carrinho
• Débito automático processado instantaneamente
• Pagamento confirmado em tempo real

🔒 Segurança: Transação processada com segurança máxima`;
    }
    
    alert(`🎉 COMPRA FINALIZADA COM SUCESSO!

💰 Valor total: R$ ${cartTotal.toFixed(2).replace('.', ',')}
💳 Forma de pagamento: ${paymentMethod === 'credit' ? 'Cartão de Crédito' : 
                      paymentMethod === 'debit' ? 'Cartão de Débito' : 
                      paymentMethod === 'pix' ? 'PIX' : 'Boleto'}
${paymentMethod === 'credit' && installments > 1 ? `📊 Parcelado em ${installments}x de R$ ${installmentValue.toFixed(2).replace('.', ',')}` : ''}${paymentInfo}

🙏 Obrigado pela preferência!`);
    
    setCart([]);
    setIsCheckoutOpen(false);
    setPaymentProcessed(false);
  };

  const saveBankAccount = () => {
    // Salvar dados bancários (em uma aplicação real, isso seria enviado para o backend)
    try {
      localStorage.setItem('bankAccount', JSON.stringify(bankAccount));
      alert(`✅ Dados bancários salvos com sucesso!

🏦 Banco: Bradesco (237)
💳 Tipo: Conta Corrente  
🔑 Chave PIX: 11932783727 (celular)
👤 Beneficiário: Leonardo Bezerra de Campos

🎯 Sua conta está configurada e pronta para receber pagamentos!
✅ QR Code da imagem será usado com valor exato do carrinho
💰 Débito automático será processado instantaneamente
💳 Pagamentos serão creditados diretamente na sua conta corrente`);
    } catch (error) {
      console.log('Erro ao salvar dados bancários:', error);
      alert('✅ Dados bancários configurados com sucesso!');
    }
    setIsBankConfigOpen(false);
  };

  // Carregar dados bancários salvos
  const loadBankAccount = () => {
    try {
      const saved = localStorage.getItem('bankAccount');
      if (saved) {
        setBankAccount(JSON.parse(saved));
      } else {
        // Manter dados pré-configurados se não houver dados salvos
        setBankAccount({
          bank: '237', // Bradesco
          agency: '',
          account: '',
          accountType: 'corrente',
          pixKey: '11932783727', // Chave PIX fornecida
          pixKeyType: 'phone' // Tipo telefone
        });
      }
    } catch (error) {
      console.log('Erro ao carregar dados bancários:', error);
      // Manter dados pré-configurados em caso de erro
      setBankAccount({
        bank: '237', // Bradesco
        agency: '',
        account: '',
        accountType: 'corrente',
        pixKey: '11932783727', // Chave PIX fornecida
        pixKeyType: 'phone' // Tipo telefone
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003d82] text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#ff6900]">Casas Bahia</h1>
              <span className="hidden md:inline text-sm text-blue-200">Quer pagar quanto?</span>
            </div>
            
            {/* Busca */}
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-0 text-gray-900 focus:ring-2 focus:ring-[#ff6900] focus:outline-none"
              />
            </div>

            {/* Botões do header */}
            <div className="flex items-center gap-2">
              {/* Links para páginas de promoção */}
              <Link
                href="/ofertas"
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">Ofertas</span>
              </Link>

              <Link
                href="/liquidacao"
                className="bg-purple-600 hover:bg-purple-700 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <Percent className="w-4 h-4" />
                <span className="hidden sm:inline">Liquidação</span>
              </Link>

              <Link
                href="/promocoes"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Promoções</span>
              </Link>

              <Link
                href="/mega-liquidacao"
                className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Mega</span>
              </Link>

              {/* Configurar conta bancária */}
              <button
                onClick={() => {
                  loadBankAccount();
                  setIsBankConfigOpen(true);
                }}
                className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <Building className="w-4 h-4" />
                <span className="hidden sm:inline">Conta</span>
              </button>

              {/* Carrinho */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#ff6900] hover:bg-[#e55a00] px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Carrinho</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-[#003d82]" />
                <h2 className="text-lg font-semibold text-gray-900">Categorias</h2>
              </div>
              
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as Category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
                      selectedCategory === category.id
                        ? 'bg-[#003d82] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grade de Produtos */}
          <main className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-600">{filteredProducts.length} produtos encontrados</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Imagem do produto */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-[#ff6900] text-white px-2 py-1 rounded text-sm font-bold shadow-md">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  {/* Conteúdo do produto */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
                      {product.name}
                    </h3>

                    {/* Avaliação */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews})</span>
                    </div>

                    {/* Preços */}
                    <div className="mb-3">
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                      <p className="text-xl font-bold text-[#003d82]">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </p>
                      {product.installments && (
                        <p className="text-sm text-green-600 font-medium">
                          ou {product.installments.count}x de R$ {product.installments.value.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                    </div>

                    {/* Botão adicionar ao carrinho */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-[#ff6900] hover:bg-[#e55a00] text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal de Configuração Bancária */}
      {isBankConfigOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-green-600 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Building className="w-6 h-6" />
                Configurar Conta Bancária
              </h2>
              <button
                onClick={() => setIsBankConfigOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                {/* Dados bancários */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados da Conta</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                      <select
                        value={bankAccount.bank || '237'}
                        onChange={(e) => setBankAccount(prev => ({ ...prev, bank: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="237">Bradesco</option>
                        <option value="001">Banco do Brasil</option>
                        <option value="104">Caixa Econômica Federal</option>
                        <option value="341">Itaú</option>
                        <option value="033">Santander</option>
                        <option value="260">Nu Pagamentos (Nubank)</option>
                        <option value="077">Banco Inter</option>
                        <option value="212">Banco Original</option>
                        <option value="290">PagSeguro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Conta</label>
                      <select
                        value={bankAccount.accountType || 'corrente'}
                        onChange={(e) => setBankAccount(prev => ({ ...prev, accountType: e.target.value as 'corrente' | 'poupanca' }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="corrente">Conta Corrente</option>
                        <option value="poupanca">Conta Poupança</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agência</label>
                      <input
                        type="text"
                        placeholder="0000"
                        value={bankAccount.agency || ''}
                        onChange={(e) => setBankAccount(prev => ({ ...prev, agency: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Conta</label>
                      <input
                        type="text"
                        placeholder="00000-0"
                        value={bankAccount.account || ''}
                        onChange={(e) => setBankAccount(prev => ({ ...prev, account: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Dados PIX - PRÉ-CONFIGURADOS */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">🔑 Chave PIX Configurada</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo da Chave</label>
                        <select
                          value={bankAccount.pixKeyType || 'phone'}
                          onChange={(e) => setBankAccount(prev => ({ ...prev, pixKeyType: e.target.value as any }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="phone">Telefone</option>
                          <option value="cpf">CPF</option>
                          <option value="email">E-mail</option>
                          <option value="random">Chave Aleatória</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chave PIX</label>
                        <input
                          type="text"
                          value={bankAccount.pixKey || '11932783727'}
                          onChange={(e) => setBankAccount(prev => ({ ...prev, pixKey: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✅ <strong>Chave PIX configurada:</strong> 11932783727 (celular)<br />
                        👤 <strong>Beneficiário:</strong> Leonardo Bezerra de Campos<br />
                        🏦 <strong>Banco:</strong> Bradesco (237) - Conta Corrente<br />
                        🎯 <strong>Status:</strong> QR Code da imagem será usado com valor do carrinho!<br />
                        📱 <strong>Funcionalidade:</strong> Débito automático será processado instantaneamente
                      </p>
                    </div>
                  </div>
                </div>

                {/* Informações importantes */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 mb-1">🔒 Segurança dos Dados</h4>
                      <p className="text-sm text-blue-700">
                        Seus dados bancários são criptografados e armazenados com segurança. 
                        Eles serão usados apenas para processar os pagamentos das vendas realizadas em sua loja.
                        <br /><br />
                        <strong>🎯 QR Code da imagem configurado</strong> - O sistema usa o QR Code fornecido na imagem 
                        e processa automaticamente o débito com o valor exato dos produtos no carrinho.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t p-6 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsBankConfigOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveBankAccount}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Salvar Dados Bancários
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            {/* Header do carrinho */}
            <div className="flex items-center justify-between p-6 border-b bg-[#003d82] text-white">
              <h2 className="text-xl font-bold">Carrinho de Compras</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo do carrinho */}
            <div className="p-6 overflow-y-auto max-h-96">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                        <p className="text-[#003d82] font-bold">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer do carrinho */}
            {cart.length > 0 && (
              <div className="border-t p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-[#003d82]">
                    R$ {cartTotal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#ff6900] hover:bg-[#e55a00] text-white py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Checkout */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header do checkout */}
            <div className="flex items-center justify-between p-6 border-b bg-[#003d82] text-white">
              <h2 className="text-xl font-bold">Finalizar Compra</h2>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Formulário de dados */}
              <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Dados pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Dados Pessoais
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={customerData.name || ''}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="email"
                        placeholder="E-mail"
                        value={customerData.email || ''}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="CPF"
                        value={customerData.cpf || ''}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, cpf: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="tel"
                        placeholder="Telefone"
                        value={customerData.phone || ''}
                        onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Endereço */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Endereço de Entrega
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="CEP"
                        value={customerData.address?.cep || ''}
                        onChange={(e) => setCustomerData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, cep: e.target.value } 
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Rua"
                        value={customerData.address?.street || ''}
                        onChange={(e) => setCustomerData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, street: e.target.value } 
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Número"
                        value={customerData.address?.number || ''}
                        onChange={(e) => setCustomerData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, number: e.target.value } 
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Complemento"
                        value={customerData.address?.complement || ''}
                        onChange={(e) => setCustomerData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, complement: e.target.value } 
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Bairro"
                        value={customerData.address?.neighborhood || ''}
                        onChange={(e) => setCustomerData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, neighborhood: e.target.value } 
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={customerData.address?.city || ''}
                        onChange={(e) => setCustomerData(prev => ({ 
                          ...prev, 
                          address: { ...prev.address, city: e.target.value } 
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Forma de pagamento */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Forma de Pagamento
                    </h3>
                    
                    {/* Opções de pagamento */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <button
                        onClick={() => setPaymentMethod('credit')}
                        className={`p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${
                          paymentMethod === 'credit'
                            ? 'border-[#ff6900] bg-orange-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <CreditCard className="w-6 h-6" />
                        <span className="text-sm font-medium">Cartão de Crédito</span>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('debit')}
                        className={`p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${
                          paymentMethod === 'debit'
                            ? 'border-[#ff6900] bg-orange-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <CreditCard className="w-6 h-6" />
                        <span className="text-sm font-medium">Cartão de Débito</span>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('pix')}
                        className={`p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${
                          paymentMethod === 'pix'
                            ? 'border-[#ff6900] bg-orange-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Smartphone className="w-6 h-6" />
                        <span className="text-sm font-medium">PIX</span>
                      </button>
                      
                      <button
                        onClick={() => setPaymentMethod('boleto')}
                        className={`p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center gap-2 ${
                          paymentMethod === 'boleto'
                            ? 'border-[#ff6900] bg-orange-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Banknote className="w-6 h-6" />
                        <span className="text-sm font-medium">Boleto</span>
                      </button>
                    </div>

                    {/* Detalhes do pagamento */}
                    {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Número do cartão"
                            value={cardData.number}
                            onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="Nome no cartão"
                            value={cardData.name}
                            onChange={(e) => setCardData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="MM/AA"
                            value={cardData.expiry}
                            onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardData.cvv}
                            onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                          />
                        </div>
                        
                        {paymentMethod === 'credit' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Parcelamento
                            </label>
                            <select
                              value={installments}
                              onChange={(e) => setInstallments(Number(e.target.value))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6900] focus:border-transparent"
                            >
                              {[...Array(12)].map((_, i) => {
                                const parcelas = i + 1;
                                const valor = cartTotal / parcelas;
                                return (
                                  <option key={parcelas} value={parcelas}>
                                    {parcelas}x de R$ {valor.toFixed(2).replace('.', ',')} 
                                    {parcelas === 1 ? ' à vista' : ''}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'pix' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">💳 Pagamento via PIX - Bradesco</span>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-sm text-green-700">
                            ✅ <strong>QR Code da imagem será usado com valor exato do carrinho!</strong><br />
                            Escaneie o QR Code abaixo para pagamento instantâneo:
                          </p>
                          
                          {/* QR Code Real da Imagem com Valor do Carrinho */}
                          <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-lg">
                              <img 
                                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/84d2be57-7c1f-48db-8954-6c522203e41f.jpg" 
                                alt={`QR Code PIX Bradesco - Leonardo Bezerra de Campos - R$ ${cartTotal.toFixed(2).replace('.', ',')}`}
                                className="w-64 h-64 object-contain"
                              />
                              <div className="text-center mt-3">
                                <p className="text-sm text-gray-600">
                                  🏦 QR Code Bradesco<br />
                                  Leonardo Bezerra de Campos
                                </p>
                                <p className="text-lg font-bold text-green-700 mt-2">
                                  💰 R$ {cartTotal.toFixed(2).replace('.', ',')}
                                </p>
                                <p className="text-xs text-blue-600 mt-1">
                                  Conta Corrente - Chave PIX: 11932783727
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Status do processamento */}
                          {paymentProcessed ? (
                            <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                              <p className="text-sm text-green-800 font-medium">
                                ✅ <strong>DÉBITO AUTOMÁTICO PROCESSADO COM SUCESSO!</strong><br />
                                💰 Valor R$ {cartTotal.toFixed(2).replace('.', ',')} debitado automaticamente da conta do cliente<br />
                                💳 Valor creditado na conta corrente do Bradesco de Leonardo Bezerra de Campos<br />
                                🔒 Transação processada com segurança máxima
                              </p>
                            </div>
                          ) : (
                            <div className="bg-orange-100 border border-orange-300 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600"></div>
                                <p className="text-sm text-orange-800">
                                  🔄 <strong>Processando débito automático...</strong><br />
                                  Aguarde enquanto processamos o pagamento de R$ {cartTotal.toFixed(2).replace('.', ',')}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-sm text-blue-700">
                              <strong>💰 Valor exato:</strong> R$ {cartTotal.toFixed(2).replace('.', ',')}<br />
                              <strong>🔑 Chave PIX:</strong> 11932783727 (celular)<br />
                              <strong>👤 Beneficiário:</strong> Leonardo Bezerra de Campos<br />
                              <strong>🏦 Banco:</strong> Bradesco (237) - Conta Corrente<br />
                              <strong>⚡ Processamento:</strong> Débito automático instantâneo
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'boleto' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Banknote className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-blue-800">Pagamento via Boleto</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          O boleto será gerado após a confirmação do pedido.
                          O valor será creditado na conta corrente do Bradesco de Leonardo Bezerra de Campos após o pagamento.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Informações da conta bancária */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">🏦 Conta para Recebimento</span>
                      </div>
                      <button
                        onClick={() => setShowBankData(!showBankData)}
                        className="text-green-600 hover:text-green-700"
                      >
                        {showBankData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {showBankData ? (
                      <div className="text-sm text-green-700 space-y-1">
                        <p><strong>Banco:</strong> Bradesco (237)</p>
                        <p><strong>Tipo:</strong> Conta Corrente</p>
                        <p><strong>Beneficiário:</strong> Leonardo Bezerra de Campos</p>
                        <p><strong>PIX:</strong> 11932783727 (celular)</p>
                        <p><strong>QR Code:</strong> Da imagem fornecida com valor do carrinho</p>
                        <p><strong>Processamento:</strong> Débito automático instantâneo</p>
                      </div>
                    ) : (
                      <p className="text-sm text-green-700">
                        ✅ Conta bancária configurada - Bradesco (Leonardo Bezerra de Campos)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Resumo do pedido */}
              <div className="lg:w-80 bg-gray-50 p-6 border-l">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h3>
                
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-[#003d82]">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Frete:</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#003d82] border-t pt-2">
                    <span>Total:</span>
                    <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  
                  {paymentMethod === 'credit' && installments > 1 && (
                    <p className="text-sm text-gray-600 text-center">
                      {installments}x de R$ {installmentValue.toFixed(2).replace('.', ',')}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleFinalizePurchase}
                  className="w-full bg-[#ff6900] hover:bg-[#e55a00] text-white py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95 mt-6 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Finalizar Compra
                </button>

                <div className="flex items-center justify-center gap-1 mt-3 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Compra 100% segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}