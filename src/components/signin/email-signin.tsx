"use client";
import { FC, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import * as Yup from "yup";
import {
  Field,
  FieldAttributes,
  Form,
  Formik,
  FormikConfig,
  FormikProps,
  useField,
} from "formik";
import * as Icons from "@/components/ui/icons";
import { useLoginMutation } from "@/app/services/auth";
import { IUserFormSend } from "@/types/user";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

export function EmailSignIn() {
  const router = useRouter();

  const [mutateAsync, result] = useLoginMutation();

  const formikRef = useRef<FormikProps<IUserFormSend>>(null);

  const [cookies, setCookie, removeCookie] = useCookies(["user", "token"]);

  const onSubmitClickHandler: FormikConfig<IUserFormSend>["onSubmit"] = (
    values,
    { setSubmitting, setErrors }
  ) => {
    async function submit() {
      await setSubmitting(true);

      await mutateAsync(values)
        .unwrap()
        .then((data) => {
          setCookie("user", data.data.user._id);
          setCookie("token", data.data.token);
          setSubmitting(false);
          router.push(`/${data.data.user._id}`);
        })
        .catch((error) => {
          setErrors({
            email: "An error has occured",
          });
        });
      await setSubmitting(false);
    }
    submit();
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <Formik<IUserFormSend>
          innerRef={formikRef}
          validationSchema={validationSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={onSubmitClickHandler}
        >
          {(props) => (
            <Form>
              <MyInpuTField name="email" type="text" label="Email" />
              {props.errors.email && (
                <p className="text-red-500 text-xs italic">
                  {props.errors.email}
                </p>
              )}
              <Button
                type="submit"
                disabled={props.isSubmitting || !props.isValid}
                className="w-full mt-3"
              >
                {props.isSubmitting && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

const MyInpuTField: FC<{
  label: string;
  name: string;
  type: string;
}> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <Input
      name="email"
      placeholder="name@example.com"
      type="email"
      onChange={(e) => {
        helpers.setValue(e.target.value);
      }}
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect="off"
      className="bg-background"
    />
  );
};
