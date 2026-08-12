"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  seconds: number; // starting duration
  onComplete?: () => void; // fires once when it hits 0
  onResend?: () => void; // called when user clicks resend
  isResending?: boolean; // optional loading state for resend action
  label?: string; // text before the timer, e.g. "Didn't receive the code?"
}

const Countdown = ({
  seconds,
  onComplete,
  onResend,
  isResending = false,
  label = "Didn't receive the code?",
}: CountdownProps) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete?.();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const formatTime = (s: number) => {
    const minutes = Math.floor(s / 60);
    const secs = s % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResend = () => {
    onResend?.();
    setSecondsLeft(seconds); // reset countdown
  };

  return (
    <p className="text-xs text-muted-foreground text-center">
      {label}{" "}
      {secondsLeft > 0 ? (
        <span className="font-medium text-foreground">
          Resend in {formatTime(secondsLeft)}
        </span>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="font-medium text-[#F97316] hover:underline disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend now"}
        </button>
      )}
    </p>
  );
};

export default Countdown;