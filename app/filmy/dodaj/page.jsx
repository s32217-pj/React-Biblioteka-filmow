"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const filmValidationSchema = Yup.object({
    title: Yup.string()
        .min(2, "Za krótki tytuł")
        .required("Tytuł jest wymagany"),

    year: Yup.number()
        .typeError("Rok musi być liczbą")
        .min(1888, "Za stary rok")
        .max(new Date().getFullYear() + 1, "Nieprawidłowy rok")
        .required("Rok jest wymagany"),

    genre: Yup.string()
        .required("Gatunek jest wymagany"),
});

export default function AddFilmPage() {

    const router = useRouter();

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const res = await fetch("/api/filmy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                throw new Error("Błąd podczas zapisu");
            }

            resetForm();
            router.push("/filmy");
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: "600px" }}>

            <h2 className="mb-4">Dodaj film</h2>

            <Formik
                initialValues={{
                    title: "",
                    year: "",
                    genre: "",
                }}
                validationSchema={filmValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>

                        <div className="mb-3">
                            <label className="form-label">Tytuł</label>
                            <Field
                                name="title"
                                className="form-control"
                            />
                            {touched.title && errors.title && (
                                <div className="text-danger">
                                    {errors.title}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Rok</label>
                            <Field
                                name="year"
                                type="number"
                                className="form-control"
                            />
                            {touched.year && errors.year && (
                                <div className="text-danger">
                                    {errors.year}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Gatunek</label>
                            <Field
                                name="genre"
                                className="form-control"
                            />
                            {touched.genre && errors.genre && (
                                <div className="text-danger">
                                    {errors.genre}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100"
                            disabled={isSubmitting}
                        >
                            Dodaj film
                        </button>

                    </Form>
                )}
            </Formik>

        </div>
    );
}