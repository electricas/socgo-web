import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import firebase from "firebase";

export default function SightForm(sight: any, setSight: any) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, locales, defaultLocale } = router;
  const toast = useToast();

  const { handleSubmit, errors, register, formState, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  function validateName(value: string) {
    if (!value) {
      return "This field cannot be empty.";
    } else if (value.length > 100) {
      return "Length has to be under 100.";
    } else return true;
  }

  function validateDesc(value: string) {
    if (!value) {
      return "This field cannot be empty.";
    } else if (value.length > 500) {
      return "Length has to be under 500.";
    } else return true;
  }

  function validateImageUrl(value: string) {
    if (!value) {
      return "This field cannot be empty.";
    } else if (value.length > 1000) {
      return "Length has to be under 1000.";
    } else return true;
  }

  function onSubmit(values: any) {
    values.location = new firebase.firestore.GeoPoint(
      sight.sight.location["x_"],
      sight.sight.location["N_"]
    );
    return new Promise<void>(async (resolve) => {
      await firebase
        .firestore()
        .collection("sights")
        .doc(sight.sight.id)
        .update(values)
        .then((sight) => {
          toast({
            title: "Success",
            description: "Successfully edited the sight.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: "An error has occured",
            description: err.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
      resolve();
      router.push("/dashboard");
    });
  }

  useEffect(() => {
    reset(sight.sight);
  }, [sight.sight]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4} isInvalid={!!errors.name?.toString()}>
        <FormLabel htmlFor="name" textColor="rgba(127, 127, 127, 0.5)">
          {t("dash-sight-name")}
        </FormLabel>
        <Input
          name="name"
          size="lg"
          placeholder={t("dash-sight-name")}
          ref={register({ validate: validateName })}
          required
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb={4} isInvalid={!!errors.description?.toString()}>
        <FormLabel htmlFor="description" textColor="rgba(127, 127, 127, 0.5)">
          {t("dash-sight-description")}
        </FormLabel>
        <Textarea
          name="description"
          placeholder={t("dash-sight-description")}
          ref={register({ validate: validateDesc })}
          required
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mb={4} isInvalid={!!errors.imageUrl?.toString()}>
        <FormLabel htmlFor="imageUrl" textColor="rgba(127, 127, 127, 0.5)">
          {t("dash-sight-imageurl")}
        </FormLabel>
        <Input
          name="imageUrl"
          placeholder={t("dash-sight-imageurl")}
          ref={register({ validate: validateImageUrl })}
          required
        />
        <FormErrorMessage>
          {errors.imageUrl && errors.imageUrl.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        colorScheme="brand"
        textColor="white"
        isLoading={formState.isSubmitting}
        type="submit"
        w="100%"
      >
        {t("common:dash-savechanges")}
      </Button>
    </form>
  );
}
