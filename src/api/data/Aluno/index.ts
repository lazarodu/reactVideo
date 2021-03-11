import api from "api";
import { IAluno } from "interfaces/Aluno.interface"

class AlunoData {
  index() {
    return api.get<IAluno[]>('alunos');
  }
  show(id: number) {
    return api.get<IAluno>(`alunos/${id}`);
  }
  store(data: IAluno) {
    return api.post<IAluno>(`alunos`, data);
  }
  update(id: number, data: IAluno) {
    return api.put<IAluno>(`alunos/${id}`, data);
  }
  delete(id: number) {
    return api.delete<IAluno>(`alunos/${id}`);
  }
}

export default new AlunoData();
