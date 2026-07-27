import { z } from "zod";
import Button from "../../common/buttons/button";
import Input from "../../common/inputs/input";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

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

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login sucess", data);

      //storing userObj &  token on local stoage ko lagi 
      localStorage.setItem('user',JSON.stringify(data.data.user))
      // localStorage.setItem("token", data.access_token);

      toast.success( data.message ?? "Login sucessfull");
      navigate("/");
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error(error.message || "Login failed");
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // const response = await login(data);
    // console.log(response)

    mutate(data);
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

          <Button
            isDisabled={isPending}
            label={isPending ? "Logging in.." : "Login"}
            type="submit"
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
