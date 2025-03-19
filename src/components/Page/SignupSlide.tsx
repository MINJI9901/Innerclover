"use client";
import { useState } from "react";
// COMPONENTS
import CloverFrame from "../Layout/CloverFrame";
import SignupForm from "../Form/SignupForm";
import LoginForm from "../Form/LoginForm";
import SendPassResetForm from "../Form/SendPassResetForm";

interface SlideProps {
  setPageStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function SignupSlide({ setPageStep }: SlideProps) {
  const [currentView, setCurrentView] = useState("signup");

  const isLogin = currentView === "login";
  const isSignup = currentView === "signup";

  return (
    <CloverFrame
      text={
        <>
          {isLogin ? (
            <>Hi, Nice to see you again!</>
          ) : isSignup ? (
            <>
              To start, please create an <br /> account if needed
            </>
          ) : (
            <>Did you forget your password?</>
          )}
        </>
      }
    >
      {isLogin ? (
        <LoginForm setPageStep={setPageStep} setCurrentView={setCurrentView} />
      ) : isSignup ? (
        <SignupForm setPageStep={setPageStep} setCurrentView={setCurrentView} />
      ) : (
        <SendPassResetForm
          setPageStep={setPageStep}
          setCurrentView={setCurrentView}
        />
      )}
    </CloverFrame>
  );
}
