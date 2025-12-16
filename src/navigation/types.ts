export type RootStackParamList = {
  Splash: undefined;
  LanguageSelection: undefined;
  LoginSelection: undefined;
  Login: undefined;
  Register: undefined;
  Otp: undefined | { phoneNumber?: string }; // Example param
  Home: undefined;
  Notification: undefined;
  Voucher: undefined;
  PromoCode: undefined;
  EditProfile: undefined;
  AllProducts: undefined;
  Chat: undefined;
  ChatDetail: undefined | { chatId?: string };
  UmrahPackage: undefined;
  PackageList: undefined;
  VendorDetail: undefined | { vendorId?: string }; // Example
  PackageDetail: undefined | { packageId?: string; vendorId?: string }; // Example
  Booking: undefined | { packageId?: string }; // Generic/Package booking
  PassengerDetail: undefined | { passengerCount?: number; passengerNumber?: number }; // Example
  TripEnhance: undefined;
  OrderProcessing: undefined;
  CompletePayment: undefined | { orderId?: string; selectedPaymentMethod?: string };
  PaymentMethod: undefined | { orderId?: string; selectedPaymentMethod?: string };
  PaymentInstruction: undefined | { paymentMethod?: string; orderId?: string };
  Order: undefined;
  History: undefined;
  
  // Flight Flow
  FlightSearch: undefined;
  FlightResults: undefined | { searchParams?: any };
  HotelSearch: undefined;
  HotelResults: undefined | { searchParams?: any };
  FlightBooking: undefined | { flight?: any };
  FlightCompleteBooking: undefined | { flight?: any; ticket?: any };
};
