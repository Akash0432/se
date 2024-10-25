import React, { useRef, useState } from "react";
import * as signupFunc from "./SignupFunctions";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import "./signup.css";

export default function Signup({ history }) {
    const [newUser, setNewUser] = useState({});
    const [loading, setLoading] = useState(false);
    const passwordRef = useRef(); // Create a ref for the password input

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value;
        setNewUser({ ...newUser, [field]: fieldValue });
    };

    const getToSignIn = (e) => {
        e.preventDefault();
        history.push("/login");
    };

    const validatePassword = (password) => {
        const passwordFormat = /^[A-Za-z]\w{7,14}$/;
        return password.match(passwordFormat);
    };

    const submitData = (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate password on form submission
        const password = passwordRef.current.value;
        if (!validatePassword(password)) {
            alert("Password must be 7 to 15 characters and contain only letters, numbers, and underscores.");
            setLoading(false);
            return;
        }

        // Proceed to register the user
        signupFunc.registerUser(newUser)
            .then((response) => {
                console.log(response.data);
                history.push("/login");
            })
            .catch((error) => {
                console.error("There was an error!", error);
                alert("Registration failed. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <div className="flex-container">
                <div className="row full">
                    <div className="col-md-12">
                        <div className="form-container">
                            <div className="form-container-in"></div>
                            <div className="row sgnUp">
                                <div className="col-md-6 right-divider pdding">
                                    <h3 className="lead-text mn-txt">Join Us with Social</h3>
                                    <div className="icon-soc-fb"><FaFacebookF /></div>
                                    <div className="icon-soc-tw"><FaTwitterSquare /></div>
                                </div>
                                <div className="left-divider">
                                    <div className="col-md-6">
                                        <form onSubmit={submitData}>
                                            <div className="form-group2">
                                                <label htmlFor="name">Name:</label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    className="form-control sgnUp"
                                                    onChange={(e) => handleChangeEvent(e, "name")}
                                                />
                                            </div>
                                            <div className="form-group2">
                                                <label htmlFor="email">Email - ID:</label>
                                                <input
                                                    required
                                                    id="email"
                                                    type="email"
                                                    className="form-control sgnUp"
                                                    onChange={(e) => handleChangeEvent(e, "email")}
                                                />
                                            </div>
                                            <div className="form-group2">
                                                <label htmlFor="mob-number">Mobile - No.:</label>
                                                <input
                                                    required
                                                    id="mob-number"
                                                    type="text"
                                                    className="form-control sgnUp"
                                                    onChange={(e) => handleChangeEvent(e, "mobile")}
                                                />
                                            </div>
                                            <div className="form-check form-check-inline rd">
                                                <input
                                                    required
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="Male"
                                                    name="gender"
                                                    value="Male"
                                                    onChange={(e) => handleChangeEvent(e, "gender")}
                                                />
                                                <label className="form-check-label" htmlFor="Male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline rd">
                                                <input
                                                    required
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="Female"
                                                    name="gender"
                                                    value="Female"
                                                    onChange={(e) => handleChangeEvent(e, "gender")}
                                                />
                                                <label className="form-check-label" htmlFor="Female">Female</label>
                                            </div>
                                            <div className="form-group2">
                                                <label htmlFor="password">Password:</label>
                                                <input
                                                    required
                                                    ref={passwordRef} // Attach ref to the password input
                                                    id="password"
                                                    type="password"
                                                    className="form-control sgnUp"
                                                    onChange={(e) => handleChangeEvent(e, "password")}
                                                />
                                            </div>
                                            <div className="form-group2">
                                                <input
                                                    required
                                                    type="submit"
                                                    value={loading ? "Submitting..." : "Submit"}
                                                    className="btn-primary btnn form-submit sub-btn sgnUp"
                                                    disabled={loading}
                                                />
                                            </div>
                                            <div>
                                                <small className="form-text text-muted link-text">
                                                    Already a User?
                                                </small>
                                                <span className="signuptext">
                                                    <a href="/#" onClick={getToSignIn}>Sign - In</a>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
