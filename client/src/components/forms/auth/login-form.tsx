import { z } from "zod";
import Button from "../../common/buttons/button";
import Input from "../../common/inputs/input";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),

  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const methods = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: "all",
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("form submitted", data);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-5">
            {/* email */}

            <Input
              id={"email"}
              label={"Email"}
              name={"email"}
              placeholder={"Johndoe@gmail.com"}
              type={"text"}
              required
            />

            {/* passowrd */}

            <Input
              id={"passoword"}
              label={"Password"}
              name={"password"}
              placeholder={"**********"}
              type={"password"}
              required
            />
          </div>

          <Button label={"Login"} type="submit" />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
