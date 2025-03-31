"use client";
import React, { useMemo, useState, useEffect } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../ImageUpload";
import Input from "../Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [refresh, setRefresh] = useState(false); // Force re-render
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      image: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const image = watch("image");
  useEffect(() => {
    console.log("Updated image in RentModal:", image);
  }, [image]); // Debugging image update

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    console.log("Setting value for", id, "to", value);
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setRefresh((prev) => !prev); // Force re-render
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodycontent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Quelle catégorie decris mieux votre residence ?"
        subtitle="Choisi une category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              label={item.label}
              icon={item.icon}
              selected={category === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ou est-ce que votre residence est située ?"
          subtitle="Aider les clients a vous trouver!"
        />
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Quel type de residence avez-vous?"
          subtitle="Entrez les informations de votre residence"
        />
        <Counter
          title="Numbre de personnes"
          subtitle="Combien de personnes vont rester?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Chambres"
          subtitle="Commbien de chambres avez-vous?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Douches"
          subtitle="Combien de douches avez-vous?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    console.log("RentModal image:", image); // Debug image
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ajouter une photo de votre residence"
          subtitle="Mettez une photo de votre residence!"
        />
        <ImageUpload
          value={image}
          onChange={(value) => {
            console.log("ImageUpload returned value:", value);
            setCustomValue("image", value);
          }}
        />
      </div>
    );
  }
  if (step === STEPS.DESCRIPTION) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Mettez la ville et le quartier de votre residence?"
          subtitle="Exemple: Abidjan, Cocody Rivera 2 !"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodycontent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Votre prix"
          subtitle="Dites nous combien vous voulez gagner par nuit ?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home!"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      isOpen={rentModal.isOpen}
      onSubmit={handleSubmit(onSubmit)}
      body={bodycontent}
    />
  );
};

export default RentModal;
