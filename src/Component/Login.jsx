import { Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../Controller/Controller";
import { ProjectContextValue } from "../RootContext/ContectProvider";
// import { GetContextValue } from "../ContextProvider/TrainContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { setIsAuth, setUserDetails } = ProjectContextValue();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast({
        title: "Alert",
        description: "Please Fill All Fields",
        status: "info",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const data = await LoginUser({ email: email, password: password });

      setLoading(false);
      if (data.data.message == "login successful") {
        localStorage.setItem("projecttoken", JSON.stringify(data?.data?.token));

        toast({
          title: "User Login Success",
          description: data.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setUserDetails(data?.data?.user);
        setIsAuth(true);
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        toast({
          title: "Login Failed",
          description: data?.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Errorr", { error });
      toast({
        title: "Login Failed",
        description: "login failed",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required={true}
                  className="bg-white text-gray-900 border-indigo-200  appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required={true}
                  className="bg-white text-gray-900 border-indigo-200 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "wait..." : "Login"}
              </button>
            </div>
          </form>
          <Stack pt={6}>
            <Text align={"center"} className="bg-white text-gray-900">
              Haven't account{" "}
              <Link className="text-blue-400" to={"/register"}>
                Create an account
              </Link>
            </Text>
          </Stack>
        </div>
      </div>
    </div>
  );
};
