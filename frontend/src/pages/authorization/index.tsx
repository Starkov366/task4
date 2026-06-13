import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./styled.module.scss";
import { login, register } from "../../api/auth";

const Authorization = () => {
    const [mode, setMode] = useState<"login" | "register">("login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const navigator = useNavigate()
    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            if (mode === "login") {
                const res = await login(email, password);
                localStorage.setItem("user", JSON.stringify(res));

                setSuccess("Login success");
navigator("/user-management")
                return;
            }

            await register("", email, password);

            setSuccess("Регистрация успешна! Проверь почту для подтверждения.");

            setMode("login");
        } catch (e: any) {
            setError(e.message || "Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.autorizationPage}>
            <div className={styles.form}>
                <div className={styles.formTitle}>
                    <h2 className={styles.formTitleName}>Freedom</h2>
                </div>

                <div className={styles.formInner}>
                    <h1 className={styles.formInnerTitle}>
                        {mode === "login" ? "Вход" : "Регистрация"}
                    </h1>

                    <form
                        className={styles.formInnerInputs}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.formInnerInputsLogin}
                        />

                        <div
                            className={
                                styles.formInnerInputsPasswordWrapper
                            }
                        >
                            <input
                                type={
                                    showPassword ? "text" : "password"
                                }
                                placeholder="Пароль..."
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className={
                                    styles.formInnerInputsPassword
                                }
                            />

                            <FaRegEyeSlash
                                className={
                                    styles.formInnerInputsPasswordEye
                                }
                                size={28}
                                onClick={() =>
                                    setShowPassword((p) => !p)
                                }
                            />
                        </div>

                        <input
                            type="button"
                            value={
                                loading
                                    ? "Загрузка..."
                                    : mode === "login"
                                    ? "Войти"
                                    : "Зарегистрироваться"
                            }
                            onClick={handleSubmit}
                            className={
                                styles.formInnerInputsSubmit
                            }
                        />

                        {error && (
                            <p style={{ color: "red", marginTop: 10 }}>
                                {error}
                            </p>
                        )}

                        {success && (
                            <p style={{ color: "green", marginTop: 10 }}>
                                {success}
                            </p>
                        )}
                    </form>
                </div>

                <div className={styles.formRegistration}>
                    <span>
                        {mode === "login"
                            ? "Нету аккаунта?"
                            : "Уже есть аккаунт?"}
                    </span>

                    <span
                        style={{
                            color: "blue",
                            cursor: "pointer",
                        }}
                        onClick={() =>
                            setMode(
                                mode === "login"
                                    ? "register"
                                    : "login"
                            )
                        }
                    >
                        {mode === "login"
                            ? "Зарегистрироваться"
                            : "Войти"}
                    </span>
                </div>
            </div>

            <div className={styles.background}></div>
        </div>
    );
};

export default Authorization;