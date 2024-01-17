import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import { DNA } from "react-loader-spinner";
import { useEffect, useState } from "react";

const UpdateModal = ({ open, onClose, details }) => {
  console.log(details);

  const { pathname } = useLocation();

  const [formValues, setFormValues] = useState({});
  console.log("form values", formValues);

  useEffect(() => {
    setFormValues(details);
  }, [details]);

  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  // TASK delete endpoint
  const {
    mutate,
    isLoading: isDeletingDetails,
    isError: isDeleteError,
  } = useMutation({
    mutationFn: async () => {
      if (pathname.includes("Nurses")) {
        const { data } = await axios.delete(`/nurse/${details._id}`);
        return data;
      } else if (pathname.includes("Patients")) {
        const { data } = await axios.delete(`/patient/${details._id}`);
        return data;
      } else if (pathname.includes("Bookings")) {
        const { data } = await axios.delete(`/book-nurse/${details._id}`);
        return data;
      }
    },
    onSuccess: () => queryClient.invalidateQueries("allBookings"),
  });

  // TASK update endpoint
  const {
    mutate: updateDetails,
    isLoading: isUpdatingDetails,
    isError: isUpdateError,
  } = useMutation({
    mutationFn: async (formValues) => {
      if (pathname.includes("Nurses")) {
        const { data } = await axios.put(`/nurse/${details._id}`, formValues);
        return data;
      } else if (pathname.includes("Patients")) {
        const { data } = await axios.put(`/patient/${details._id}`, formValues);
        return data;
      } else if (pathname.includes("Bookings")) {
        const { data } = await axios.put(
          `/book-nurse/${details._id}`,
          formValues
        );
        return data;
      }
    },
  });

  if (isDeletingDetails || isUpdatingDetails) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <DNA
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <p className="text-slate-500 font-thin">Updating Bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{ modal: "w-[40%]" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateDetails();
          onClose();
        }}
      >
        {Object.entries(details).map(([key, value]) => {
          if (key !== "__v" && key !== "_id" && !key.includes("Id"))
            return (
              <div className="flex flex-col gap-1.5 mx-1 my-2" key={key}>
                <label className="font-semibold tracking-wide capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  value={formValues[key] || ""}
                  className="border outline-green-600 px-3 py-1"
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            );
        })}
        <div className="text-end mt-3">
          <button
            type="submit"
            className="px-3 py-1 mr-2 bg-green-950 text-white rounded-sm"
          >
            Update
          </button>
          <button
            className="px-3 py-1 bg-red-800 text-white rounded-sm"
            onClick={() => {
              mutate();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateModal;
