import Login from "components/formlogin/Login";
import UserContext from "context/User/UserContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object({
  email: yup.string().required("El correo es requerido"),
});

export default function Forget() {
  const { resetPasswordEmail, updateUser } = useContext(UserContext);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isValid, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (event) => {
    console.log(event);

    const reset = (error) => {
      if (error?.indexOf("security") != -1) {
        setError("email", {
          message:
            "Por motivos de seguridad, solo puede solicitar esto una vez cada 60 segundos.",
        });
        return;
      }
      return setError("email", { message: error });
      lse;
    };

    const { error } = await resetPasswordEmail(event);

    error
      ? (reset(error.message), console.log(error.message))
      : router.push("/form/forget/send");
  };

  return (
    <Login>
      <Container
        fluid
        className="d-flex flex-column justify-content-center align-content-center align-items-center"
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-4">Recupera tu contraseña</h1>
          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label>Correo electrónico asociado a tu cuenta</Form.Label>
            <Form.Control
              type="email"
              placeholder="nombre@email.com"
              {...register("email")}
              isInvalid={errors?.email ? true : false}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            style={{ width: "100%" }}
            variant="primary"
            type="submit"
            className="mb-3"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </Login>
  );
}
