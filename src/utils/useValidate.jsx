import { useEffect, useState } from "react";

const useValidate = (value, isSignin, submitClicked) => {
    const [error, setError] = useState({});

    useEffect(() => {
        if (!submitClicked) return;

        const err = {};

        if (!isSignin && !value.name.trim()) {
            err.name = "Name is required";
        } else if (!isSignin && value.name.trim().length < 2) {
            err.name = "Name must be at least 2 characters long";
        }

        if (!value.email.trim()) {
            err.email = "Email is required";
        } else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(value.email)) {
                err.email = "Invalid email address";
            }
        }

        if (!value.password.trim()) {
            err.password = "Password is required";
        } else {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!re.test(value.password)) {
                err.password =
                    "Password must be 8+ characters, include uppercase, lowercase, number & special character";
            }
        }

        setError(err);
    }, [value, isSignin, submitClicked]);

    return error;
};

export default useValidate;
