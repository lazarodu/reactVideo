import { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaHandPointLeft, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiAluno, apiCurso } from "api/data";
import { Loading } from "components";
import { Input, Button, Form, Link, Select, Textarea } from "styles";
import { IAluno } from "interfaces/Aluno.interface";
import { ICurso } from "interfaces/Curso.interface";

const AlunoStore = () => {
  const [aluno, setAluno] = useState<IAluno>({} as IAluno);
  const [curso, setCurso] = useState<ICurso[]>({} as ICurso[]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const response = await apiCurso.index();
        setCurso(response.data);
      } catch (error) {
        toast.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurso();
    if (Number(id) > 0) {
      const fetchData = async (id: number) => {
        try {
          const response = await apiAluno.show(id);
          setAluno(response.data);
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
      setAluno({ ...aluno, [e.target.name]: e.target.value });
    },
    [aluno]
  );

  const onSubmit = useCallback(
    async (data) => {
      try {
        if (data.id > 0) {
          await apiAluno.update(data.id, data);
          toast.success("Aluno Alterado com sucesso!");
        } else {
          await apiAluno.store(data);
          toast.success("Aluno Cadastrado com sucesso!");
        }
        history.push("/aluno");
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
          <Link onClick={() => history.push("/aluno")} bgColor="warning">
            <FaHandPointLeft /> &nbsp; Voltar
          </Link>
          <Form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="id" value={id || ""} ref={register} />
            <div>
              <label htmlFor="curso">Curso: </label>
              <Select
                name="curso_id"
                id="curso"
                value={aluno.curso_id || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              >
                <option></option>
                {curso.length > 0 &&
                  curso.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nome}
                    </option>
                  ))}
              </Select>
            </div>
            <div>
              <label htmlFor="nome">Nome: </label>
              <Input
                type="text"
                name="nome"
                id="nome"
                value={aluno.nome || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.nome}
              />
            </div>
            <div>
              <label htmlFor="descricao">Descrição: </label>
              <Textarea
                name="descricao"
                id="descricao"
                value={aluno.descricao || ""}
                onChange={handleChange}
                ref={register({ required: true })}
                required
                error={errors.descricao}
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
export default AlunoStore;
