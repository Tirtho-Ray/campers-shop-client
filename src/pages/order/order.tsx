import React, { useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import axios from "axios";

import { clearCart, getCart } from "../../utils/cardUtils";
import { Link } from "react-router-dom";
import { TProduct } from "../../readux/Api/Api";

// Types
interface OptionType {
  value: string;
  label: string;
}

interface DistrictData {
  district: string;
  coordinates: string;
  upazilla: string[];
}

const divisionsData = [
  {
    division: "barishal",
    divisionbn: "বরিশাল",
    coordinates: "22.3811, 90.3372",
  },
  {
    division: "chattogram",
    divisionbn: "চট্টগ্রাম",
    coordinates: "23.1793, 91.9882",
  },
  { division: "dhaka", divisionbn: "ঢাকা", coordinates: "23.9536, 90.1495" },
  { division: "khulna", divisionbn: "খুলনা", coordinates: "22.8088, 89.2467" },
  {
    division: "mymensingh",
    divisionbn: "ময়মনসিংহ",
    coordinates: "24.7136, 90.4502",
  },
  {
    division: "rajshahi",
    divisionbn: "রাজশাহী",
    coordinates: "24.7106, 88.9414",
  },
  { division: "rangpur", divisionbn: "রংপুর", coordinates: "25.8483, 88.9414" },
  { division: "sylhet", divisionbn: "সিলেট", coordinates: "24.7050, 91.6761" },
];

const OrderProduct: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("01");
  const [email, setEmail] = useState<string>("");
  const [divisions, setDivisions] = useState<OptionType[]>([]);
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [upazillas, setUpazillas] = useState<OptionType[]>([]);
  const [selectedDivision, setSelectedDivision] =
    useState<SingleValue<OptionType>>(null);
  const [selectedZilla, setSelectedZilla] =
    useState<SingleValue<OptionType>>(null);
  const [selectedUpazilla, setSelectedUpazilla] =
    useState<SingleValue<OptionType>>(null);
  const [cart, setCart] = useState<TProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [stripeNumber, setStripeNumber] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  // Load cart items from local storage

  // Load divisions from local data
  useEffect(() => {
    const divisionOptions = divisionsData.map((division) => ({
      value: division.division,
      label: division.division, // Display in Bengali
    }));
    setDivisions(divisionOptions);
  }, []);

  // Fetch Zillas (districts) based on selected division
  useEffect(() => {
    if (selectedDivision) {
      axios
        .get(`https://bdapis.com/api/v1.2/division/${selectedDivision.value}`)
        .then((response) => {
          const districtsArray: DistrictData[] = response.data.data || [];
          const districtOptions = districtsArray.map((district) => ({
            value: district.district,
            label: district.district,
          }));
          setDistricts(districtOptions);
          setUpazillas([]); // Clear upazillas when division changes
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
        });
    } else {
      setDistricts([]);
      setUpazillas([]);
    }
  }, [selectedDivision]);

  // Fetch Upazillas based on selected Zilla
  useEffect(() => {
    if (selectedZilla && selectedDivision) {
      axios
        .get(`https://bdapis.com/api/v1.2/division/${selectedDivision.value}`)
        .then((response) => {
          const districtsArray: DistrictData[] = response.data.data || [];
          const selectedDistrictData = districtsArray.find(
            (d) => d.district === selectedZilla.value
          );
          const upazillaArray = selectedDistrictData
            ? selectedDistrictData.upazilla
            : [];
          const upazillaOptions = upazillaArray.map((upazilla: string) => ({
            value: upazilla,
            label: upazilla,
          }));
          setUpazillas(upazillaOptions);
        })
        .catch((error) => {
          console.error("Error fetching upazillas:", error);
        });
    } else {
      setUpazillas([]);
    }
  }, [selectedZilla, selectedDivision]);

  // Load cart items from local storage
  useEffect(() => {
    const cartItems = getCart();
    setCart(cartItems);
  }, []);

  // Handle form submission
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Simple validation
  //   if (phoneNumber.length !== 11) {
  //     alert("Phone number must be 11 digits long.");
  //     return;
  //   }

  //   const formData = {
  //     fullName,
  //     phoneNumber,
  //     email,
  //     division: selectedDivision?.label,
  //     zilla: selectedZilla?.label,
  //     upazilla: selectedUpazilla?.label,
  //   };

  //   console.log("Form Submitted", formData);
  //   // You can now send this data to your backend or process it as needed
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Simple validation
  //   if (phoneNumber.length !== 11) {
  //     alert("Phone number must be 11 digits long.");
  //     return;
  //   }

  //   if (paymentMethod === 'stripe' && stripeNumber.length !== 11) {
  //     alert("Please enter a valid 11-digit number for Stripe payment.");
  //     return;
  //   }

  //   // Deduct product quantities from stock (you'll need to implement this logic)
  //   // Example: cart.forEach(product => deductFromStock(product._id, product.quantity));

  //   // Clear cart
  //   clearCart();
  //   setCart([]);

  //   // Redirect to success page (you'll need to implement the navigation)
  //   if (paymentMethod === 'stripe' && stripeNumber.length !== 11) {
  //     alert("Please enter a valid 11-digit number for Stripe payment.");
  //     return;
  //   }

  // };
 // Handle form submission
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Simple validation
  if (phoneNumber.length !== 11) {
      alert("Phone number must be 11 digits long.");
      return;
  }

  if (paymentMethod === "stripe" && stripeNumber.length !== 11) {
      alert("Please enter a valid 11-digit number for Stripe payment.");
      return;
  }

  // Show modal before clearing the cart
  setShowModal(true);

  // Clear cart and reset form after a short delay to ensure the modal is displayed
  setTimeout(() => {
      // Deduct product quantities from stock (implement your logic here)

      clearCart();
      setCart([]);
      setFullName("");
      setPhoneNumber("01");
      setEmail("");
      setSelectedDivision(null);
      setSelectedZilla(null);
      setSelectedUpazilla(null);
      setStripeNumber("");
      setPaymentMethod("cash");
  }, 500); // Adjust the delay as needed
};

useEffect(() => {
  const cartItems = getCart();
  setCart(cartItems);

  // Calculate the total price of the cart items
  const total = cartItems.reduce((sum, product) => sum + product.price, 0);

  // Update the total price state as a number
  setTotalPrice(total);
}, []);



  return (
    <div className="min-h-screen flex items-center justify-center py-6 lg:py-12 mt-10 md:mt16 lg:mt-24 px-2">
      <div className="w-full max-w-2xl p-6 bg-gray-300 rounded-lg shadow-md  ">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Purchase Product
        </h2>
        {/* Display Cart Items */}
        {cart.length > 0 && (
          <div className="mb-6">
            {cart.map((product) => (
              <div
                key={product._id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg mr-4"
                  />
                  <h3 className="text-sm font-bold">{product.name}</h3>
                </div>
                <h3 className="text-sm font-bold">{product.price}$</h3>
              </div>
            ))}
            <div className="flex justify-end gap-3 font-bold text-lg">
              <span>Total Price:</span>
              <span>{totalPrice.toFixed(2)}$</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="division"
              >
                Division
              </label>
              <Select
                options={divisions}
                onChange={(option) => {
                  setSelectedDivision(option);
                  setSelectedZilla(null);
                  setSelectedUpazilla(null);
                }}
                value={selectedDivision}
                placeholder="Select your division"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="zilla"
              >
                Zilla (District)
              </label>
              <Select
                options={districts}
                onChange={(option) => {
                  setSelectedZilla(option);
                  setSelectedUpazilla(null);
                }}
                value={selectedZilla}
                placeholder="Select your zilla"
                isDisabled={!selectedDivision}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="upazilla"
              >
                Upazilla
              </label>
              <Select
                options={upazillas}
                onChange={setSelectedUpazilla}
                value={selectedUpazilla}
                placeholder="Select your upazilla"
                isDisabled={!selectedZilla}
              />
            </div>
          </div>
          {/*  */}
          {/* Payment Method Selection */}
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Method
              </label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="cash"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cash" className="text-gray-700 text-sm">
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="stripe"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="stripe" className="text-gray-700 text-sm">
                  Stripe
                </label>
              </div>
            </div>

            {/* Stripe 11-digit Input Box */}
            {paymentMethod === "stripe" && (
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="stripeNumber"
                >
                  Enter 11-digit Stripe Number
                </label>
                <input
                  type="text"
                  id="stripeNumber"
                  value={stripeNumber}
                  onChange={(e) => setStripeNumber(e.target.value)}
                  placeholder="Enter 11-digit number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Order Successful</h2>
            <p className="mb-4">Your order has been placed successfully!</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  window.location.href = "/";
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Go to Home
              </button>
             <Link to='/product'>
             <button
                onClick={() => setShowModal(false)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Continue Shopping
              </button>
             </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProduct;
