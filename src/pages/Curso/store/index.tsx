import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiCurso } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link } from "styles";
import { ICurso } from "interfaces/Curso.interface";

const CursoStore = () => {
  const [curso, setCurso] = useState<ICurso>({} as ICurso);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiCurso.show(id);
          setCurso(response.data);
        } catch (error) {
          toast.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData(Number(id));
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = useCallback(
    async (e) => {
      setCurso({ ...curso, [e.target.name]: e.target.value });
    },
    [curso]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiCurso.update(data.id, data);
          toast.success("Curso Alterado com sucesso!");
        } else {
          await apiCurso.store(data);
          toast.success("Curso Cadastrado com sucesso!");
        }
        history.push("/curso");
      } catch (error) {
        toast.error(() =>
          error.response.data ? error.response.data.join("\n") : error.message
        );
      }
    },
    [history]
  );
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Link onClick={() => history.push("/curso")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="nome">Nome: </label>
              <Input
                type="text"
                name="nome"
                id="nome"
                value={curso.nome || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              />
            </div>
            <Button bgColor="success" type="submit">
              <FaSave /> &nbsp; Salvar
            </Button>
          </Form>
        </>
      )}
    </>
  );
};
export default CursoStore;
