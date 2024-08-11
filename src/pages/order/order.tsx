import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';

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
  { division: "barishal", divisionbn: "বরিশাল", coordinates: "22.3811, 90.3372" },
  { division: "chattogram", divisionbn: "চট্টগ্রাম", coordinates: "23.1793, 91.9882" },
  { division: "dhaka", divisionbn: "ঢাকা", coordinates: "23.9536, 90.1495" },
  { division: "khulna", divisionbn: "খুলনা", coordinates: "22.8088, 89.2467" },
  { division: "mymensingh", divisionbn: "ময়মনসিংহ", coordinates: "24.7136, 90.4502" },
  { division: "rajshahi", divisionbn: "রাজশাহী", coordinates: "24.7106, 88.9414" },
  { division: "rangpur", divisionbn: "রংপুর", coordinates: "25.8483, 88.9414" },
  { division: "sylhet", divisionbn: "সিলেট", coordinates: "24.7050, 91.6761" }
];

const OrderProduct: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('01');
  const [email, setEmail] = useState<string>('');
  const [divisions, setDivisions] = useState<OptionType[]>([]);
  const [districts, setDistricts] = useState<OptionType[]>([]);
  const [upazillas, setUpazillas] = useState<OptionType[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<SingleValue<OptionType>>(null);
  const [selectedZilla, setSelectedZilla] = useState<SingleValue<OptionType>>(null);
  const [selectedUpazilla, setSelectedUpazilla] = useState<SingleValue<OptionType>>(null);

  // Load divisions from local data
  useEffect(() => {
    const divisionOptions = divisionsData.map((division) => ({
      value: division.division,
      label: division.division // Display in Bengali
    }));
    setDivisions(divisionOptions);
  }, []);

  // Fetch Zillas (districts) based on selected division
  useEffect(() => {
    if (selectedDivision) {
      axios.get(`https://bdapis.com/api/v1.2/division/${selectedDivision.value}`)
        .then(response => {
          const districtsArray: DistrictData[] = response.data.data || [];
          const districtOptions = districtsArray.map((district) => ({
            value: district.district,
            label: district.district
          }));
          setDistricts(districtOptions);
          setUpazillas([]); // Clear upazillas when division changes
        })
        .catch(error => {
          console.error('Error fetching districts:', error);
        });
    } else {
      setDistricts([]);
      setUpazillas([]);
    }
  }, [selectedDivision]);

  // Fetch Upazillas based on selected Zilla
  useEffect(() => {
    if (selectedZilla && selectedDivision) {
      axios.get(`https://bdapis.com/api/v1.2/division/${selectedDivision.value}`)
        .then(response => {
          const districtsArray: DistrictData[] = response.data.data || [];
          const selectedDistrictData = districtsArray.find(d => d.district === selectedZilla.value);
          const upazillaArray = selectedDistrictData ? selectedDistrictData.upazilla : [];
          const upazillaOptions = upazillaArray.map((upazilla: string) => ({
            value: upazilla,
            label: upazilla
          }));
          setUpazillas(upazillaOptions);
        })
        .catch(error => {
          console.error('Error fetching upazillas:', error);
        });
    } else {
      setUpazillas([]);
    }
  }, [selectedZilla, selectedDivision]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (phoneNumber.length !== 11) {
      alert("Phone number must be 11 digits long.");
      return;
    }

    const formData = {
      fullName,
      phoneNumber,
      email,
      division: selectedDivision?.label,
      zilla: selectedZilla?.label,
      upazilla: selectedUpazilla?.label,
    };

    console.log("Form Submitted", formData);
    // You can now send this data to your backend or process it as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Purchase Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="division">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zilla">
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="upazilla">
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
    </div>
  );
};

export default OrderProduct;
