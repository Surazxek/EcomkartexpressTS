import { FormProvider, useForm } from "react-hook-form";
import Button from "../../common/buttons/button";
import Input from "../../common/inputs/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { register } from "../../../api/auth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(3, "First name must be at least 3 characters")
      .max(30, "Max alphabet for First Name is 30"),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(30, "Max alphabet for Last Name is 30"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
    phone_number: z
      .string()
      .regex(
        /^(?:\+977|00977)?\s?(98\d{8}|97\d{8}|91\d{8}|0[1-9]\d{7})$/,
        "Invalid Nepali phone number is needed",
      )
      
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("User Registered", data);
      toast.success("User Registered Successfully ");
      navigate("/login");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error(error.message || "Registration Failed! Try Again");
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // console.log("form submitted", data);
    // const Register = await register(data)
    // console.log(Register)
    // mutate(data);

      // const { confirm_password, ...payload } = data; // remove confirm_password
      mutate(data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col md:flex-row gap-3">
              <Input
                label="First Name"
                id="first_name"
                name="first_name"
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                id="last_name"
                name="last_name"
                placeholder="Doe"
                required
              />
            </div>
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="Johndoe@gmail.com"
              required
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="***********"
              required
            />
            <Input
              label="Confirm Password"
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Retype your password"
              required
            />
            <Input
              label="Phone Number"
              id="phone_number"
              name="phone_number"
              placeholder="+9779841xxxxx"
            />
            <Button
              isDisabled={isPending}
              label={isPending ? "Being Registered " : "Register"}
              type="submit"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterForm;
