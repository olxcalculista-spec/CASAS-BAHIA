export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  discount: number;
  installments: {
    count: number;
    value: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type PaymentMethod = 'credit' | 'debit' | 'pix' | 'boleto';

export interface CustomerData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  installments: number;
}

export interface BankAccount {
  bank: string;
  accountHolder: string;
  pixKey: string;
  accountNumber: string;
  agency: string;
}