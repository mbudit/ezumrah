import { ImageSourcePropType } from 'react-native';

export interface PaymentMethod {
  id: string;
  label: string;
  image: ImageSourcePropType;
  category: string;
}

export interface PaymentCategory {
  title: string;
  data: PaymentMethod[];
}

export interface PaymentInstructionStep {
  title: string;
  content: string;
}

export interface PaymentInstruction {
  paymentMethodId: string;
  accountNumber?: string;
  accountHolder?: string;
  steps: PaymentInstructionStep[];
  expirationDate?: string;
}

export interface TransactionSummary {
  orderId: string;
  totalAmount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'EXPIRED' | 'FAILED';
  paymentMethod?: PaymentMethod;
  instruction?: PaymentInstruction;
  flights: {
      id: string;
      from: string;
      to: string;
      date: string;
  }[];
}
