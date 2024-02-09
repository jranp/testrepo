import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BookingToolsContext = createContext();
const useBookingTools = () => useContext(BookingToolsContext);

function BookingToolsProvider(props) {
  //fetching tools
  const getPets = async (owner_id) => {
    try {
      setPetsResults({ ...petsResults, isLoading: true, isError: false });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const results = await axios.get(
        `http://localhost:4000/pets/myPets/` //its attached token in request, token will verify by middleware if vilid token, will extract token and add userId to req.
      );
      setPetsResults({
        data: results.data.data,
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      setPetsResults({ ...petsResults, isError: true, isLoading: false });
    }
  };

  const getSitterData = async (sitter_id) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/sitters/${sitter_id}`
      );
      setSitterData(result.data);
    } catch (error) {
      console.error("Error while fetching available pet types:", error);
    }
  };

  const getOwnerData = async () => {
    try {
      const result = await axios.get(`http://localhost:4000/owners/myProfile`);
      setOwnerData(result.data.data.data);
    } catch (error) {
      console.error("Error while fetching available pet types:", error);
    }
  };

  //global state
  const [selectedPets, setSelectedPets] = useState([]);
  const [petsResults, setPetsResults] = useState({
    data: [],
    isError: false,
    isLoading: false,
  });
  const [isSelect, setIsSelect] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [sitterData, setSitterData] = useState({});
  const [ownerData, setOwnerData] = useState({});

  //detect isSelect
  const verifySelect = () => {
    return selectedPets.length > 0;
  };
  useEffect(() => {
    setIsSelect(verifySelect());
  }, [selectedPets]);

  //handle toggle pets
  const toggleSelection = (pet) => {
    setSelectedPets((prev) =>
      prev.some((selectedPet) => selectedPet.id === pet.id)
        ? prev.filter((selectedPet) => selectedPet.id !== pet.id)
        : [...prev, pet]
    );
  };

  return (
    <BookingToolsContext.Provider
      value={{
        selectedPets,
        setSelectedPets,
        petsResults,
        setPetsResults,
        getPets,
        toggleSelection,
        verifySelect,
        isSelect,
        setShowVerifyModal,
        showVerifyModal,
        showWarningModal,
        setShowWarningModal,
        getSitterData,
        sitterData,
        getOwnerData,
        ownerData,
      }}
    >
      {props.children}
    </BookingToolsContext.Provider>
  );
}

export { BookingToolsProvider, useBookingTools };