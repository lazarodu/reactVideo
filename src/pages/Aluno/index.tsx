import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Loading } from "components";
import { FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { apiAluno } from "api/data";
import { IAluno } from "interfaces/Aluno.interface";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Button } from "styles";
import * as S from "./styles";

const Aluno = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alunos, setAlunos] = useState<IAluno[]>([]);
  const history = useHistory();

  const fetchData = async () => {
    const response = await apiAluno.index();
    setAlunos(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const handleDelete = useCallback(async (id: number) => {
    confirmAlert({
      title: "Atenção",
      message: "Tem certeza que deseja apagar o item selecionado?",
      buttons: [
        {
          label: "SIM",
          onClick: async () => {
            await apiAluno.delete(id);
            toast.success("Aluno removido!");
            fetchData();
          },
        },
        {
          label: "NÃO",
          onClick: () => console.log("não"),
        },
      ],
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Button bgColor="success" onClick={() => history.push("/aluno/0")}>
            <FaPlusCircle /> &nbsp; Adicionar
          </Button>
          <S.Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Curso</th>
                <th>Descrição</th>
                <th>Editar</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {alunos &&
                alunos.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.curso?.nome}</td>
                    <td>{item.descricao}</td>
                    <td>
                      <Button
                        bgColor="primary"
                        onClick={() => history.push(`aluno/${item.id}`)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                    <td>
                      <Button
                        bgColor="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        <FaPencilAlt />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </S.Table>
        </>
      )}
    </>
  );
};
export default Aluno;
