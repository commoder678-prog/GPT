import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../store/actions/userAction";
import { useDispatch } from "react-redux";

const Register = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const registerHandler = async (userDetails) => {
    const result = await dispatch(registerUser(userDetails));

    if (result?.success) {
      navigateTo("/");
    } else {
      alert("An error occured");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      {/* Left Side - register Form */}
      <motion.div
        className="flex-1 flex items-center justify-center bg-white/95 backdrop-blur-sm p-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full max-w-lg space-y-8">
          {/* Logo and Brand */}
          <motion.div
            variants={itemVariants}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">Nebula</span>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Create account</h1>
            <p className="text-gray-600 text-lg">
              Welcome to Nebula! Please enter your details.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(registerHandler)}
            variants={containerVariants}
            className="space-y-7"
          >
            <motion.div variants={itemVariants} className="gap-4 flex">
              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder=""
                  {...register("firstName")}
                  className="h-14 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl text-base shadow-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-gray-700"
                >
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder=""
                  {...register("lastName")}
                  className="h-14 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl text-base shadow-sm"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="olivia@untitledui.com"
                {...register("email")}
                className="h-14 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl text-base shadow-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="password"
                {...register("password")}
                className="h-14 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-xl text-base shadow-sm"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-5 pt-2">
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/25 transform hover:scale-105"
              >
                Create account
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-14 border-gray-300 hover:bg-gray-50 font-semibold rounded-xl flex items-center justify-center space-x-2 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Chrome className="w-5 h-5" />
                <span>Sign up with Google</span>
              </Button>
            </motion.div>
          </motion.form>

          {/* Footer */}
          <motion.div variants={itemVariants} className="text-center pt-6">
            <p className="text-base text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigateTo("/login")}
                className="text-indigo-600 hover:text-indigo-700 font-semibold cursor-pointer transition-colors duration-200"
              >
                Log In
              </button>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Welcome Content */}
      <motion.div
        className="flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-12 flex flex-col justify-center items-center text-white relative overflow-hidden"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-white/15 rounded-full filter blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-300/20 rounded-full filter blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-purple-300/10 rounded-full filter blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-lg text-center space-y-8 z-10 w-full">
          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 px-4"
          >
            <h2 className="text-6xl font-bold tracking-tight">Welcome to Nebula</h2>
            <p className="text-white/90 text-xl leading-relaxed font-medium">
              Harness the power of advanced analytics and insights. Streamline
              your workflow, enhance productivity, and create exceptional
              experiences for your users.
            </p>
          </motion.div>

          {/* Chat-style Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 space-y-6 max-w-md mx-auto relative border border-white/20 shadow-2xl"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="font-bold text-indigo-600">N</span>
              </div>
              <span className="font-semibold text-white text-lg">Nebula</span>
            </div>

            <div className="bg-white rounded-2xl p-5 text-slate-800 shadow-lg max-w-[85%] mx-auto font-medium leading-relaxed">
              Hello, this is Nebula, your intelligent assistant. In today's
              session, we'd like to show you the powerful analytics capabilities
              and insights you'll gain access to.
            </div>

            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-5 max-w-xs text-white shadow-lg">
                <div className="text-right mb-2 text-xs opacity-80 font-medium">You</div>
                Yes, I'm ready. Let&apos;s explore!
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
