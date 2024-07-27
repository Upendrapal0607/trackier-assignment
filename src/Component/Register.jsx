import { Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ResisterUser } from "../Controller/Controller";

export const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({
    name: "",
    password: "",
    email: "",
  });

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail({ ...userDetail, [name]: value });
  };

  const HandleResister = async (e) => {
    e.preventDefault();
    if (
      userDetail?.email.trim() === "" ||
      userDetail?.password.trim() === "" ||
      userDetail?.name.trim() === ""
    ) {
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
    setLoading(true);
    try {
      const data = await ResisterUser(userDetail);
      if (data.data.message == "User registered successfully.") {
        toast({
          title: "Register alert",
          description: "User registered successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        navigate("/login");
      } else {
        toast({
          title: "Register alert",
          description: data.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Register Failed",
        description: "Register failed try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
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
                User Name
              </label>
              <div className="mt-1">
                <input
                  name="name"
                  value={userDetail.username}
                  onChange={(e) => HandleChange(e)}
                  id="email"
                  type="text"
                  autoComplete="text"
                  required
                  className="bg-white text-gray-900 border-indigo-200 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  value={userDetail.email}
                  onChange={(e) => HandleChange(e)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="bg-white text-gray-900 border-indigo-200 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  value={userDetail.pwd}
                  onChange={(e) => HandleChange(e)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="bg-white text-gray-900 border-indigo-200 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                onClick={HandleResister}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "creating..." : "Sign in"}
              </button>
            </div>
          </form>
          <Stack pt={6}>
            <Text align={"center"} className="bg-white text-gray-900">
              Already a user?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login
              </Link>
            </Text>
          </Stack>
        </div>
      </div>
    </div>
    // <div className="min-h-80 flex flex-col justify-center items-center py-12 mb-10 sm:px-6 lg:px-8">
    //   <div className="sm:mx-auto sm:w-full sm:max-w-md">
    //     <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    //       Sign in to your account
    //     </h2>
    //   </div>

    //   <div className="mt-8 sm:mx-auto max-w-md sm:w-full sm:max-w-md">
    //     <div className="py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
    //       <form className="space-y-6" action="#" method="POST">
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             User Name
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               name="username"
    //               value={userDetail.username}
    //               onChange={(e) => HandleChange(e)}
    //               id="email"
    //               type="text"
    //               autoComplete="text"
    //               required
    //               className="border-indigo-300 bg-white text-black appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Email address
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               value={userDetail.email}
    //               onChange={(e) => HandleChange(e)}
    //               id="email"
    //               name="email"
    //               type="email"
    //               autoComplete="email"
    //               required
    //               className="border-indigo-300 bg-white text-black appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>

    //         <div>
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <div className="mt-1">
    //             <input
    //               value={userDetail.pwd}
    //               onChange={(e) => HandleChange(e)}
    //               id="password"
    //               name="pwd"
    //               type="password"
    //               autoComplete="current-password"
    //               required
    //               className="border-indigo-300 bg-white text-black appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           {/* <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Register as
    //           </label> */}

    //         </div>

    //         {/* <div className="flex items-center justify-between">
    //           <div className="flex items-center">
    //             <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
    //             <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
    //               Remember me
    //             </label>
    //           </div> */}

    //         {/* <div className="text-sm">
    //             <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
    //               Forgot your password?
    //             </a>
    //           </div>
    //         </div> */}

    //         <div>
    //           <button
    //             onClick={HandleResister}
    //             type="submit"
    //             className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //           >
    //             Sign in
    //           </button>
    //         </div>
    //       </form>
    //       <Stack pt={6}>
    //         <Text align={"center"} className="text-gray-900">
    //           Already a user?{" "}
    //           <Link to={"/login"} className="text-blue-500">
    //             Login
    //           </Link>
    //         </Text>
    //       </Stack>
    //     </div>
    //   </div>
    // </div>
  );
};
